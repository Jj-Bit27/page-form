import { pool } from '../db/db.js';

/* Obtener todas las respuestas */
export const getAnswers = async (req, res) => {
  try {
    const { id_examen } = req.params;
    const [result] = await pool.query("SELECT * FROM respuestas WHERE id_examen = ?", [id_examen]);
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Obtener una respuesta específica */
export const getAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("SELECT * FROM respuestas WHERE id = ?", [id]);
    if (result.length === 0) return res.status(404).json({ message: "Respuesta no encontrada" });
    res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Añadir una respuesta */
export const addAnswer = async (req, res) => {
  try {
    const { id_examen, id_estudiante, respuestas } = req.body;
    console.log(req.body)

    if (!id_examen || !id_estudiante || !Array.isArray(respuestas)) {
      return res.status(400).json({ message: "id_examen, id_estudiante y respuestas son requeridos" });
    }

    const insertedResponses = [];

    for (const respuesta of respuestas) {
      const { id_pregunta, respuesta: respuestaTexto } = respuesta;
      const [result] = await pool.query(
        "INSERT INTO respuestas (id_examen, id_pregunta, id_estudiante, respuesta, fecha) VALUES (?, ?, ?, ?, ?)",
        [id_examen, id_pregunta, id_estudiante, respuestaTexto, new Date().toISOString().slice(0, 19).replace("T", " ")]
      );
      insertedResponses.push({ id: result.insertId, id_pregunta, respuesta: respuestaTexto });
    }

    res.status(201).json(insertedResponses);
  } catch (error) {
    console.error("Error al guardar respuestas:", error);
    return res.status(500).json({ message: error.message });
  }
};

/* Editar una respuesta */
export const editAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { respuesta, fecha } = req.body;
    const [result] = await pool.query(
      "UPDATE respuestas SET respuesta = ?, fecha = ? WHERE id = ?",
      [respuesta, fecha, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: "Respuesta no encontrada" });
    res.status(200).json({ id, respuesta, fecha });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Eliminar una respuesta */
export const deleteAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM respuestas WHERE id = ?", [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Respuesta no encontrada" });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};