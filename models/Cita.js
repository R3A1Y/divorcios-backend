const mongoose = require("mongoose");

const citaSchema = new mongoose.Schema({
  fecha: { type: String, required: true },
  hora: { type: String, required: true },
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  telefono: { type: String, required: true },
  tipoConsulta: { type: String, required: true },
  tipoDivorcio: { type: String },
  mensaje: { type: String },
  fechaRegistro: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Cita", citaSchema);
