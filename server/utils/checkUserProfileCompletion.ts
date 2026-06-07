import { UserDocument } from '../model/User'

export const checkDoctorProfileCompletion = (doctor: UserDocument) => {
  if (!doctor) return false

  const { firstName, lastName, doctorInfo } = doctor

  return !!(
    firstName &&
    lastName &&
    doctorInfo?.bio &&
    doctorInfo?.visitPrice &&
    doctorInfo?.specialty
  )
}
export const checkUserProfileCompletion = (user: UserDocument) => {
  if (!user) return false
  const { firstName, lastName } = user
  return !!(firstName && lastName)
}
