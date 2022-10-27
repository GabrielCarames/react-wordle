import { getWordList } from "../services"

export const getWinnerWord = async setWinnerWord => {
  const currentDay = new Date().getDay()
  const dailyWord = JSON.parse(localStorage.getItem("dailyWord"))
  if (!dailyWord || dailyWord.day !== currentDay) {
    const wordsList = await getWordList()
    const randomWord = wordsList[Math.floor(Math.random() * (wordsList.length - 1 - 0) + 0)]
    localStorage.setItem("dailyWord", JSON.stringify({ word: randomWord, day: currentDay }))
    setWinnerWord({ word: randomWord, day: currentDay })
    localStorage.setItem(
      "alreadyPlayed",
      JSON.stringify({ canPlay: true, result: false, winnerWord: null })
    )
    localStorage.setItem("words", null)
  } else setWinnerWord(JSON.parse(localStorage.getItem("dailyWord")))
}
