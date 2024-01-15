import { useEffect, useState } from 'react'
import { HangImage } from './components/HangImage'
import { letters } from './helpers/letters'
import './App.css'
import { getRandomWord } from './helpers/getRandomWord'

function App() {

  const [word, setWord] = useState(getRandomWord())
  const [hiddenWord, setHiddenWord] = useState('_ '.repeat(word.length))
  const [attempts, setAttempts] = useState(0)
  const [lose, setLose] = useState(false)
  const [won, setWon] = useState(false)

  useEffect(() => {

    if (attempts >= 9) {
      setLose(true)
    }

  }, [attempts])

  useEffect(() => {

    const currentHiddenWord = hiddenWord.split(' ').join('')

    if (currentHiddenWord === word) {
      setWon(true)
    }

  }, [hiddenWord, word])

  const checkLetter = (letter: string) => {

    if (lose) return

    if (won) return

    if (!word.includes(letter)) {
      setAttempts(Math.min(attempts + 1, 9))
      return
    }

    const hiddenWordArray = hiddenWord.split(' ')

    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        hiddenWordArray[i] = letter
      }
    }

    setHiddenWord(hiddenWordArray.join(' '))
  }

  const newGame = () => {
    const newWord = getRandomWord()

    setWord(newWord)
    setHiddenWord('_ '.repeat(newWord.length))
    setAttempts(0)
    setLose(false)
    setWon(false)
  }

  return (
    <div className="App">
      <HangImage imageNumber={attempts} />

      <h3>{hiddenWord}</h3>

      <h3>Intentos: {attempts}</h3>

      {
        lose
          ? (<h2>¡Perdió {word}!</h2>)
          : ''
      }

      {
        won
          ? (<h2>¡Felicidades, usted ganó!</h2>)
          : ''
      }

      {
        letters.map(letter => (
          <button key={letter} onClick={() => checkLetter(letter)}>
            {letter}
          </button>
        ))
      }

      <br /><br />
      <button onClick={newGame}>¿Nuevo Juego?</button>

    </div>
  )
}

export default App
