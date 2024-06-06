const { request, response } = require("../app");

const verifyUser = async (request, response, next) => {
    if (!request.query.userId){
        return response.status(401).json({ error: 'no tiene los permisos'});
    }

    return next();
};

module.exports = verifyUser;