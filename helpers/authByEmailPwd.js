import { USERS_BBDD } from '../bbdd.js';

const authByEmailPwd = (email, password) => {
    // Busca el usuario en la base de datos por su correo electrónico
    const user = USERS_BBDD.find(user => user.email === email);
    // Si no se encuentra el usuario, lanzamos un error
    if (!user) throw new Error();
    //Comprobamos si la contraseña proporcionada coincide con la contraseña del usuario
    if (user.password !== password) throw new Error();
    // Si todo está bien, devolvemos el usuario autenticado
    return user;
}

export default authByEmailPwd;