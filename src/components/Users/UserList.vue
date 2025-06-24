<template>
  <DataTable :value="userList" tableStyle="min-width: 50rem">
    <template #header>
      <div class="flex flex-wrap items-center justify-between gap-2">
        <span class="text-xl font-bold">Users</span>
        <Button icon="pi pi-refresh" rounded raised />
      </div>
    </template>
    <Column field="name" header="Name"></Column>
  </DataTable>
</template>

<script setup>
import { onMounted } from 'vue'
import useUsers from '@/composables/Users/useUsers'

const { userList, fetchUsers } = useUsers()
onMounted(async () => {
  fetchUsers()
})
</script>
