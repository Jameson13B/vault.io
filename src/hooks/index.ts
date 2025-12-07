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
interface GameState {
  roundOver: boolean
  gameOver: boolean
  currentRound: number
  maxRounds: number
  players: Player[]
  rollHistory: Roll[]
}

export { useVault } from "./useVault.tsx"

export type { useVaultRequestProps, useVaultReturnProps, Player, GameState }
