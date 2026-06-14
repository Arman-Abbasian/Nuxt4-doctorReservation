<script setup lang="ts">
const {
  data: doctors,
  refresh,
  pending,
} = await useFetch('/api/admin/doctor', {
  key: 'admin-doctors-list', // برای جلوگیری از Fetch تکراری
})

// تابع تغییر وضعیت (این بخش در سمت کلاینت اجرا می‌شود)
const toggleStatus = async (id: string, currentStatus: boolean) => {
  try {
    // استفاده از Utility که قبلاً در بک‌ایند ساختیم (patch)
    await $fetch(`/api/admin/doctors/${id}/toggle-status`, {
      method: 'PATCH',
      body: { isActive: !currentStatus },
    })

    // بعد از آپدیت موفق، لیست را دوباره بدون رفرش کل صفحه واکشی می‌کنیم
    await refresh()

    // اینجا می‌توانی از یک Toast استفاده کنی
    console.log('وضعیت با موفقیت تغییر کرد')
  } catch (err) {
    alert('خطا در تغییر وضعیت')
  }
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">لیست پزشکان</h1>

    <div v-if="pending" class="animate-pulse">در حال بارگذاری...</div>

    <div v-else class="overflow-x-auto bg-white rounded-lg shadow">
      <!-- <UserCart v-for="item in doctors.data" iconName: string
  :userName="item.firstName+' '+item.lastName"
  :userMobile="item.mosbile"
  :isActive="item.isActive"/> -->
    </div>
  </div>
</template>
