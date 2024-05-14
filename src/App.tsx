import { useState } from 'react'

import { Footer } from './footer/Footer'
import { Header } from './header/Header'
import { useVault } from 'usevault'
import { Leaderboard } from './leaderboard/Leaderboard'
import {
  OnboardingLeaderboard,
  OnboardingFooter,
} from './onboarding/Onboarding'

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
  } = useVault({
    rounds: rounds,
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
      {isOnboarding ? (
        <OnboardingFooter
          rounds={rounds}
          setIsOnboarding={setIsOnboarding}
          setRounds={(rounds) => setRounds(rounds)}
        />
      ) : (
        <Footer
          gameState={gameState}
          isVaulting={isVaulting}
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
      )}
    </>
  )
}

export default App

// TODO:
// - Add rules
