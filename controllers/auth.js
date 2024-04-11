const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const generateToken = (user) => {
    return jwt.sign({ email: user.email, _id: user._id }, 'secret_key');
};

const login = async (email, password) => {
    try {
        // Buscar el usuario en la base de datos
        const user = await User.findOne({ email });

        let response = {
            error: 1,
            mensaje: "Usuario o contraseña incorrectos"
        }

        if (!user) {
            return response;
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return response;
        }

        // Generar el token JWT
        const token = generateToken(user);

        return {
            error: 0,
            token,
            nombre: user.name,
            type: user.type
        };
        
    } catch (error) {
        return {
            error: 1,
            mensaje: "Error al iniciar sesion: " + error
        };
    }
};

const register = async (email, password, name, type) => {
    try {
        // Verificar si ya existe un usuario con el mismo email
        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            return {
                error: 1,
                mensaje: "El email ya está registrado"
            };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario utilizando el modelo User
        const newUser = new User({
            email,
            password: hashedPassword,
            name,
            type
        });

        // Guardar el nuevo usuario en la base de datos
        await newUser.save();

        return {
            error: 0,
            mensaje: "El usuario se creo correctamente"
        };
    } catch (error) {
        return {
            error: 1,
            mensaje: "Error al crear el usuario: " + error
        };
    }
};


module.exports = {
    login,
    register
};
