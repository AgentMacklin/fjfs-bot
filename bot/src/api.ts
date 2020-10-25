
import axios from 'axios'


const dadJokeApi = axios.create({
    baseURL: "https://icanhazdadjoke.com/",
    timeout: 1500,
    headers: { "Accept": "application/json" }
})

const insultApi = axios.create({
    baseURL: "https://evilinsult.com/generate_insult.php?lang=en&type=json"
})


export const getRandomDadJoke = async (): Promise<string> => {
    try {
        const response = await dadJokeApi.get("/")
        return response.data.joke

    } catch (err) {
        console.error(err)
        return "I couldn't think of a joke. ☹️"
    }
}


export const getInsult = async (name: string): Promise<string> => {
    try {
        const response = await insultApi.get("/")
        let insult: string = response.data
        insult = `${insult.charAt(0) === "I" ? "I" : insult.substring(0, 1).toLowerCase()}${insult.substring(1)}`
        return `${name}, ${insult}`
    } catch (err) {
        console.error(err)
        return "I couldn't think of a good insult, sorry. ☹️"
    }
}