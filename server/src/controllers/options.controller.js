/* Importar Base de datos */
import { pool } from '../db/db.js';

/* Obtener todas las opciones de preguntas */
export const getOptions = async (req, res) => {
  try {
    const { id_pregunta } = req.params;
    const [result] = await pool.query("SELECT * FROM opciones_preguntas WHERE id_pregunta = ?", [id_pregunta]);
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Obtener una opción específica */
export const getOption = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("SELECT * FROM opciones_preguntas WHERE id = ?", [id]);
    if (result.length === 0) return res.status(404).json({ message: "Opción no encontrada" });
    res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Añadir una opción de pregunta */
export const addOption = async (req, res) => {
  try {
    const { id_pregunta } = req.params;
    const { opciones, correcta } = req.body;
    const [result] = await pool.query(
      "INSERT INTO opciones_preguntas (id_pregunta, opcion, correcta) VALUES (?, ?, ?)",
      [id_pregunta, opcion, correcta]
    );
    res.status(201).json({ id: result.insertId, id_pregunta, opcion, correcta });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Editar una opción de pregunta */
export const editOption = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_pregunta, opcion, correcta } = req.body;
    const [result] = await pool.query(
      "UPDATE opciones_preguntas SET id_pregunta = ?, opcion = ?, correcta = ? WHERE id = ?",
      [id_pregunta, opcion, correcta, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: "Opción no encontrada" });
    res.status(200).json({ id, id_pregunta, opcion, correcta });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Eliminar una opción de pregunta */
export const deleteOption = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM opciones_preguntas WHERE id = ?", [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Opción no encontrada" });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
