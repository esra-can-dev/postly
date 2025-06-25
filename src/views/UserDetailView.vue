<template>
  <div class="grid grid-cols-[1fr_3fr] gap-3 items-center">
    <UserDetailCard :id="id" />
    <UserPostList :id="id" />
  </div>
</template>

<script setup>
import UserDetailCard from '../components/UserDetail/UserDetailCard/UserDetailCard.vue'
import UserPostList from '../components/UserDetail/UserPosts/UserPostList.vue'

defineProps({
  id: {
    type: Number,
    required: true,
  },
})
</script>
