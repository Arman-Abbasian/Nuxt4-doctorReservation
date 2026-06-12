<script setup lang="ts"></script>
<template>
  <div class="flex w-screen h-screen">
    <div class="w-64 bg-primary overflow-auto pt-4">
      <ul class="flex flex-col gap-4 px-4">
        <li>خانه</li>
        <li>پزشکان</li>
        <li>کاربران</li>
        <li>نظرات</li>
      </ul>
    </div>
    <div class="flex-1 overflow-auto pt-4"><slot /></div>
  </div>
</template>
