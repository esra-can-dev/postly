<template>
  <Card class="p-4 rounded shadow border-green-600 border-2 max-w-2xs">
    <template #content>
      <div v-if="loading">
        <UserDetailCardSkeleton />
      </div>

      <div v-else class="flex flex-col items-center">
        <img
          :src="`https://ui-avatars.com/api/?name=${userDetail.name}&background=random`"
          alt="User avatar"
          class="w-24 h-24 rounded-full shadow mb-3"
        />
        <h2 class="text-xl font-bold text-green-600 mb-3">{{ userDetail.name }}</h2>

        <div class="grid grid-cols-[1fr_5fr] gap-y-3 items-center">
          <i class="pi pi-envelope text-green-600" />
          <p class="border-b border-gray-300 pb-1">{{ userDetail.email }}</p>

          <i class="pi pi-phone text-green-600" />
          <p class="border-b border-gray-300 pb-1">{{ userDetail.phone }}</p>

          <i class="pi pi-map-marker text-green-600" />
          <p>
            {{ address }}
          </p>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import useUserDetailCard from '@/composables/Users/useUserDetailCard'
import UserDetailCardSkeleton from './UserDetailCardSkeleton.vue'

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
})

const { userDetail, fetchUserById, loading } = useUserDetailCard()
onMounted(async () => {
  fetchUserById(props.id)
})

const address = computed(() =>
  Object.keys(userDetail.value).length === 0
    ? ''
    : `${userDetail.value?.address?.street} St, ${userDetail.value?.address?.suite}, ${userDetail.value?.address?.city}, ${userDetail.value?.address?.zipcode}`,
)
</script>
