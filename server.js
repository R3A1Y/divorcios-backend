require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const consultaRoutes = require('./routes/Consulta');
const citaRoutes = require("./routes/Cita");

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/consulta', consultaRoutes);
app.use("/api/cita", citaRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(process.env.PORT, () => console.log(`🚀 Servidor en http://localhost:${process.env.PORT}`));
  })
  .catch(err => {
    console.error('❌ Error al conectar a MongoDB', err);
  });
