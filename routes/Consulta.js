const express = require('express');
const router = express.Router();
const Consulta = require('../models/Consulta');
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
    const { nombre, correo, telefono, tipoDivorcio, mensaje } = req.body;

    try {
        // Guardar en DB
        const nuevaConsulta = new Consulta({ nombre, correo, telefono, tipoDivorcio, mensaje });
        await nuevaConsulta.save();

        // Configurar transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Enviar correo
        await transporter.sendMail({
            from: `"Divorcios Online" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: 'Nueva consulta recibida',
            html: `
    <h3>Consulta de: ${nombre}</h3>
    <p><b>Correo:</b> ${correo}</p>
    <p><b>Teléfono:</b> ${telefono}</p>
    <p><b>Tipo de Divorcio:</b> ${tipoDivorcio}</p>
    <p><b>Mensaje:</b><br>${mensaje}</p>
    `,
        });

        res.status(200).json({ message: 'Consulta enviada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al enviar consulta' });
    }
});

module.exports = router;
