const Donadores = require('../models/donadores'); // Asegúrate de que la ruta sea correcta

const getAllDonadores = async function(req, res) {
    try {
        const donadores = await Donadores.findAll(); // Utiliza Sequelize para buscar todos los donadores
        res.json(donadores);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const getProyectosAsociados = async function (req, res) {
    try {
        const rfcDonador = req.params.rfc;

        // Utiliza Sequelize para buscar el donador por su RFC e incluir la relación con proyectos
        const donadorEncontrado = await Donadores.findOne({
            where: { rfc: rfcDonador },
            include: 'proyecto', // Asegúrate de que esto coincida con el alias configurado en tu modelo
        });

        if (!donadorEncontrado) {
            res.status(404).json({ error: "Donador no encontrado" });
            return;
        }

        // Obtenemos la lista de proyectos asociados al donador
        const proyectosAsociados = donadorEncontrado.proyecto;

        res.json(proyectosAsociados);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const getByRFC = async function(req, res) {
    try {
        const rfc = req.params.rfc; // Obtén el RFC de la solicitud

        // Utiliza Sequelize para buscar el donador por su RFC
        const donadorEncontrado = await Donadores.findOne({
            where: { rfc },
        });

        if (donadorEncontrado) {
            res.json(donadorEncontrado);
        } else {
            res.status(404).json({ error: "Donador no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

exports.getAllDonadores = getAllDonadores;
exports.getByRFC = getByRFC;
exports.getProyectosAsociados = getProyectosAsociados;
