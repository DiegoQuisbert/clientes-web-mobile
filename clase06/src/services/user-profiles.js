import supabase from "./supabase";

/**
 * 
 * @param {id: string, email: string} data 
 */

export async function createUserProfile(data){
    const {error} = await supabase
    .from('user_profiles')
    .insert(data);

    if(error) {
        console.error('[user-profiles.js getUserProfileById] Error al crear el perfil del usuario: ', error);
        throw error;
    }
}

export async function createUserProfile(data){

}

export async function updateUserProfile(id, data) {

}

export async function getUserProfileById(id){
    const {data, error} = await supabase
    .from('user_profiles')
    .select()
    //permite agregar una cláusula al WHERE de igualdad
    .eq('id', id);

    if(error) {
        console.error('[user-profiles.js getUserProfileById] Error al obtener el perfil del usuario: ', error);
        throw error;
    }

    try {
        await createUserProfile({
            id: data.user.id,
            email,
        });
    }catch(error){
        //TODO...
    }

    //El método select() de supabase retorna siempre un array de resultados (similar a como MySQL retorna un resultSet) como estamos filtrando por PK, estamos seguros de que solo puede venir en un único registro
    return data[0];
}