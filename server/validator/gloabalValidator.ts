import { z } from 'zod'
import mongoose from 'mongoose'

//constants
import { dateRegex } from '../constant/regex'

//validators
import { objectId } from './generalValidator'

exports.getAvailableTimesValidator = z.object({
  query: z.object({
    date: z.string().regex(dateRegex, 'فرمت تاریخ نامعتبر است'),
  }),
})
