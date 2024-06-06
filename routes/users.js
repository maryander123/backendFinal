const db = require('../db');

const usersRouter = require('express').Router();
const EMAIL_REGEX =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

usersRouter.post('/', async (request, response) => {
  try {
    //obtener el email del body
    const { email } = request.body;
    console.log(email);

    //validar el email
    if (!EMAIL_REGEX.test(email)) {
      return response.status(400).json({ error: 'el email es invalido' });
    }

    //crear el usuario en la base de datos
    const statement = db.prepare(
      `INSERT INTO users (email) VALUES (?)
    `,
    );
    statement.run(email);

    //para comparar que el gamil ya existe
    return response.status(200).json({ message: 'usuario creado' });
  } catch (error) {
    console.log(error);
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return response.status(400).json({ error: 'el email ya existe' });
    }
    //esto se coloca cuando aparece un error desconocido
    return response.sendStatus(400);
  }
});

module.exports = usersRouter;
