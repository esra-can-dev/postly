<template>
  <div class="card">
    <div v-if="loading">esra</div>
    <DataView
      v-else
      :value="postList"
      paginator
      :rows="3"
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

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
})

const { postList, fetchPostsByUserId, loading, totalPostCount } = useUserPosts()
onMounted(async () => {
  await fetchPostsByUserId(props.id, 0)
})

const first = ref(0)
function onPageChange(event) {
  first.value = event.first
  fetchPostsByUserId(props.id, event.page)
}
</script>
