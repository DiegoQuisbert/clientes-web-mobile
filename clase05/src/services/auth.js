import supabase from "./supabase";

export async function register(email, password) {
    //el método auth() de supabase es el que nos permite registrar un usuario
    const {data, error} = await supabase.auth.signUp({
        email,
        password,
    });

    if(error){
        console.error('[auth.js register] Error al registrar al usuario ', error);
        throw error;
    }

    console.log("¡Usuario registrado y autenticado")
}

export async function login(email, password) {
    const {data, error} = await supabase.auth.signInWithPassword({
        email, 
        password,
    });

    if(error){
        console.error('[auth.js login] Error al iniciar sesión ', error);
        throw error;
    }

    console.log("el usuario inició sesión", data);

    return data.user;
}

export async function logout(  ) {
    
}