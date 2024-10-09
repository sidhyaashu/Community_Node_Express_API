// controllers/profileController.js

import Profile from '../models/profileModel.js';

// Create a new profile
export const createProfile = async (req, res) => {
  try {
    const { userId, username, email, phone, profilePicture, bio, dateOfBirth, year, interests, skills, socialLinks, programs } = req.body;

    // Create a new profile instance
    const profile = new Profile({
      userId,
      username,
      email,
      phone,
      profilePicture,
      bio,
      dateOfBirth,
      year,
      interests,
      skills,
      socialLinks,
      programs,
    });

    // Save the profile to the database
    await profile.save();
    return res.status(201).json({ success: true, message: 'Profile created successfully', profile });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Get all profiles with optional filtering and sorting
export const getAllProfiles = async (req, res) => {
  try {
    const { search, sortBy } = req.query;

    // Build query filters
    const filters = {};
    if (search) {
      filters.username = { $regex: search, $options: 'i' }; // Case-insensitive search
    }

    // Define sorting
    const sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = 1; // Ascending sort
    }

    const profiles = await Profile.find(filters).sort(sortOptions);
    return res.status(200).json({ success: true, profiles });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Get a single profile by user ID
export const getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findOne({ userId: id });

    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    return res.status(200).json({ success: true, profile });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Update a profile by user ID
export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find and update the profile
    const profile = await Profile.findOneAndUpdate({ userId: id }, updates, { new: true, runValidators: true });

    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    return res.status(200).json({ success: true, message: 'Profile updated successfully', profile });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Delete a profile by user ID
export const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findOneAndDelete({ userId: id });

    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    return res.status(200).json({ success: true, message: 'Profile deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Follow another user
export const followUser = async (req, res) => {
  try {
    const { userId } = req.params; // User to follow
    const { followerId } = req.body; // Follower's ID

    const profileToFollow = await Profile.findOne({ userId });
    const followerProfile = await Profile.findOne({ userId: followerId });

    if (!profileToFollow || !followerProfile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    // Add follower to the following list
    if (!profileToFollow.followers.includes(followerId)) {
      profileToFollow.followers.push(followerId);
      await profileToFollow.save();
    }

    // Add user to following list of follower
    if (!followerProfile.following.includes(userId)) {
      followerProfile.following.push(userId);
      await followerProfile.save();
    }

    return res.status(200).json({ success: true, message: 'Followed successfully', profile: profileToFollow });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Unfollow a user
export const unfollowUser = async (req, res) => {
  try {
    const { userId } = req.params; // User to unfollow
    const { followerId } = req.body; // Follower's ID

    const profileToUnfollow = await Profile.findOne({ userId });
    const followerProfile = await Profile.findOne({ userId: followerId });

    if (!profileToUnfollow || !followerProfile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    // Remove follower from the following list
    profileToUnfollow.followers = profileToUnfollow.followers.filter(follower => !follower.equals(followerId));
    await profileToUnfollow.save();

    // Remove user from following list of follower
    followerProfile.following = followerProfile.following.filter(following => !following.equals(userId));
    await followerProfile.save();

    return res.status(200).json({ success: true, message: 'Unfollowed successfully', profile: profileToUnfollow });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Add a social link to a profile
export const addSocialLink = async (req, res) => {
  try {
    const { id } = req.params; // User ID
    const { platform, url } = req.body;

    const profile = await Profile.findOne({ userId: id });
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    profile.socialLinks.push({ platform, url });
    await profile.save();

    return res.status(200).json({ success: true, message: 'Social link added successfully', profile });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Remove a social link from a profile
export const removeSocialLink = async (req, res) => {
  try {
    const { id, linkId } = req.params; // User ID and Social Link ID

    const profile = await Profile.findOne({ userId: id });
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    profile.socialLinks.id(linkId).remove();
    await profile.save();

    return res.status(200).json({ success: true, message: 'Social link removed successfully', profile });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Add a program to a profile
export const addProgram = async (req, res) => {
  try {
    const { id } = req.params; // User ID
    const { programName, programType, major, subPrograms } = req.body;

    const profile = await Profile.findOne({ userId: id });
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    profile.programs.push({ programName, programType, major, subPrograms });
    await profile.save();

    return res.status(200).json({ success: true, message: 'Program added successfully', profile });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Remove a program from a profile
export const removeProgram = async (req, res) => {
  try {
    const { id, programId } = req.params; // User ID and Program ID

    const profile = await Profile.findOne({ userId: id });
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    profile.programs.id(programId).remove();
    await profile.save();

    return res.status(200).json({ success: true, message: 'Program removed successfully', profile });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
