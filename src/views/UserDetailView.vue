<template>
  <div class="grid gap-3 items-start md:grid-cols-[1fr_3fr]">
    <UserDetailCard :id="id" class="w-full" />
    <div class="flex flex-col gap-3">
      <AddPostForm :id="id" />
      <UserPostList :id="id" />
    </div>
  </div>
</template>

<script setup>
import UserDetailCard from '../components/UserDetail/UserDetailCard/UserDetailCard.vue'
import UserPostList from '../components/UserDetail/UserPosts/UserPostList.vue'
import AddPostForm from '../components/UserDetail/UserPosts/AddPostForm.vue'

defineProps({
  id: {
    type: Number,
    required: true,
  },
})
</script>
