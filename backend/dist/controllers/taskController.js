"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;
const taskModel_1 = __importDefault(require("../models/taskModel"));
const joi_1 = __importDefault(require("joi"));
const taskSchema = joi_1.default.object({
    title: joi_1.default.string().min(3).max(100).required().messages({
        'string.base': 'Title should be a string',
        'string.empty': 'Title is required',
        'string.min': 'Title should be at least 3 characters long',
        'string.max': 'Title should be less than or equal to 100 characters long',
    }),
    description: joi_1.default.string().min(5).max(500).required().messages({
        'string.base': 'Description should be a string',
        'string.empty': 'Description is required',
        'string.min': 'Description should be at least 5 characters long',
        'string.max': 'Description should be less than or equal to 500 characters long',
    }),
});
const createTask = async (req, res) => {
    const { error } = taskSchema.validate(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }
    const { title, description } = req.body;
    try {
        const task = await taskModel_1.default.create({ user: req.user.id, title, description });
        res.status(201).json(task);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createTask = createTask;
const getTasks = async (req, res) => {
    const { id } = req.params;
    try {
        const filter = { user: req.user?.id };
        if (id) {
            // If `id` is provided, find a single task
            filter._id = id; // Use `_id` to query the MongoDB primary key
            const task = await taskModel_1.default.findOne(filter);
            if (!task) {
                res.status(404).json({ message: "Task not found" });
                return; // Handle case where task doesn't exist
            }
            res.status(200).json(task);
            return; // Return the single task as an object
        }
        // If no `id` is provided, find all tasks
        const tasks = await taskModel_1.default.find(filter);
        res.status(200).json(tasks); // Return all tasks as an array
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getTasks = getTasks;
const updateTask = async (req, res) => {
    const { error } = taskSchema.validate(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }
    const { id } = req.params;
    const { title, description, completed } = req.body;
    try {
        const task = await taskModel_1.default.findByIdAndUpdate(id, { title, description, completed }, { new: true });
        if (!task) {
            res.status(404).json({ message: "Task not found." });
            return;
        }
        res.json(task);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await taskModel_1.default.findByIdAndDelete(id);
        if (!task) {
            res.status(404).json({ message: "Task not found." });
            return;
        }
        res.json({ message: "Task deleted." });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteTask = deleteTask;
