import axios from "axios"

export const getWordList = async () =>
  await axios
    .get("https://raw.githubusercontent.com/GabrielCarames/spanish-word-list/main/words-list.txt")
    .then(res => res.data.split(","))
