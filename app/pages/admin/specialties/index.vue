<script setup lang="ts">
import AddSpecialty from './addSpecialty.vue'
import SpecialtiesList from './specialtiesList.vue'
export interface EditType {
  _id: string
  englishName: string
  persianName: string
  slug: string
  isActive: boolean
}

const editItem = ref<null | EditType>(null)
const changeEditReactiveHandler = (data: EditType) => {
  editItem.value = data
}
</script>
<template>
  <AddSpecialty :edit-item="editItem" />
  <SpecialtiesList @edit="changeEditReactiveHandler" />
</template>
