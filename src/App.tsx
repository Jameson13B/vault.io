import { useState } from 'react'

import { Footer } from './footer/Footer'
import { Header } from './header/Header'
// import { useBank } from './hooks/useBank'
import { useBank } from './hooks/useBankNew'
import { Leaderboard } from './leaderboard/Leaderboard'
import { OnboardingLeaderboard } from './onboarding/Onboarding'

function App() {
  const [isOnboarding, setIsOnboarding] = useState(true)
  const [isVaulting, setIsVaulting] = useState(false)
  const [rounds, setRounds] = useState(10)
  const [playersToVault, setPlayersToVault] = useState<number[]>([])
  const {
    gameState,
    addPlayer,
    removePlayer,
    rollDice,
    undoRoll,
    vault,
    replay,
  } = useBank({
    rounds: 10,
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
          isVaulting={isVaulting}
          playersToVault={playersToVault}
          setPlayersToVault={setPlayersToVault}
        />
      )}
      <Footer
        gameState={gameState}
        isVaulting={isVaulting}
        isOnboarding={isOnboarding}
        playersToVault={playersToVault}
        rollDice={rollDice}
        rounds={rounds}
        setIsVaulting={setIsVaulting}
        setIsOnboarding={setIsOnboarding}
        setPlayersToVault={setPlayersToVault}
        setRounds={setRounds}
        vault={vault}
        replay={replay}
        undoRoll={undoRoll}
      />
    </>
  )
}

export default App

// TODO:
// - Add rules
