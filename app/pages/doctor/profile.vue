<script setup lang="tsx">
//API
const { data: initialDoctorProfile, error } = await useFetch<ApiResponse<any>>(
  '/api/doctor/profile',
  {
    key: 'doctor-profile',
  },
)
console.log(initialDoctorProfile.value, error.value)
</script>

<template>
  <div>ssfsd</div>
</template>
