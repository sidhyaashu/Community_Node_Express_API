import express from 'express';
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  rsvpEvent,
  cancelRsvpEvent
} from '../controllers/eventController.js';

const router = express.Router();

// Create a new event
router.post('/events', createEvent);

// Get all events with optional filtering and sorting
router.get('/events', getAllEvents);

// Get a single event by ID
router.get('/events/:id', getEventById);

// Update an event by ID
router.put('/events/:id', updateEvent);

// Delete an event by ID
router.delete('/events/:id', deleteEvent);

// RSVP to an event
router.post('/events/:id/rsvp', rsvpEvent);

// Cancel RSVP for an event
router.post('/events/:id/cancel-rsvp', cancelRsvpEvent);

export default router;
