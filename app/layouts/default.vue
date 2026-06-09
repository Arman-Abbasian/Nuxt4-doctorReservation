<script setup lang="ts">
const list = [
  { id: 1, name: 'پزشکان', link: '/doctor' },
  { id: 2, name: 'درباره ما', link: '/about-us' },
  { id: 3, name: 'تماس با ما', link: '/contact-us' },
]
</script>

<template>
  <div>
    <nav
      class="h-16 shadow-md flex items-center justify-between p-4 w-full bg-primary"
    >
      <ul class="flex items-center gap-6">
        <li
          class="cursor-pointer py-2 px-4 rounded-md hover:bg-primary-dark"
          v-for="item in list"
          :key="item.id"
        >
          <NuxtLink :to="item.link">
            {{ item.name }}
          </NuxtLink>
        </li>
      </ul>
      <div><Icon name="lucide:user-round" size="36px" /></div>
    </nav>
    <slot />
  </div>
</template>
