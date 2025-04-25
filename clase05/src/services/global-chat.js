import supabase from "./supabase";

//versión 2: postgres y la API de Realtime "Postgres Changes"

/* 
@param {{email: string, body: string}} data
*/
export async function saveGlobalChatMessage(data){
    // Para trabajar con una tabla de la base de posgres de Supabase, tenemos que usar el méttodo "from()" delcliente de Supabase.
    //que tiene una propiedad error, que tiene el error en caseço de haberlo y si correspondes una propiedad data con la información
    //IMPORTANTE lo que hace que la consulta se ejecute finalmente para los fines prácticos, es el "await"
    const { error } = await supabase
    //el From() lleva cuál es la tabla con la que queremos interactuar dentro del schema "public"
        .from('global_chat')
    //a continuación de from() le concatenamos la acción que queremos realizar, como insert(), update(), delete(), select()
        .insert({
            ...data
        });

    if(error) {
        console.error('[global-chat.js saveGlobalChatMessage] error al grabar el mensaje: ', error);
        throw error;
    }
}

export async function getGlobalChatLastMessages() {
    const {data, error} = await supabase
        .from('global_chat')
        .select();
        
    if(error) {
        console.error('[global-chat.js getGlobalChatLastMessage] error al obtener los últimos mensajes: ', error);
        throw error;
    }

    return data;
}

export async function listenForGlobalChatMessages(callback) {
    // Pedimos que se nos notifique de las inserciones que se hagan en la tabla de "global chat". Recuerden que para que esto funcione, tenemos que tener habilitada la función de "realtime" en la tabla
    //como queremos usar la API de realtime, necesitamos crear un canal, como antes, pueden poner el nombre que quieran, yo soy el nombre de la tabla
    const chatChannel = supabase.channel('global_chat');
    //const {data, error} = await
    chatChannel.on(
        //queremos escuchar las comunicaciones de 'postgres_changes'.
        'postgres_changes',
        {
            //en la API DE 'postgres_changes', el evento puede ser un INSERT, UPDATE, DELETE
            event: 'INSERT',
            schema: 'public',
            table: 'global_chat',
        },
        data => {
            console.log("[global-chat.js listenForGlobalChatMessages] El evento recibido es: ", data);

            callback(data.new);
        }
    );
    //Nos suscribimos al canal
    chatChannel.subscribe();
}


/*

// Versión 1: usando Broadcast.
//empezamos por crear el canal de comunicación, el nombre del canal es arbitrario (excepto por)

const globalChatChannel = supabase.channel('global-chat', {
    //Esto es para que nosotros podamos escuchar nuestros propios mensajes de broadcast
    config: {
        broadcast: {
            self: true,
        },
    }
});

export async function saveGlobalChatMessage(data) {
    // Usamos el método send() para enviar un mensaje en el canal 
    //Recibe un objeto de 3 propiedades: - type: El tipo de API, - event: El evento que queremos emitir. En "Broadcast", esto es arbitrario, - payload: data que queremos emitir con el evento. 
    // Retorno de promise:
    return globalChatChannel.send({
        type: 'broadcast',
        event: 'new-message',
        payload: {...data},
    });
}

export async function listenForGlobalChatMessages(callback) {
    //Para escuchar un mensaje, necesitamos primero definir un evento de escucha en el canal.
    globalChatChannel.on(
        //Definimos qué API es la que escuchamos.
        'broadcast',
        //Definimos los detalles del evento que queremos escuchar.
        {
            event:'new-message',
        },
        //Definimos el callback a ejecutar por cada nuevo mensaje.
        data => {
            console.log("La data recibida es: ", data);
            //Invocamos el callback que nos pasaron como argumento y lo ejecutamos con el payload recibido.
            callback(data.payload);
        }
    );
    // Definido el evento a escuchar, nos suscribimos al canal.
    globalChatChannel.subscribe();
}

*/