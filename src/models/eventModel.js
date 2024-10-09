import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  isVirtual: {
    type: Boolean,
    default: false,
  },
  virtualLink: {
    type: String,
    validate: {
      validator: function(v) {
        return !this.isVirtual || /^https?:\/\/[^\s]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  date: {
    type: Date,
    required: true,
  },
  endDate: Date,
  organizer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  attendees: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  capacity: {
    type: Number,
    default: 0,
  },
  tickets: {
    available: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: 'USD',
    },
  },
  category: String,
  rsvpRequired: {
    type: Boolean,
    default: true,
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming',
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

eventSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Event = model('Event', eventSchema);
export default Event;
