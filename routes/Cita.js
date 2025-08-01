const express = require("express");
const router = express.Router();
const Cita = require("../models/Cita");
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  const {
    fecha,
    hora,
    nombre,
    correo,
    telefono,
    tipoConsulta,
    tipoDivorcio,
    mensaje,
  } = req.body;

  if (!fecha || !hora || !nombre || !correo || !telefono || !tipoConsulta) {
    return res.status(400).json({ message: "Faltan datos obligatorios." });
  }

  try {
    // Guardar en base de datos
    const nuevaCita = new Cita({
      fecha,
      hora,
      nombre,
      correo,
      telefono,
      tipoConsulta,
      tipoDivorcio,
      mensaje,
    });

    await nuevaCita.save();

    // Configurar transporter para nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Enviar correo con detalles de la cita
    await transporter.sendMail({
      from: `"Divorcios Online" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: "Nueva cita reservada",
      html: `
        <h3>Nueva cita reservada</h3>
        <p><b>Fecha:</b> ${fecha}</p>
        <p><b>Hora:</b> ${hora}</p>
        <p><b>Nombre:</b> ${nombre}</p>
        <p><b>Correo:</b> ${correo}</p>
        <p><b>Teléfono:</b> ${telefono}</p>
        <p><b>Tipo de Consulta:</b> ${tipoConsulta}</p>
        <p><b>Tipo de Divorcio:</b> ${tipoDivorcio || "No especificado"}</p>
        <p><b>Mensaje:</b><br>${mensaje || "Sin mensaje"}</p>
      `,
    });

    res.status(201).json({ message: "Cita registrada y correo enviado." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
});

module.exports = router;
