import { readBody } from 'h3'
import { User } from '~~/server/model/User'
import { successResponse, errorResponse } from '~~/server/utils/response'
import { WeekDay } from '~~/shared/constant/enum'

type UpdateDayScheduleBody = {
  day: WeekDay
  start: string
  end: string
}

export default defineEventHandler(async (event) => {
  try {
    const { day, start, end } = await readBody<UpdateDayScheduleBody>(event)
    const doctorId = event.context.user?.userId

    if (!doctorId) {
      return errorResponse(event, 401, 'کاربر احراز هویت نشده است', null)
    }

    const doctor = await User.findById(doctorId)

    if (!doctor) {
      return errorResponse(event, 404, 'پزشک یافت نشد', null)
    }
    if (!doctor.doctorInfo) {
      doctor.doctorInfo = {
        workTimes: [],
      }
    }

    if (!doctor.doctorInfo.workTimes) {
      doctor.doctorInfo.workTimes = []
    }

    const workTimes = doctor.doctorInfo.workTimes

    const existingWorkTime = workTimes.find((item) => item.day === day)

    if (existingWorkTime) {
      existingWorkTime.start = start
      existingWorkTime.end = end
    } else {
      workTimes.push({ day, start, end })
    }

    await doctor.save()

    return successResponse(event, 200, 'برنامه با موفقیت بروزرسانی شد')
  } catch (err: any) {
    return errorResponse(
      event,
      500,
      'خطا در بروزرسانی برنامه روزانه',
      err?.message || 'خطای ناشناخته',
    )
  }
})
