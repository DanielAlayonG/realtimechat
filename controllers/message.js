const Message = require('../models/messages'); // Importa el modelo Message

// Función para guardar un mensaje en la base de datos
function guardarMensaje(data) {
    const { user, type, timestamp, message } = data;

    const nuevoMensaje = new Message({
        user: user, // ID del usuario que envió el mensaje
        type: type,
        timestamp: timestamp,
        message: message
    });

    // Guardar el mensaje en la base de datos
    nuevoMensaje.save();
    return nuevoMensaje
}


const eliminarMensaje = async () => {
    try {
        await Message.deleteMany({});
        return true;
    } catch (error) {
        console.error('Error al eliminar mensajes:', error);
        return false;
    }
};


const obtenerHistorialMensajes = async () => {
    try {
        const mensajes = await Message.find().sort({ createdAt: 1 }).exec();
        return mensajes;
    } catch (error) {
        console.error('Error al obtener el historial de mensajes:', error);
        throw error;
    }
};



module.exports = { guardarMensaje, obtenerHistorialMensajes, eliminarMensaje};


