import Discussion from '../models/discussionModel.js';
import { validationResult } from 'express-validator'; // For validation handling

// Create a new discussion
export const createDiscussion = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, body, user, tags } = req.body;

    const discussion = new Discussion({
      title,
      body,
      user,
      tags
    });

    const savedDiscussion = await discussion.save();
    res.status(201).json(savedDiscussion);

  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
};

// Get all discussions with pagination, sorting, filtering
export const getAllDiscussions = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'createdAt', status, pinned, isFlagged, tags } = req.query;

    const query = {};
    if (status) query.status = status;
    if (pinned) query.pinned = pinned === 'true';
    if (isFlagged) query.isFlagged = isFlagged === 'true';
    if (tags) query.tags = { $in: tags.split(',') }; // For filtering by multiple tags

    const discussions = await Discussion.find(query)
      .populate('user', 'email') // Populate user info (showing only email)
      .sort({ [sort]: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Discussion.countDocuments(query);

    res.status(200).json({
      discussions,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });

  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
};

// Get a single discussion by ID
export const getDiscussionById = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id)
      .populate('user', 'email') // Populate user info (showing only email)
      .populate('comments.commentUser', 'email'); // Populate comment user info

    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }

    // Increment the views count
    discussion.views += 1;
    await discussion.save();

    res.status(200).json(discussion);

  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
};

// Update a discussion
export const updateDiscussion = async (req, res) => {
  try {
    const updates = req.body;
    const discussion = await Discussion.findById(req.params.id);

    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }

    Object.keys(updates).forEach(key => {
      discussion[key] = updates[key];
    });

    const updatedDiscussion = await discussion.save();
    res.status(200).json(updatedDiscussion);

  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
};

// Delete a discussion
export const deleteDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);

    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }

    await discussion.remove();
    res.status(200).json({ message: 'Discussion deleted successfully' });

  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
};

// Add a comment to a discussion
export const addComment = async (req, res) => {
  try {
    const { commentBody, commentUser } = req.body;
    const discussion = await Discussion.findById(req.params.id);

    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }

    discussion.comments.push({
      commentBody,
      commentUser,
      createdAt: Date.now(),
    });

    await discussion.save();
    res.status(200).json(discussion);

  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
};

// Delete a comment from a discussion
export const deleteComment = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);

    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }

    discussion.comments = discussion.comments.filter(
      (comment) => comment._id.toString() !== req.params.commentId
    );

    await discussion.save();
    res.status(200).json({ message: 'Comment deleted successfully' });

  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
};

// Upvote a discussion
export const upvoteDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);

    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }

    discussion.upvotes += 1;
    await discussion.save();
    res.status(200).json({ message: 'Upvoted successfully', upvotes: discussion.upvotes });

  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
};

// Downvote a discussion
export const downvoteDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);

    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }

    discussion.downvotes += 1;
    await discussion.save();
    res.status(200).json({ message: 'Downvoted successfully', downvotes: discussion.downvotes });

  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
};

// Pin a discussion
export const pinDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);

    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }

    discussion.pinned = true;
    await discussion.save();
    res.status(200).json({ message: 'Discussion pinned successfully' });

  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
};

// Unpin a discussion
export const unpinDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);

    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }

    discussion.pinned = false;
    await discussion.save();
    res.status(200).json({ message: 'Discussion unpinned successfully' });

  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
};

// Flag a discussion
export const flagDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);

    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }

    discussion.isFlagged = true;
    await discussion.save();
    res.status(200).json({ message: 'Discussion flagged for review' });

  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
};

// Unflag a discussion
export const unflagDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);

    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }

    discussion.isFlagged = false;
    await discussion.save();
    res.status(200).json({ message: 'Flag removed from discussion' });

  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
};
