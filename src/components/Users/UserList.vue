<template>
  <DataTable
    :value="userList"
    :loading="loading"
    :rowClass="() => 'hover:bg-green-50 cursor-pointer'"
    @row-click="onRowClick"
  >
    <template #header>
      <div class="flex flex-wrap items-center justify-between gap-2">
        <span class="text-xl font-bold">Users</span>
        <Button icon="pi pi-refresh" rounded raised @click="refreshUsers" />
      </div>
    </template>
    <Column field="name" header="Name" />
  </DataTable>
</template>

<script setup>
import { onMounted } from 'vue'
import useUsers from '@/composables/Users/useUsers'
import { useRouter } from 'vue-router'

const { userList, fetchUsers, loading } = useUsers()
onMounted(async () => {
  fetchUsers()
})

const refreshUsers = () => fetchUsers()

const router = useRouter()
function onRowClick(event) {
  const userId = event.data.id
  router.push(`/users/${userId}`)
}
</script>
