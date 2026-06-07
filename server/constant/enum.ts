export const weekDayEnum = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
] as const

export const roleEnum = ['user', 'doctor', 'admin'] as const

export type Role = (typeof roleEnum)[number]
export type WeekDay = (typeof weekDayEnum)[number]
