<template>
  <div class="container">
    <h1 class="is-size-2">fjfs-bot</h1>
    <send-message />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, provide, ref } from "vue"
import SendMessage from "@/components/SendMessage.vue"
import socket from "@/socket"

export default defineComponent({
  name: "App",
  setup() {
    const channels = ref<any[]>([])

    // Get a list of all the text channels when we load the app
    onMounted(async () => {
      socket.emit("get-channels")
      socket.on("channels", (data: string) => {
        const botChannels: any[] = JSON.parse(data)
        const textChannels = botChannels.filter(chan => chan.type === "text")
        channels.value = textChannels
      })
    })

    provide("channels", channels)
  },
  components: {
    SendMessage
  }
})
</script>
