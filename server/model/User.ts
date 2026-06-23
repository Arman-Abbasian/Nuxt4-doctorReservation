import mongoose, {
  type HydratedDocument,
  type Model,
  type Types,
} from 'mongoose'

// constants
import {
  weekDayEnum,
  roleEnum,
  type WeekDay,
  type Role,
} from '~~/shared/constant/enum'
import { mobileRegex, timeRegex } from '~~/shared/constant/regex'

export interface IWorkTime {
  day?: WeekDay
  start?: string
  end?: string
}

export interface IDoctorInfo {
  specialty?: Types.ObjectId
  visitPrice?: number
  bio?: string
  workTimes?: IWorkTime[]
}

export interface IUser {
  firstName?: string | null
  lastName?: string | null
  mobile: string
  role: Role
  isActive: boolean
  isProfileCompleted: boolean
  otp?: string | null
  otpExpireAt?: Date | null
  doctorInfo?: IDoctorInfo
  refreshToken?: string
  createdAt?: Date
  updatedAt?: Date
}

export type UserDocument = HydratedDocument<IUser>
export type UserModel = Model<IUser>

const WorkTimeSchema = new mongoose.Schema<IWorkTime>(
  {
    day: {
      type: String,
      enum: weekDayEnum,
    },
    start: {
      type: String,
      match: [timeRegex, 'فرمت ساعت شروع باید hh:mm باشد'],
    },
    end: {
      type: String,
      match: [timeRegex, 'فرمت ساعت شروع باید hh:mm باشد'],
    },
  },
  { _id: false },
)

const DoctorInfoSchema = new mongoose.Schema<IDoctorInfo>(
  {
    specialty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Specialty',
    },
    visitPrice: {
      type: Number,
      min: [0, 'قیمت ویزیت نمی‌تواند عدد منفی باشد'],
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [1000, 'توضیحات پزشک نمی‌تواند بیش از ۱۰۰۰ کاراکتر باشد'],
    },
    workTimes: [WorkTimeSchema],
  },
  { _id: false },
)

const UserSchema = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
      default: null,
      minlength: [2, 'نام نمی‌تواند کمتر از 2 کاراکتر باشد'],
      maxlength: [50, 'نام نمی‌تواند بیشتر از 50 کاراکتر باشد'],
    },
    lastName: {
      type: String,
      default: null,
      minlength: [2, 'نام خانوادگی نمی‌تواند کمتر از 2 کاراکتر باشد'],
      maxlength: [50, 'نام خانوادگی نمی‌تواند بیشتر از 50 کاراکتر باشد'],
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [mobileRegex, 'شماره موبایل معتبر نیست'],
    },
    role: {
      type: String,
      enum: roleEnum,
      default: 'user',
    },
    isActive: { type: Boolean, default: true },
    isProfileCompleted: { type: Boolean, default: false },

    otp: {
      type: String,
      minlength: [5, 'رمز یک بار مصرف نمی‌تواند کمتر از 5 کاراکتر باشد'],
      maxlength: [6, 'رمز یک بار مصرف نمی‌تواند بیشتر از 6 کاراکتر باشد'],
    },
    otpExpireAt: { type: Date },

    doctorInfo: DoctorInfoSchema,

    refreshToken: { type: String },
  },
  { timestamps: true },
)

UserSchema.index({ mobile: 1 }, { unique: true })
UserSchema.index({ role: 1 })
UserSchema.index({ 'doctorInfo.specialty': 1 })

export const User =
  (mongoose.models.User as UserModel | undefined) ||
  mongoose.model<IUser>('User', UserSchema)
