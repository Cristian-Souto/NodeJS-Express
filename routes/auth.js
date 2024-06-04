import { Router } from "express";
import { USERS_BBDD } from '../bbdd.js';
import authByEmailPwd from '../helpers/authByEmailPwd.js'

const authRouter = Router();

//endopoint publico (no autenticado y no autorizado)
authRouter.get('/publico', (req, res) => res.send('Endpoint Publico'))

//endpoint autenticado
authRouter.post('/autenticado', (req, res) => {
  const { email, password } = req.body;
  //Verifico que se proporcionen correo electrónico y contraseña
  if (!email || !password) res.statusCode(401).send("Correo electronico y contraseña son obligatorios");
  //validamos el email y contraseña
  try {
    const user = authByEmailPwd(email, password)
    return res.send(`Usuario ${user.name} autenticado`);
  } catch (err) {
    return res.statusCode(401).send("error de autenticacion")
  }
})

//endpoint autorizado o administradores
authRouter.post('/autorizado', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) res.statusCode(400);

  try {
    const user = authByEmailPwd(email, password)
    if (user.role !== 'admin') return res.sendStatus(403);
    return res.send(`Usuario administrador ${user.name}`);
  } catch (err) {
    return res.statusCode(401)
  }
})

export default authRouter;