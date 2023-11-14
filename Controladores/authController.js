// En tu archivo de controladores, por ejemplo, authController.js
const jwt = require('jsonwebtoken');

const login = (req, res) => {
    // Verifica las credenciales del usuario aquí

    // Por ahora, asumimos que el usuario es autenticado exitosamente
    const user = {
        id: 1,
        username: 'usuarioEjemplo'
    };

    // Generar el token
    const token = jwt.sign(user, 'secreto', { expiresIn: '1h' });

    res.json({ token });
};

module.exports = { login };
