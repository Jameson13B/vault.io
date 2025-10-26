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
    undoRoll: () => void
    vault: (playersToVault: number[]) => void
    replayGame: () => void
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
  round_over: boolean
  game_over: boolean
  current_round: number
  players: Player[]
  roll_history: Roll[]
}

interface GameProps {
  currentRolls: Roll[]
  gameState: GameState
  handle: {
    addPlayer: (name: string) => void
    removePlayer: (name: string) => void
    rollDice: (roll: number | "DOUBLE") => void
    undoRoll: () => void
    vault: (playersToVault: number[]) => void
    replayGame: () => void
  }
  isVaulting: boolean
  rounds: number
  setIsVaulting: (isVaulting: boolean) => void
  setShowRules: (show: boolean) => void
}
