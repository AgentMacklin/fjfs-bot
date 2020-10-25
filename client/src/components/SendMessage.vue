<template>
  <form id="message-form" v-on:submit.prevent="sendMessage">
    <label class="label" for="message">Send Message</label>
    <textarea name="message" id="" v-model="message" class="textarea" />
    <div class="form-controls">
      <div class="select">
        <select v-model="selectedChannel">
          <option value="" disabled selected>Select a channel...</option>
          <option v-for="(chan, i) in channels" :key="i" :value="chan.id">{{
            chan.name
          }}</option>
        </select>
      </div>
      <button type="submit" class="button is-link" style="margin-left: 1rem">
        Send
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, inject, toRefs } from "vue"
import socket from "@/socket"

export default defineComponent({
  setup() {
    const channels: any | undefined = inject("channels")

    const state = reactive({
      message: "",
      selectedChannel: ""
    })

    // send a message "from the bot" to a given channel
    const sendMessage = () => {
      if (state.selectedChannel === "") {
        alert("Please select a channel")
        return
      }
      socket.emit("send-message", {
        channel: state.selectedChannel,
        message: state.message
      })
      state.message = ""
    }

    return { ...toRefs(state), channels, sendMessage }
  }
})
</script>

<style scoped>
.form-controls {
  margin: 1rem 0;
}

#message-form {
  margin: 1rem 0;
}
</style>
