import { Router } from "express";
import { USERS_BBDD } from '../bbdd.js';
import userModel from "../schemas/user-schema.js";

const rutasCuentas = Router();

rutasCuentas.use((req, res, next) => {
  console.log(req.ip)
  next();
})

//GET obtener los detalles de una cuenta atraves del guid
rutasCuentas.get('/:guid', async (req, res) => {
  //console.log(req.params) --> retorna un objeto { params }
  const { guid } = req.params;
  const user = USERS_BBDD.find(user => user.guid === guid);
  if (!user) return res.status(404).send();
  res.send(user)
})

//POST: crear una nueva cuenta a partir de un guid y name 
rutasCuentas.post('/', async (req, res) => {
  const { name, guid } = req.body;
  if (!name || !guid) return res.status(400).send('algo salio mal!!');

  const user = userModel.findById(guid).exec();

  if (!user) return res.status(409).send("El usuario ya se encuentra registrado");

  const newUser = await userModel({ _id: guid, name })
  await newUser.save();
  return res.send('Usuario registrado');
})
/* rutasCuentas.post('/', (req, res) => {
  const { name, guid } = req.body;
  if (!name || !guid) return res.status(400).send()
  const user = USERS_BBDD.find(user => user.guid === guid);
  //si el usuario ya existe status code 409 conflict 
  if (user) return res.status(409).send()
  USERS_BBDD.push({
    name,
    guid,
  })
  res.send()
}) */

//PATCH actualizar nombre de la cuenta
rutasCuentas.patch('/:guid', async (req, res) => {
  const { name } = req.body;
  const { guid } = req.params;

  if (!name) return res.state(400).send('Ocurrio un error') //BAD REQUEST falta el nombre en el req body 
  /* const user = USERS_BBDD.find(user => user.guid === guid); */
  const user = await userModel.findById(guid).exec();

  if (!user) return res.status(404).send();
  user.name = name;

  await user.save();

  res.send();
})

//DELETE
rutasCuentas.delete('/:guid', async (req, res) => {
  const { guid } = req.params;
  /* const userIndex = USERS_BBDD.findIndex(user => user.guid === guid); */
  const user = await userModel.findById(guid).exec();

 /*if (userIndex === -1) return res.status(404).send();
  USERS_BBDD.splice(userIndex, 1);*/
  await user.remove();

  res.send()
})

export default rutasCuentas;