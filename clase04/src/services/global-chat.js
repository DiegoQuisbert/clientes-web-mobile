import supabase from "./supabase";

// Versión 1: usando Broadcast.
//empezamos por crear el canal de comunicación, el nombre del canal es arbitrario

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