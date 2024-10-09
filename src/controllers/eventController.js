// controllers/eventController.js

import Event from '../models/eventModel.js';

// Create a new event
export const createEvent = async (req, res) => {
  try {
    const { title, description, location, isVirtual, virtualLink, date, endDate, organizer, capacity, tickets, category, rsvpRequired, isPublic } = req.body;

    // Create a new event instance
    const event = new Event({
      title,
      description,
      location,
      isVirtual,
      virtualLink,
      date,
      endDate,
      organizer,
      capacity,
      tickets,
      category,
      rsvpRequired,
      isPublic,
    });

    // Save the event to the database
    await event.save();
    return res.status(201).json({ success: true, message: 'Event created successfully', event });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Get all events with optional query parameters for filtering and sorting
export const getAllEvents = async (req, res) => {
  try {
    const { search, status, sortBy } = req.query;

    // Build query filters
    const filters = {};
    if (search) {
      filters.title = { $regex: search, $options: 'i' }; // Case-insensitive search
    }
    if (status) {
      filters.status = status;
    }

    // Define sorting
    const sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = 1; // Ascending sort
    }

    const events = await Event.find(filters).sort(sortOptions);
    return res.status(200).json({ success: true, events });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Get a single event by ID
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    return res.status(200).json({ success: true, event });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Update an event by ID
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find and update the event
    const event = await Event.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    return res.status(200).json({ success: true, message: 'Event updated successfully', event });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Delete an event by ID
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    return res.status(200).json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// RSVP for an event
export const rsvpEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body; // Assuming userId is passed in the request body

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Add user to attendees if not already present
    if (!event.attendees.includes(userId)) {
      event.attendees.push(userId);
      await event.save();
    }

    return res.status(200).json({ success: true, message: 'RSVP successful', event });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Cancel RSVP for an event
export const cancelRsvpEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body; // Assuming userId is passed in the request body

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Remove user from attendees if present
    event.attendees = event.attendees.filter(attendee => !attendee.equals(userId));
    await event.save();

    return res.status(200).json({ success: true, message: 'RSVP cancelled successfully', event });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
