import { doubleRoll } from "./useVault"

export const dangerRoll = (gameState: GameState) =>
  gameState.rollHistory.filter((roll) => roll.round === gameState.currentRound)
    .length >= 3

export const roundTotal = (gameState: GameState) =>
  gameState.rollHistory
    .filter((roll) => roll.round === gameState.currentRound)
    .reduce((acc, cur) => (cur.value === doubleRoll ? acc : acc + cur.value), 0)

export const diceToPoints = (
  dice: number | typeof doubleRoll,
  gameState: GameState
) => {
  if (dice === 7 && dangerRoll(gameState)) return 0
  if (dice === 7) return 70
  if (dice === doubleRoll) return roundTotal(gameState)
  return dice
}

export const processRiskIt = (players: Player[], gameState: GameState) =>
  players.map((player) => ({
    ...player,
    score: player.is_vaulted
      ? player.score
      : player.score - roundTotal(gameState),
  }))

export const processVault = (
  players: Player[],
  playersToVault: number[],
  gameState: GameState
) =>
  players.map((player) =>
    playersToVault.includes(player.id)
      ? {
          ...player,
          is_vaulted: true,
          score: player.score + roundTotal(gameState),
        }
      : player
  )

export const queueForward = (players: Player[]): Player[] => {
  const [firstPlayer, ...restPlayers] = [...players]

  return firstPlayer?.is_vaulted
    ? queueForward([...restPlayers, firstPlayer])
    : [...restPlayers, firstPlayer]
}
export const clearVaults = (players: Player[]) =>
  players.map((player) => ({
    ...player,
    is_vaulted: false,
  }))

// const queueBackward = (players: Player[]): Player[] => {
//   const playersCopy = [...players]
//   const lastPlayer = playersCopy.pop()

//   if (lastPlayer) playersCopy.unshift(lastPlayer)

//   return playersCopy[0]?.is_vaulted ? queueBackward(playersCopy) : playersCopy
// }
