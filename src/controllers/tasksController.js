const taskService = require('../services/taskService');

const getTasks = (req, res) => {
    try {
        const tasks = taskService.getAllTasks();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Error interno' });
    }
};

const getTaskById = (req, res) => {
    try {
        const { id } = req.params;
        const task = taskService.getTaskById(id);
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada.' });
        }
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: 'Error interno' });
    }

};

const createTask = (req, res) => {
    try {
        const { title, description, completed } = req.body;
        if (!title || !description) {
            return res.status(400).json({ error: 'Faltan campos requeridos' });
        }
        const newTask = taskService.createTask(title, description, completed);
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: 'Error interno' });
    }
}

const update = (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updateTask = taskService.updateTask(id, updates);
        if (!updateTask) {
            return res.status(404).json({ error: 'Tarea no encontrada para actualizar.' });
        }
        res.status(200).json(updateTask);
    } catch (err) {
        res.status(500).json({ error: 'Error interno' });
    }
}

const deleteTask = (req, res) => {
    try {
        const { id } = req.params;
        const deleted = taskService.deleteTask(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Tarea no encontrada para eliminar.' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Error interno' });
    }
}
module.exports = {
    getTasks,
    getTaskById,
    createTask,
    update,
    deleteTask
}