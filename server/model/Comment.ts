import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'شناسه پزشک الزامی است.'],
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'شناسه کاربر الزامی است.'],
    },

    reservationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reservation',
      required: true, // اگر بخواهی فقط کسانی که ویزیت شده‌اند اجازه نظر داشته باشند می‌توانی required کنی
    },

    rating: {
      type: Number,
      min: [1, 'حداقل امتیاز ۱ است.'],
      max: [5, 'حداکثر امتیاز ۵ است.'],
      required: [true, 'امتیازدهی الزامی است.'],
    },

    comment: {
      type: String,
      trim: true,
      maxlength: [1000, 'متن نظر نمی‌تواند بیشتر از ۱۰۰۰ کاراکتر باشد.'],
    },

    status: {
      type: String,
      enum: {
        values: ['pending', 'approved', 'rejected'],
        message: 'وضعیت نظر معتبر نیست.',
      },
      default: 'pending',
    },
  },
  { timestamps: true },
)

CommentSchema.index({ doctorId: 1 })
CommentSchema.index({ userId: 1 })
CommentSchema.index({ doctorId: 1, rating: -1 })
CommentSchema.index({ reservationId: 1 })

module.exports = mongoose.model('Comment', CommentSchema)
