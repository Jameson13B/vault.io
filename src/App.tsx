import { useRef, useState } from "react"
import { useVault } from "./hooks/useVault"

import { Onboarding } from "./onboarding/Onboarding"
import { Game } from "./game/Game"
import { Rules } from "./rules/Rules"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { RoundOver } from "./transitions/RoundOver"
import { GameOver } from "./transitions/GameOver"

function App() {
  const container = useRef(null)
  const [isOnboarding, setIsOnboarding] = useState(true)
  const [isVaulting, setIsVaulting] = useState(false)
  const [showRules, setShowRules] = useState(false)
  const [rounds, setRounds] = useState(15)
  const { gameState, handle } = useVault({ rounds })

  useGSAP(
    // Animate Step Header and Content in
    () => {
      gsap.fromTo(
        "#step-header",
        { autoAlpha: 0, transform: "translateY(-100%)" },
        {
          autoAlpha: 1,
          transform: "translateY(0)",
          duration: 0.5,
          ease: "power2.out",
        }
      )
      gsap.fromTo(
        "#step-content",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.5, ease: "power2.out" }
      )
    },
    {
      dependencies: [gameState.round_over, gameState.game_over, isOnboarding],
      scope: container,
    }
  )
  useGSAP(
    // Animate Step Footer in
    () => {
      gsap.fromTo(
        "#step-footer",
        { autoAlpha: 0, transform: "translateY(100%)" },
        {
          autoAlpha: 1,
          transform: "translateY(0)",
          duration: 0.5,
          ease: "power2.out",
        }
      )
    },
    {
      dependencies: [
        gameState.round_over,
        gameState.game_over,
        isOnboarding,
        isVaulting,
      ],
      scope: container,
    }
  )

  const changeStep = (
    onComplete: () => void,
    dependencies = ["H", "C", "F"]
  ) => {
    // Animate current step sections out
    if (dependencies.includes("H"))
      gsap.to("#step-header", {
        autoAlpha: 0,
        transform: "translateY(-100%)",
        duration: 0.4,
        ease: "power2.in",
        onComplete: onComplete,
      })
    if (dependencies.includes("C"))
      gsap.to("#step-content", {
        autoAlpha: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: onComplete,
      })
    if (dependencies.includes("F"))
      gsap.to("#step-footer", {
        autoAlpha: 0,
        transform: "translateY(100%)",
        duration: 0.4,
        ease: "power2.in",
        onComplete: onComplete,
      })
  }

  if (showRules) return <Rules setShowRules={setShowRules} />

  return (
    <div ref={container} style={{ height: "100%" }}>
      {gameState.game_over && <GameOver gameState={gameState} />}
      {gameState.round_over && (
        <RoundOver gameState={gameState} rounds={rounds} />
      )}
      {isOnboarding && (
        <Onboarding
          players={gameState.players}
          addPlayer={handle.addPlayer}
          removePlayer={handle.removePlayer}
          rounds={rounds}
          setRounds={setRounds}
          startGame={() => changeStep(() => setIsOnboarding(false))}
        />
      )}
      {!isOnboarding && (
        <Game
          currentRolls={gameState.roll_history.filter(
            (roll) => roll.round === gameState.current_round
          )}
          gameState={gameState}
          handle={handle}
          isVaulting={isVaulting}
          rounds={rounds}
          setIsVaulting={() =>
            changeStep(() => setIsVaulting(!isVaulting), ["F"])
          }
          setShowRules={setShowRules}
        />
      )}
    </div>
  )
}

export default App

// TODO:
// Add rules
