export type WeekDay =
  | 'saturday'
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'

export interface DoctorWorkTime {
  _id: string
  day: WeekDay
  start: string
  end: string
}

export interface DoctorInfo {
  _id: string
  bio: string
  visitPrice: number
  workTimes: DoctorWorkTime[]
  specialty: string
}

export interface DoctorAdminType {
  _id: string
  mobile: string
  isActive: boolean
  firstName: string
  lastName: string
  doctorInfo: DoctorInfo
  isProfileCompleted: boolean
}
