/**
 * Import this socket into any component that needs it.
 */

import io from "socket.io-client"

export default io("ws://pi-bot:3000")
