import { User } from '../models/index.js';

// Get all users (for admin or selecting members)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('name email role status');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error getting users' });
  }
};

// Update user role
export const updateUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = req.body.role;
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Update role failed' });
  }
};
