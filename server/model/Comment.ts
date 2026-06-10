import mongoose, { Schema, type InferSchemaType } from 'mongoose'

const CommentSchema = new Schema(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // فرض بر این است که اطلاعات پزشک هم در مدل User است
      required: [true, 'شناسه پزشک الزامی است.'],
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'شناسه کاربر الزامی است.'],
    },

    reservationId: {
      type: Schema.Types.ObjectId,
      ref: 'Reservation',
      required: [true, 'شناسه نوبت الزامی است.'], // الزامی بودن برای حفظ یکپارچگی نظر با ویزیت
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
        message: 'وضعیت {VALUE} برای نظر معتبر نیست.',
      },
      default: 'pending',
    },
  },
  {
    timestamps: true,
    // برای اینکه فیلدهای مجازی هم در خروجی JSON (مثل APIها) ظاهر شوند
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// --- ایندکس‌ها برای بهینه‌سازی جستجو ---
CommentSchema.index({ doctorId: 1 })
CommentSchema.index({ userId: 1 })
CommentSchema.index({ reservationId: 1 }, { unique: true }) // هر رزرو فقط یک نظر داشته باشد
CommentSchema.index({ doctorId: 1, status: 1, rating: -1 }) // برای نمایش نظرات تایید شده پزشک بر اساس امتیاز

// --- استخراج تایپ از اسکیما ---
export type CommentDocument = InferSchemaType<typeof CommentSchema>

// --- خروجی مدل ---
export const Comment =
  mongoose.models.Comment || mongoose.model('Comment', CommentSchema)
