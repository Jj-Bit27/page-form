/* Importar Base de datos */
import { pool } from '../db/db.js'

/* Modulo de obtener todas las preguntas */
export const getQuestions = async (req, res) => {
  try {
    const { id_examen } = req.params;
    const [result] = await pool.query("SELECT * FROM preguntas WHERE id_examen = ?", [
      id_examen,
    ]
    );

    res
      .json({
        id: result.insertId,
        result,
      })
      .status(201);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Modulo de obtener una pregunta en espeficico */
export const getQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("SELECT * FROM preguntas WHERE id = ?", [
      id,
    ]);

    res
      .json({
        id: result.insertId,
        result,
      })
      .status(201);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Modulo de añadir un alumno */
export const addQuestion = async (req, res) => {
  try {
    const { id_examen, preguntas } = req.body;
    let preguntasIds = []

    for (const pregunta of preguntas) {
      const { title, type, correctAnswers, required } = pregunta;
      const [result] = await pool.query(
        "INSERT INTO preguntas (id_examen, titulo, tipo_respuestas, respuesta_correcta, obligatoria, fecha)  VALUES (?, ?, ?, ?, ?, ?)",
        [id_examen, title, type, correctAnswers, required, new Date().toISOString().slice(0, 19).replace("T", " ")]
      );
      preguntasIds.push(result.insertId);
    }

    res.json({
      preguntasIds
    }).status(201);

  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message });

  }
};

/* Modulo de editar una pregunta */
export const editQuestion = async (req, res) => {
  try {
    const { id } = req.params
    const { id_examen, title, type, correctAnswers, required } = req.body;

    const [resultados] = await pool.query("SELECT * FROM preguntas WHERE id = ?", [
      id,
    ]);

    if (resultados.length === 0)
      return res.status(404).json({ message: "La pregunta no se ha encontrado en la base de datos" });

    const [result] = await pool.query(
      `UPDATE preguntas 
      SET id_examen = ?, titulo = ?, tipo_respuestas = ?, respuesta_correcta = ?, obligatoria = ?
      WHERE id = ?`,
      [id_examen, title, type, correctAnswers, required, id]
    );

    res.json({
      id: result.insertId,
      id_examen, title, type, correctAnswers, required
    }).status(201);

  } catch (error) {
    return res.status(500).json({ message: error.message });
    console.log(error)
  }
};


/* Modulo de eliminar una pregunta */
export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params

    const [resultados] = await pool.query("DELETE FROM preguntas WHERE id = ?", [
      id,
    ]);

    if (resultados.affectedRows === 0)
      return res.status(404).json({ message: "No se encontro la pregunta que se desea eleminar" });

    return res.sendStatus(204);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Modulo de eliminar todas las preguntas */
export const deleteQuestions = async (req, res) => {
  try {
    const { id_examen } = req.params

    const [resultados] = await pool.query("DELETE FROM preguntas WHERE id_examen = ?", [
      id_examen,
    ]);

    if (resultados.affectedRows === 0)
      return res.status(404).json({ message: "No se encontro la pregunta que se desea eleminar" });

    return res.sendStatus(204);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};