import mongoose from 'mongoose'
import { slugRegex } from '../constant/regex'

const SpecialtySchema = new mongoose.Schema(
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
      required: [true, 'اسلاگ  الزامی است.'],
      unique: true,
      trim: true,
      minlength: [2, ' اسلاگ تخصص باید حداقل ۲ کاراکتر باشد.'],
      maxlength: [50, 'اسلاگ انگلیسی تخصص نمی‌تواند بیشتر از 50 کاراکتر باشد.'],
      match: [
        slugRegex,
        'اسلاگ فقط می‌تواند شامل حروف کوچک انگلیسی و خط تیره باشد ',
      ],
    },

    icon: {
      type: String,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Specialty', SpecialtySchema)
