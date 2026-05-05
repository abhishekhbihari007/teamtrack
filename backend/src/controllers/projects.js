import Project from '../models/Project.js';
import asyncHandler from '../utils/asyncHandler.js';

// Get all projects for current user
export const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ members: req.user.id }).populate('members', 'name email');
  res.json(projects);
});

// Get single project
export const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).populate('members', 'name email');
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }
  res.json(project);
});

// Create new project
export const createProject = asyncHandler(async (req, res) => {
  const { name, description, members } = req.body;

  // Add current user to members if not included
  const projectMembers = [...new Set([...members, req.user.id])];

  const project = await Project.create({
    name,
    description,
    members: projectMembers,
    owner: req.user.id
  });

  res.status(201).json(project);
});

// Update project
export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  project.name = req.body.name || project.name;
  project.description = req.body.description || project.description;
  project.members = req.body.members || project.members;

  const updatedProject = await project.save();
  res.json(updatedProject);
});

// Delete project
export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  await project.deleteOne();
  res.json({ message: 'Project removed' });
});
