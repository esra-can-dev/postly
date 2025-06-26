<template>
  <div class="p-4 border-green-600 border-b">
    <h2 class="text-xl font-bold text-green-600 mb-3">Add a New Post</h2>
    <VeeForm
      @submit="onSubmit"
      class="card flex flex-col md:items-start md:flex-row gap-4 justify-center"
    >
      <div class="md:w-5/12">
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-pencil"></i>
          </InputGroupAddon>
          <FloatLabel variant="on">
            <InputText id="on_title" v-model="title" :invalid="!!errors.title" />
            <label for="on_title">Title</label>
          </FloatLabel>
        </InputGroup>
        <Message v-show="errors.title" severity="error" variant="simple" size="small">{{
          errors.title
        }}</Message>
      </div>
      <div class="md:w-5/12">
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-comments"></i>
          </InputGroupAddon>
          <FloatLabel variant="on">
            <Textarea
              id="on_content"
              v-model="content"
              :invalid="!!errors.content"
              class="w-full h-11 min-h-11 align-middle"
            />
            <label for="on_content">Content</label>
          </FloatLabel>
        </InputGroup>
        <Message v-show="errors.content" severity="error" variant="simple" size="small">{{
          errors.content
        }}</Message>
      </div>
      <Button
        type="submit"
        class="w-full md:w-auto"
        label="Add"
        icon="pi pi-plus"
        :loading="addButtonLoading"
      />
    </VeeForm>
  </div>
</template>

<script setup>
import { Form as VeeForm, useForm } from 'vee-validate'
import * as yup from 'yup'
import useUserPosts from '@/composables/UserPosts/useUserPosts'

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
})

const schema = yup.object({
  title: yup.string().required().label('Title'),
  content: yup.string().required().label('Content'),
})
const { defineField, handleSubmit, resetForm, errors } = useForm({
  validationSchema: schema,
})
const [title] = defineField('title')
const [content] = defineField('content')

const { createPost, addButtonLoading } = useUserPosts()
const onSubmit = handleSubmit(async (values) => {
  const payload = {
    title: values.title,
    body: values.content,
    userId: props.id,
  }
  await createPost(payload)
  resetForm()
})
</script>
