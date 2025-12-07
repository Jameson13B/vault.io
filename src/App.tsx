import { useRef } from "react"

import { Onboarding } from "./onboarding/Onboarding"
import { Game } from "./game/Game"
import { Rules } from "./rules/Rules"
import { RoundOver } from "./transitions/RoundOver"
import { GameOver } from "./transitions/GameOver"
import { useVault } from "./hooks"

function App() {
  const container = useRef(null)
  const { gameState, handle } = useVault()

  if (gameState.showRules) return <Rules handle={handle} />

  return (
    <div ref={container} style={{ height: "100%" }}>
      {gameState.isGameOver && <GameOver gameState={gameState} />}
      {gameState.isRoundOver && <RoundOver gameState={gameState} />}
      {gameState.isOnboarding && (
        <Onboarding handle={handle} gameState={gameState} />
      )}
      {!gameState.isOnboarding && (
        <Game handle={handle} gameState={gameState} />
      )}
    </div>
  )
}

export default App
