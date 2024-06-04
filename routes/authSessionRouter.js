import { Router } from "express";
import authByEmailPwd from '../helpers/authByEmailPwd.js';
import { nanoid } from 'nanoid';
import { USERS_BBDD } from "../bbdd.js";

const sessions = [];
const authSessionRouter = Router();

authSessionRouter.post("/login", (req, res) => {
    const { email, password } = req.body;
    //Verifico que se proporcionen correo electrónico y contraseña
    if (!email || !password) res.statusCode(400);

    try {
        const { guid } = authByEmailPwd(email, password);
        // Generar un ID de sesión único
        const sessionId = nanoid();
        // Guardar la sesión en el array de sesiones
        sessions.push({ sessionId, guid });
        // Establecer una cookie con el ID de sesión
        res.cookie('sessionId', sessionId, {
            httpOnly: true
        })
        return res.send();
    } catch (err) {
        return res.statusCode(401)
    }
})
// Manejador de ruta para obtener el perfil del usuario
authSessionRouter.get("/profile", (req, res) => {
    const { cookies } = req;

    if (!cookies.sessionId) return res.sendStatus(401);
    const userSession = sessions.find((session) => {
        session.sessionId === cookies.sessionId
    })

    if (!userSession) return res.sendStatus(401);

    const user = USERS_BBDD.find((user) => {
        user.guid === userSession.guid;
    })

    if (!user) return res.sendStatus(401);

    delete user.password;

    return res.send('Perfil de usuario', user);
})


export default authSessionRouter;