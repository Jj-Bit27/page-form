/* Importar Base de datos */
import { pool } from '../db/db.js';

/* Obtener todos los exámenes */
export const getExams = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM examenes");
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Obtener un examen específico */
export const getExam = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("SELECT * FROM examenes WHERE id = ?", [id]);
    if (result.length === 0) return res.status(404).json({ message: "Examen no encontrado" });
    res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Añadir un nuevo examen */
export const addExam = async (req, res) => {
  try {
    const { id_maestro, titulo, descripcion, fecha } = req.body;
    const [result] = await pool.query(
      "INSERT INTO examenes (id_maestro, titulo, descripcion, fecha) VALUES (?, ?, ?, ?)",
      [id_maestro, titulo, descripcion, fecha]
    );
    res.status(201).json({ id: result.insertId, id_maestro, titulo, descripcion, fecha });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Editar un examen */
export const editExam = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_maestro, titulo, descripcion, fecha } = req.body;
    const [result] = await pool.query(
      "UPDATE examenes SET id_maestro = ?, titulo = ?, descripcion = ?, fecha = ? WHERE id = ?",
      [id_maestro, titulo, descripcion, fecha, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: "Examen no encontrado" });
    res.status(200).json({ id, id_maestro, titulo, descripcion, fecha });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Eliminar un examen */
export const deleteExam = async (req, res) => {
  try {
    const { id } = req.params;
    const numberId = parseInt(id);
    const [result] = await pool.query("DELETE FROM examenes WHERE id = ?", [numberId]);
    console.log(result);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Examen no encontrado" });
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};