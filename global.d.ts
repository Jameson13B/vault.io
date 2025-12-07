interface useVaultRequestProps {
  rounds: number
  roundTransitionDelay?: number
}
interface useVaultReturnProps {
  gameState: GameState
  handle: {
    addPlayer: (name: string) => void
    removePlayer: (name: string) => void
    rollDice: (roll: number | "double") => void
    // undoRoll: () => void
    vault: (playersToVault: number[]) => void
    replayGame: () => void
    toggleOnboarding: () => void
    toggleRules: () => void
    toggleVaulting: () => void
    setRounds: (rounds: number) => void
  }
}
interface Player {
  name: string
  score: number
  is_vaulted: boolean
  id: number
}
interface Roll {
  id: number
  value: number | "double"
  round: number
}
interface GameState {
  showRules: boolean
  isOnboarding: boolean
  isVaulting: boolean
  isRoundOver: boolean
  isGameOver: boolean
  currentRound: number
  maxRounds: number
  players: Player[]
  rollHistory: Roll[]
}
