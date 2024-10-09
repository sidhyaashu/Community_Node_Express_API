import express from "express";
import { body } from "express-validator"; // For input validation

import {
  createDiscussion,
  getAllDiscussions,
  getDiscussionById,
  updateDiscussion,
  deleteDiscussion,
  addComment,
  deleteComment,
  upvoteDiscussion,
  downvoteDiscussion,
  pinDiscussion,
  unpinDiscussion,
  flagDiscussion,
  unflagDiscussion,
} from "../controllers/discussionController.js";

const router = express.Router();

// Validation for creating and updating discussions
const discussionValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("body").notEmpty().withMessage("Body content is required"),
  body("user").notEmpty().withMessage("User is required"),
];

// Routes for discussion operations

// Create a new discussion
router.post("/discussions", discussionValidation, createDiscussion);

// Get all discussions with pagination, sorting, and filtering
router.get("/discussions", getAllDiscussions);

// Get a single discussion by ID
router.get("/discussions/:id", getDiscussionById);

// Update a discussion
router.put("/discussions/:id", updateDiscussion);

// Delete a discussion
router.delete("/discussions/:id", deleteDiscussion);

// Add a comment to a discussion
router.post("/discussions/:id/comments", addComment);

// Delete a comment from a discussion
router.delete("/discussions/:id/comments/:commentId", deleteComment);

// Upvote a discussion
router.post("/discussions/:id/upvote", upvoteDiscussion);

// Downvote a discussion
router.post("/discussions/:id/downvote", downvoteDiscussion);

// Pin a discussion
router.post("/discussions/:id/pin", pinDiscussion);

// Unpin a discussion
router.post("/discussions/:id/unpin", unpinDiscussion);

// Flag a discussion for review
router.post("/discussions/:id/flag", flagDiscussion);

// Unflag a discussion
router.post("/discussions/:id/unflag", unflagDiscussion);

export default router;
