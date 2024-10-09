import { Schema, model } from 'mongoose';

const discussionSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tags: [String],
  comments: [{
    commentBody: {
      type: String,
      required: true,
    },
    commentUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  upvotes: {
    type: Number,
    default: 0,
  },
  downvotes: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  pinned: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open',
  },
  isFlagged: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

discussionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Discussion = model('Discussion', discussionSchema);
export default Discussion;
