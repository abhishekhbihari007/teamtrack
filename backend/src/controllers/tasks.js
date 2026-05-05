import Task from '../models/Task.js';
import asyncHandler from '../utils/asyncHandler.js';

// Get tasks
export const getTasks = asyncHandler(async (req, res) => {
  const { project, user } = req.query;
  const filter = {};

  if (project) filter.project = project;
  if (user) filter.assignedUser = user;

  // If no filters, show tasks for projects where user is a member
  const tasks = await Task.find(filter).populate('project').populate('assignedUser', 'name');
  res.json(tasks);
});

// Create task
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, project, assignedUser, priority, status } = req.body;

  const task = await Task.create({
    title,
    description,
    project,
    assignedUser,
    priority,
    status: status || 'todo',
    creator: req.user.id
  });

  res.status(201).json(task);
});

// Update task status or details
export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;
  task.status = req.body.status || task.status;
  task.priority = req.body.priority || task.priority;
  task.assignedUser = req.body.assignedUser || task.assignedUser;

  const updatedTask = await task.save();
  res.json(updatedTask);
});

// Delete task
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  await task.deleteOne();
  res.json({ message: 'Task removed' });
});

// Basic stats for dashboard
export const getDashboardStats = asyncHandler(async (req, res) => {
  const totalTasks = await Task.countDocuments({});
  const completedTasks = await Task.countDocuments({ status: 'done' });
  const pendingTasks = await Task.countDocuments({ status: { $ne: 'done' } });

  res.json({ totalTasks, completedTasks, pendingTasks });
});
