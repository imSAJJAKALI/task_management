import { Request, Response } from "express";
import Task from "../models/taskModel";
import Joi from "joi";


const taskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    'string.base': 'Title should be a string',
    'string.empty': 'Title is required',
    'string.min': 'Title should be at least 3 characters long',
    'string.max': 'Title should be less than or equal to 100 characters long',
  }),
  description: Joi.string().min(5).max(500).required().messages({
    'string.base': 'Description should be a string',
    'string.empty': 'Description is required',
    'string.min': 'Description should be at least 5 characters long',
    'string.max': 'Description should be less than or equal to 500 characters long',
  }),
});


interface CustomRequest extends Request {
    user?: any;
  }

export const createTask = async (req: CustomRequest, res: Response) => {
  const { error } = taskSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return 
  }
  const { title, description } = req.body;

  try {
    const task = await Task.create({user:req.user.id,  title, description });
    res.status(201).json(task);
  } catch (error:any) {

    res.status(400).json({ message: error.message });
  }
};

export const getTasks = async (req: CustomRequest, res: Response):Promise<void>=> {
  const { id } = req.params;

  try {
    const filter: any = { user: req.user?.id };

    if (id) {
      // If `id` is provided, find a single task
      filter._id = id; // Use `_id` to query the MongoDB primary key
      const task = await Task.findOne(filter);
      
      if (!task) {
        res.status(404).json({ message: "Task not found" });
        return  // Handle case where task doesn't exist
      }
      res.status(200).json(task);
      return  // Return the single task as an object
    }

    // If no `id` is provided, find all tasks
    const tasks = await Task.find(filter);
    res.status(200).json(tasks); // Return all tasks as an array
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


export const updateTask = async (req: CustomRequest, res: Response) => {

  const { error } = taskSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return 
  }
  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    );
    if (!task){
      res.status(404).json({ message: "Task not found." });
      return
    }
    res.json(task);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTask = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task){
       res.status(404).json({ message: "Task not found." });
       return
    } 
    res.json({ message: "Task deleted." });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};
