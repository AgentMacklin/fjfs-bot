<template>
  <div class="content">
    <h1>fjfs-bot</h1>
    <send-message />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import SendMessage from "@/components/SendMessage.vue"

export default defineComponent({
  name: "App",
  components: {
    SendMessage
  }
})
</script>
