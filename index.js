console.clear()
import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import rutasCuentas from './routes/cuentas.js';
import authRouter from './routes/auth.js';
import authSessionRouter from './routes/authSessionRouter.js';
import authTokenRouter from './routes/authTokenRouter.js';
import mongoose from 'mongoose';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use("/cuenta", rutasCuentas);
app.use("/auth", authRouter);
app.use("/auth-session", authSessionRouter);
app.use("/auth-token", authTokenRouter);

const bootstrap = async () => {
	//conectar a mongodb
	await mongoose.connect(process.env.MONGODB_URL)
	app.listen(PORT, () => {
		console.log(`Server en puerto:${PORT}`)
	})
}

bootstrap()
