const express = require('express');
const cors = require('cors');
const tasksRoutes = require('./routes/taskRoutes');

const app = express();

// Middleware para parsear el cuerpo de las peticiones JSON
app.use(express.json());
app.use(cors());

// Configuración de rutas
app.use('/api/tasks', tasksRoutes);

app.get('/', (req, res) => {
    res.send('API REST de Tareas: Accede a /api/tasks para ver los datos.');
});

module.exports = app;