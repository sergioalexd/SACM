// crear middleware para verificar si usuario es admin

const isAdmin = (req, res, next) => {
    const rol = req.body.rol;
    
    if (rol !== "ADMIN") {
        return res.status(403).json({
        success: false,
        status: 403,
        msg: "No tienes permisos de Administrador para realizar esta acción.",
        });
    }
    
    next();
    };

module.exports = isAdmin;