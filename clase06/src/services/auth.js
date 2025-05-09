import supabase from "./supabase";
import { getUserProfileById } from "./user-profiles";

/**
 * 
Usando el patrón dobserver para maneja el estado de autenticación
el patrón de diseño observer, es un patrón altamente popular y de los favoritos del profe
prácticas comunes que se repiten en codigos, para la resolución de problemas en programación, son estrategias o ideas, depende todo del caso del uso

Este patrón sirve para definir una relaciñón de uno a muchos entre un "subject" y múltiples "observers"

Donde los observers pueden pedir ser notificados por el sujeto de algún cambio en sus datos o de algún suceso ocurrido. De manera tal que los observers puedan reaccionar de alguna manera a ese acontecimiento

En la práctica, el subject va a necesitar ofrecer un mecanismo para que los observers se "registren" para ser notificados de los cambios

El proceso por el cual un observer se "registra" para ser notificado de los cambios del subject se le suele conocer ccomo "suscribe", aunque también lo pueden ver como un "watch" o un "listen"

Elemento .addEventListener('evento'), function() {...} "

Aplicándolo a nuestro caso
En nuestro sistema necesitamos que múltiples partes (componentes o archivos o funciones), puedan ser notificados de los cambios en el estado de autenticación.
Es decir, el "subject" en nuestro caso sería el estado del usuario, o sus datos.
Y como podemos deducir de arriba, ma mayor carga de desarrollo recae sobre el propio "subject".

Para implementar el observer acá, vamos a necetiar:
- tener una variable para los datos del usuario
- Tener una variable para la lista de observers que se suscriban
- tener una función que permita a otros elemtnso suscribirse a la notificación
- tener una función que notifique a un observer específico
- tener una función que notifique a todos los observers


*/
//Los datos del usuario autenticado

let user = {
    id: null,
    email: null,
}

//lista de observers
let observers = [];

//cargamos los datos iniciales del usuario autenticado
getCurrentAuthUser();

export async function getCurrentAuthUser() {
    const {data, error} = await supabase.auth.getUser();

    if(error){
        console.error('[auth.js getCurrentAuthUser] Error al obtener el usuario autenticado', error);
        // throw error;
    }

    user = {
        ...user,
        id: data.user.id,
        email: data.user.email,
    }
    notifyAll();

    getCurrentUserExtendedProfile();

    return data.user;
}

async function getCurrentUserExtendedProfile() {
    try{
        const profile = await getUserProfileById(user.id);
        user = {
            ...user,
            bio: profile.bio,
            display_name: profile.display_name,
            career: profile.career,
        }
        notifyAll();
    } catch(error){
        //TODO... 
    }
}

/**
 * 
 * @param {string} email 
 * @param {string} password 
 */
export async function register(email, password) {
    // El método signUp() de auth de Supabase es el que nos permite registrar un
    // usuario.
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });
            
    if(error) {
        console.error('[auth.js register] Error al registrar el usuario: ', error);
        throw error;
    }

    console.log("¡Usuario registrado y autenticado! ", data);

    return data.user;
}

/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @returns 
 */
export async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    
    if(error) {
        console.error('[auth.js login] Error al iniciar sesión: ', error);
        throw error;
    }

    //Notificamos a todo el estado del usuario
    user = {
        ...user,
        id: data.user.id,
        email: data.user.email,
    }
    notifyAll();

    return data.user;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();
    
    if(error) {
        console.error('[auth.js login] Error al cerrar sesión: ', error);
        throw error;
    }

    // user = {
    //     ...user,
    //     id: null,
    //     email: null,
    // }
    // notifyAll();
    updateUser({
        id: data.user.id,
        email,
    })
}

/*-------------------------------------------------------------------
Funciones de observer
-------------------------------------------------------------------*/
/**registra un observer para recibir los cambios del estado del usuario autenticado
 * Este observer debe ser una función que va a recibir como parámetro, los datos del usuario
 */
export function suscribeToAuthUserChanges(callback) {
    //guardamos el callback entre nuestros observers
    observers.push(callback);

    //inmediatamente lo ejecutamos para pasarle el estado actual del usuario
    notify(callback);
}

/**Notifica al observer
 * esto es, ejecuta el callback y le pasa una copia de datos del usuario
 * @param {() => {}} callback
 */

function notify (callback){
    callback({...user});
}

/**Notificamos a todos los observers el estado del usuario */

function notifyAll() {
    observers.forEach(callback => notify(callback));
}

/**
 * @param{{id?: string/null, email?: string/null, display_name?: string/null, bio?: string/null, career?: string/null}}
 */