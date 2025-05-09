import supabase from "./supabase";

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

    console.log("¡Usuario autenticado! ", data);

    return data.user;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();
    
    if(error) {
        console.error('[auth.js login] Error al cerrar sesión: ', error);
        throw error;
    }
}