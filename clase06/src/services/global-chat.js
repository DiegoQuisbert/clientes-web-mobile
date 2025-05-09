import supabase from "./supabase";

// Versión 2: Usando Postgres y la API de Realtime "Postgres Changes".
/**
 * 
 * @param {{email: string, body: string}} data 
 */
export async function saveGlobalChatMessage(data) {
    // Para trabajar con una tabla de la base de Postgres de Supabase tenemos
    // que usar el método "from()" del cliente de Supabase.
    // El método from() va a retornar una Promesa que se resuelve con un objeto
    // que tiene una propiedad "error", que tiene el error en caso de haberlo, y
    // si corresponde, una propiedad "data" con la información.
    // !! IMPORTANTE !! Lo que hace que la consulta se ejecute finalmente, para los
    // fines prácticos, es el "await".
    const { error } = await supabase
        // El "from()" lleva cuál es la tabla con la que queremos interactuar dentro
        // del schema 'public'.
        .from('global_chat')
        // A continuación del "from()", le concatenamos la acción que queremos
        // realizar. Ejemplo: insert(), update(), select(), delete().
        .insert({
            ...data
        });

    if(error) {
        console.error('[global-chat.js saveGlobalChatMessage] Error al grabar el mensaje: ', error);
        throw error;
    }
}

/**
 * 
 * @returns {Promise<{id: number, email: string, body: string, created_at: string}[]>}
 */
export async function getGlobalChatLastMessages() {
    const { data, error } = await supabase
        .from('global_chat')
        .select();
    
    if(error) {
        console.error('[global-chat.js getGlobalChatLastMessages] Error al obtener los últimos mensajes: ', error);
        throw error;
    }

    // Retornamos los mensajes.
    return data;
}

/**
 * 
 * @param {() => void} callback 
 */
export async function listenForGlobalChatMessages(callback) {
    // Pedimos que se nos notifique de las inserciones que se hagan en la tabla
    // de "global_chat".
    // Recuerden que para que esto funcione tenemos que tener habilitada la opción
    // de "Realtime" en la tabla.
    // Como queremos usar la API de Realtime, necesitamos crear un canal. Como antes,
    // pueden poner el nombre que quieran. Yo voy el nombre de la tabla.
    const chatChannel = supabase.channel('global_chat');
    // Configuramos el evento que queremos.
    chatChannel.on(
        // Queremos escuchar las comunicaciones de 'postgres_changes'.
        'postgres_changes',
        {
            // En la API de 'postgres_changes', el evento puede ser:
            //  INSERT, UPDATE, DELETE, *
            event: 'INSERT',
            schema: 'public',
            table: 'global_chat',
        },
        data => {
            console.log("[global-chat.js listenForGlobalChatMessages] El evento recibido es: ", data);
            
            // Los nuevos datos del registro se reciben en la propiedad "new".
            callback(data.new);
        }
    );
    // Nos suscribimos al canal.
    chatChannel.subscribe();
}

/*
// Versión 1: Usando Broadcast.
// Empezamos por crear el "canal" de comunicación. El nombre
// del canal es arbitrario (excepto "realtime").
const globalChatChannel = supabase.channel('global-chat', {
    // Esto es para que nosotros podamos escuchar nuestros propios mensajes de broadcast.
    config: {
        broadcast: {
            self: true,
        },
    }
});

export async function saveGlobalChatMessage(data) {
    // Usamos el método send() para enviar un mensaje en el canal.
    // Recibe un objeto de tres propiedades:
    // - type: El tipo de API.
    // - event: El evento que queremos emitir. En "broadcast", esto es arbitrario.
    // - payload: La data que queremos emitir con el evento.
    // Retorna una Promise.
    return globalChatChannel.send({
        type: 'broadcast',
        event: 'new-message',
        payload: {...data},
    });
}

export async function listenForGlobalChatMessages(callback) {
    // Para escuchar un mensaje, necesitamos primero definir un evento de escucha en el canal.
    globalChatChannel.on(
        // Definimos qué API es la que escuchamos.
        'broadcast',
        // Definimos los detalles del evento que queremos escuchar.
        {
            // El nombre del evento es arbitrario.
            event: 'new-message',
        },
        // Definimos el callback a ejecutar por cada nuevo mensaje.
        data => {
            console.log("La data recibida es: ", data);
            // Invicamos el callback que nos pasaron como argumento y lo ejecutamos con el payload recibido.
            callback(data.payload);
        }
    );
    // Definido el evento a escuchar, nos suscribimos al canal.
    globalChatChannel.subscribe();
}*/