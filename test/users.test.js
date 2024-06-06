const supertest = require('supertest');
const app = require('../app');
const { describe, test, expect, beforeAll } = require('@jest/globals');
const db = require('../db');
const api = supertest(app);

describe('ruta users', () => {
  describe('crear usuarios', () => {
    beforeAll(() => {
      const statement = db.prepare('DELETE FROM users');
      statement.run();
    });
    test('crea un usuario cuando todo es correcto', async () => {
      const response = await api
        .post('/api/users')
        .send({ email: 'maryan@gmail.com' })
        .expect(200)
        .expect('Content-Type', /json/);
      expect(response.body).toStrictEqual({ message: 'usuario creado' });
    });
    test('devuelve un error cuando el correo es invalido', async () => {
      const response = await api
        .post('/api/users')
        .send({ email: 'maryangmail.com' })
        .expect(400)
        .expect('Content-Type', /json/);
      expect(response.body).toStrictEqual({ error: 'el email es invalido' });
    });
    test('devuelve un error cuando el email existe', async () => {
      const response = await api
        .post('/api/users')
        .send({ email: 'maryan@gmail.com' })
        .expect(400)
        .expect('Content-Type', /json/);
      expect(response.body).toStrictEqual({ error: 'el email ya existe' });
    });
  });
});
