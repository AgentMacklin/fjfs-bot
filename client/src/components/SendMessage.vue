<template>
  <form id="message-form" v-on:submit.prevent="sendMessage">
    <label for="message">Send Message</label>
    <textarea name="message" id="" v-model="message" />
    <button type="submit" class="primary right">Send</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue"
import api from "@/api"

export default defineComponent({
  setup() {
    const message = ref<string>("")

    onMounted(async () => {
      const response = await api.get("/")
      console.log(response.data.data)
    })

    const sendMessage = () => {
      console.log(message.value)
      message.value = ""
    }

    return { message, sendMessage }
  }
})
</script>

<style>
#message-form {
  margin: 1rem 0;
}
</style>
