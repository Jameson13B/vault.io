import { useState } from 'react'

import { Footer } from './footer/Footer'
import { Header } from './header/Header'
import { useBank } from './hooks/useBank'
import { Leaderboard } from './leaderboard/Leaderboard'
import { OnboardingLeaderboard } from './onboarding/Onboarding'

function App() {
  const [isOnboarding, setIsOnboarding] = useState(true)
  const [isBanking, setIsBanking] = useState(false)
  const [rounds, setRounds] = useState(10)
  const [playersToBank, setPlayersToBank] = useState<string[]>([])
  const { gameState, addPlayer, bank, removePlayer, replay, rollDice } =
    useBank({
      rounds,
    })

  return (
    <>
      <Header
        addPlayer={addPlayer}
        gameState={gameState}
        isOnboarding={isOnboarding}
      />
      {isOnboarding ? (
        <OnboardingLeaderboard
          gameState={gameState}
          removePlayer={removePlayer}
        />
      ) : (
        <Leaderboard
          gameState={gameState}
          isBanking={isBanking}
          playersToBank={playersToBank}
          setPlayersToBank={setPlayersToBank}
        />
      )}
      <Footer
        gameState={gameState}
        isBanking={isBanking}
        isOnboarding={isOnboarding}
        playersToBank={playersToBank}
        rollDice={rollDice}
        rounds={rounds}
        setIsBanking={setIsBanking}
        setIsOnboarding={setIsOnboarding}
        setPlayersToBank={setPlayersToBank}
        setRounds={setRounds}
        bank={bank}
        replay={replay}
      />
    </>
  )
}

export default App

// TODO:
// - Add rules
// - Undo dice roll
