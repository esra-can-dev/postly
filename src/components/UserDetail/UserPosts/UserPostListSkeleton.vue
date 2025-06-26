<template>
  <div class="flex flex-col gap-4">
    <Fieldset v-for="n in USER_POST_PAGE_SIZE" :key="n" class="p-2">
      <template #legend>
        <div class="flex items-center content-between gap-2">
          <Button
            label="Delete"
            icon="pi pi-trash"
            severity="danger"
            outlined
            size="small"
          ></Button>
          <Skeleton width="10rem" height="1rem" class="p-2" />
        </div>
      </template>
      <Skeleton width="100%" height="3rem" />
    </Fieldset>
  </div>
</template>
<script setup>
import { USER_POST_PAGE_SIZE } from '@/constants/userPosts'
</script>
