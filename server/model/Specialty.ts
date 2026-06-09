import mongoose, { Schema, type InferSchemaType } from 'mongoose'
import { slugRegex } from '~~/server/constant/regex'

const SpecialtySchema = new Schema(
  {
    persianName: {
      type: String,
      required: [true, 'نام فارسی تخصص الزامی است.'],
      unique: true,
      trim: true,
      minlength: [2, 'نام فارسی تخصص باید حداقل ۲ کاراکتر باشد.'],
      maxlength: [50, 'نام فارسی تخصص نمی‌تواند بیشتر از 50 کاراکتر باشد.'],
    },

    englishName: {
      type: String,
      required: [true, 'نام انگلیسی تخصص الزامی است.'],
      unique: true,
      trim: true,
      minlength: [2, 'نام انگلیسی تخصص باید حداقل ۲ کاراکتر باشد.'],
      maxlength: [50, 'نام انگلیسی تخصص نمی‌تواند بیشتر از 50 کاراکتر باشد.'],
    },

    slug: {
      type: String,
      required: [true, 'اسلاگ الزامی است.'],
      unique: true,
      trim: true,
      minlength: [2, 'اسلاگ تخصص باید حداقل ۲ کاراکتر باشد.'],
      maxlength: [50, 'اسلاگ تخصص نمی‌تواند بیشتر از 50 کاراکتر باشد.'],
      match: [
        slugRegex,
        'اسلاگ فقط می‌تواند شامل حروف کوچک انگلیسی و خط تیره باشد',
      ],
    },

    icon: {
      type: String,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
)

export type SpecialtyDocument = InferSchemaType<typeof SpecialtySchema>

export const Specialty =
  mongoose.models.Specialty || mongoose.model('Specialty', SpecialtySchema)
