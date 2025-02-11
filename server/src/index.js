/* Importamos bibliotecas */
import express from "express";
import dotenv from 'dotenv'
import cors from "cors";
import cookieParser from "cookie-parser";

/* Rutas */
import questionRouter from './routes/questions.routes.js'
import authRouter from "./routes/auth.routes.js";
import answerRouter from "./routes/answers.routes.js";
import examRouter from "./routes/exams.routes.js";
import optionRouter from "./routes/options.routes.js";

/* Configuracion de dotnv */
dotenv.config()

const server = express() // Inicializamos el servidor
const port = 5000 // Puerto

/* Hacemos que sea json la respuesta y que pueda acceder el frontend al backend */
server.use(cors({ origin: 'http://localhost:5173', credentials: true }));
server.use(express.json())
server.use(cookieParser());

/* Rutas */
server.use('/api/question', questionRouter)
server.use("/api/auth", authRouter);
server.use("/api/answer", answerRouter);
server.use("/api/exam", examRouter);
server.use("/api/option", optionRouter);

/* Otras rutas que no sean las antes dichas */
server.use('*', (req, res) => {
  res.send('Hello World!')
})

/* Escuchamos el servidor */
server.listen(port, () => {
  console.log("Server is running on: " + port);
});