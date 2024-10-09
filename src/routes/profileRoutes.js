import express from 'express';
import {
  createProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
  followUser,
  unfollowUser,
  addSocialLink,
  removeSocialLink,
  addProgram,
  removeProgram,
} from '../controllers/profileController.js';

const router = express.Router();

// Route to create a new profile
router.post('/', createProfile);

// Route to get all profiles with optional filtering and sorting
router.get('/', getAllProfiles);

// Route to get a single profile by user ID
router.get('/:id', getProfileById);

// Route to update a profile by user ID
router.put('/:id', updateProfile);

// Route to delete a profile by user ID
router.delete('/:id', deleteProfile);

// Route to follow another user
router.post('/:userId/follow', followUser);

// Route to unfollow a user
router.post('/:userId/unfollow', unfollowUser);

// Route to add a social link to a profile
router.post('/:id/social-links', addSocialLink);

// Route to remove a social link from a profile
router.delete('/:id/social-links/:linkId', removeSocialLink);

// Route to add a program to a profile
router.post('/:id/programs', addProgram);

// Route to remove a program from a profile
router.delete('/:id/programs/:programId', removeProgram);

export default router;
