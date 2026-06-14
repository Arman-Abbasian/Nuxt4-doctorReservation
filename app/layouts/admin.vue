<script setup lang="ts"></script>
<template>
  <div class="flex w-screen h-screen">
    <div class="w-64 bg-primary overflow-auto pt-4">
      <ul class="flex flex-col gap-4 px-4">
        <li><NuxtLink to="/admin">خانه</NuxtLink></li>
        <li><NuxtLink to="/admin/doctors">پزشکان</NuxtLink></li>
        <li><NuxtLink to="/admin/users">کاربران</NuxtLink></li>
        <li><NuxtLink to="/admin/comments">نظرات</NuxtLink></li>
        <li><NuxtLink to="/admin/specialties">تخصص ها</NuxtLink></li>
      </ul>
    </div>
    <div class="flex-1 overflow-auto pt-4"><slot /></div>
  </div>
</template>
