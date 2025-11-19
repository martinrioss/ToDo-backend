const app = require('./app');
const PORT = process.env.PORT || 3000;


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor listo y escuchando en http://localhost:${PORT}`);
    console.log(`Endpoints disponibles en http://localhost:${PORT}/api/tasks`);
});