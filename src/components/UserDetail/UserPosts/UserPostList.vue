<template>
  <div class="card p-4">
    <UserPostListSkeleton v-if="loading" />
    <DataView
      v-else
      :value="postList"
      paginator
      :rows="USER_POST_PAGE_SIZE"
      :totalRecords="totalPostCount"
      :lazy="true"
      :first="first"
      @page="onPageChange"
    >
      <template #list="slotProps">
        <div class="flex flex-col">
          <div v-for="(item, index) in slotProps.items" :key="index">
            <Fieldset>
              <template #legend>
                <div class="flex items-center content-between pl-2">
                  <Button
                    label="Delete"
                    icon="pi pi-trash"
                    severity="danger"
                    outlined
                    size="small"
                    class="w-full md:w-auto"
                    :loading="deleteButtonLoadingMap[item.id]"
                    @click="handleDeletePost(item.id)"
                  ></Button>
                  <span class="font-bold p-2">{{ item.title }}</span>
                </div>
              </template>
              <p class="m-0">
                {{ item.body }}
              </p>
            </Fieldset>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import useUserPosts from '@/composables/UserPosts/useUserPosts'
import { USER_POST_PAGE_SIZE } from '@/constants/userPosts'
import UserPostListSkeleton from './UserPostListSkeleton.vue'

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
})

const {
  postList,
  fetchPostsByUserId,
  loading,
  totalPostCount,
  deletePost,
  deleteButtonLoadingMap,
} = useUserPosts()
onMounted(async () => {
  await fetchPostsByUserId(props.id, 0)
})

const first = ref(0)
async function onPageChange(event) {
  first.value = event.first
  await fetchPostsByUserId(props.id, 0)
}

async function handleDeletePost(postId) {
  await deletePost(postId)
}
</script>
