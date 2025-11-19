let tasks = require('../data/tasks.json');
const Task = require('../models/task');

let nextId = Math.max(...tasks.map(t => t.id), 0) + 1;
const generateId = () => {
    return nextId++;
}

const getAllTasks = () => {
    return [...tasks];
};

const getTaskById = (id) => {
    const taskId = parseInt(id);
    return tasks.find(task => task.id === taskId);
};

const createTask = (title, description, completed = false) => {
    const newId = generateId();
    const newTask = new Task(newId, title, description, completed);
    tasks.push(newTask);
    return newTask;
};

const updateTask = (id, updates) => {
    const taskId = parseInt(id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
        return null;
    }
    if (updates.title) tasks[taskIndex].title = updates.title;
    if (updates.description) tasks[taskIndex].description = updates.description;
    if (updates.completed !== undefined) tasks[taskIndex].completed = updates.completed;
    return tasks[taskIndex];
}

const deleteTask = (id) => {
    const taskId = parseInt(id);
    const initialLength = tasks.length;
    tasks = tasks.filter(task => task.id !== taskId);
    return tasks.length < initialLength;
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
}

