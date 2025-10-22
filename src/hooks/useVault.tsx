import { useCallback, useState, useEffect } from "react"

const initialGameState: GameState = {
  round_over: false,
  game_over: false,
  current_round: 1,
  players: [
    {
      name: "Jameson",
      score: 0,
      is_vaulted: false,
      id: 0,
    },
    {
      name: "Chris",
      score: 0,
      is_vaulted: false,
      id: 1,
    },
    {
      name: "Nate",
      score: 0,
      is_vaulted: false,
      id: 2,
    },
    {
      name: "Nisha",
      score: 0,
      is_vaulted: true,
      id: 3,
    },
  ],
  roll_history: [],
}
const doubleRoll = "DOUBLE"

export const useVault = (props: useVaultRequestProps) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState)

  // Reset game state for new round after 2000ms
  useEffect(() => {
    if (gameState.round_over) {
      let players = [...gameState.players]
      const firstPlayer = players.shift()

      if (firstPlayer) players.push(firstPlayer)

      players = clearAllVaults(players)

      setTimeout(() => {
        setGameState((prevState) => ({
          ...prevState,
          round_over: false,
          current_round: prevState.current_round + 1,
        }))
      }, 2000)
    }
  }, [gameState.round_over])

  /**
   * Adds a new player to the game.
   */
  const addPlayer = useCallback(
    (name: string) => {
      if (!name) throw new Error("Name is required")
      if (gameState.players.filter((player) => player.name === name).length)
        throw new Error("Player already exists")

      const newPlayer: Player = {
        name,
        score: 0,
        is_vaulted: false,
        id: gameState.players.length,
      }

      return setGameState((prevState) => ({
        ...prevState,
        players: [...prevState.players, newPlayer],
      }))
    },
    [gameState]
  )

  /**
   * Removes a player from the game.
   */
  const removePlayer = useCallback(
    (name: string) => {
      if (!name) throw new Error("Name is required")
      if (!gameState.players.filter((player) => player.name === name).length)
        throw new Error("Player does not exist")

      return setGameState((prevState) => ({
        ...prevState,
        players: prevState.players.filter((player) => player.name !== name),
      }))
    },
    [gameState]
  )

  /**
   * Rolls the dice.
   */
  const rollDice = useCallback(
    (value: number | typeof doubleRoll) => {
      if (!value) throw new Error("Value is required")
      let rollValue
      let isRoundOver = false
      let isGameOver = false

      if (value === 7) {
        if (isDangerRoll(gameState)) {
          isGameOver = gameState.current_round === props.rounds
          isRoundOver = true
          rollValue = 0
        } else {
          rollValue = 70
        }
      } else if (value === doubleRoll) {
        rollValue = getCurrentRoundTotal(gameState)
      } else {
        rollValue = value
      }

      return setGameState((prevState) => ({
        ...prevState,
        round_over: isRoundOver,
        game_over: isGameOver,
        players: queueForward(
          isRoundOver
            ? prevState.players.map((player) => ({
                ...player,
                score:
                  isGameOver && !player.is_vaulted
                    ? getRiskItScore(player)
                    : player.score,
                is_vaulted: false,
              }))
            : gameState.players
        ),
        roll_history: [
          {
            id: prevState.roll_history.length,
            value: rollValue,
            round: prevState.current_round,
          },
          ...prevState.roll_history,
        ],
      }))
    },
    [gameState]
  )
  const getRiskItScore = (player: Player) => {
    return (
      gameState.roll_history
        .filter((roll) => roll.round === gameState.current_round)
        .reduce((acc, cur) => acc + Number(cur.value), 0) - player.score
    )
  }

  /**
   * Undoes the most recent roll. Cannot undo a roll that ended the round.
   */
  const undoRoll = useCallback(() => {
    const roll_history = [...gameState.roll_history]
    const lastRoll = roll_history.shift()

    if (gameState.roll_history.length > 0 && lastRoll?.value !== 0) {
      return setGameState((prevState) => ({
        ...prevState,
        roll_history,
        players: queueBackward(prevState.players),
      }))
    }
  }, [gameState])

  /**
   * Vaults a set of players' scores for the current round.
   */
  const vault = useCallback(
    (playersToVault: number[]) => {
      if (playersToVault.length === 0) throw new Error("No players to vault")

      let players = [...gameState.players]

      players.forEach((player) => {
        if (playersToVault.includes(player.id)) {
          player.is_vaulted = true
          player.score = player.score + getCurrentRoundTotal(gameState)
        }
      })

      const allPlayersVaulted = players.every((player) => player.is_vaulted)

      return setGameState((prevState) => ({
        ...prevState,
        players:
          allPlayersVaulted || players[0]?.is_vaulted
            ? queueForward(
                allPlayersVaulted
                  ? players.map((player) => ({
                      ...player,
                      is_vaulted: false,
                    }))
                  : players
              )
            : players,
        round_over: allPlayersVaulted,
        game_over:
          allPlayersVaulted && prevState.current_round === props.rounds,
      }))
    },
    [gameState]
  )

  /**
   * Resets game state to the start of the game.
   */
  const replayGame = useCallback(() => {
    return setGameState((prevState) => ({
      ...initialGameState,
      players: prevState.players
        .map((player) => ({
          ...player,
          score: 0,
          is_vaulted: false,
        }))
        .sort((a, b) => a.id - b.id),
    }))
  }, [gameState])

  return {
    gameState,
    handle: {
      addPlayer,
      removePlayer,
      rollDice,
      undoRoll,
      vault,
      replayGame,
    },
  }
}

/**
 * Calculates the total value of the current round in the game state.
 */
export const getCurrentRoundTotal = (gameState: GameState) => {
  return gameState.roll_history
    .filter((roll) => roll.round === gameState.current_round)
    .reduce((acc, cur) => (cur.value === "double" ? acc : acc + cur.value), 0)
}
const isDangerRoll = (gameState: GameState) => {
  return (
    gameState.roll_history.filter(
      (roll) => roll.round === gameState.current_round
    ).length >= 3
  )
}
const queueForward = (players: Player[]): Player[] => {
  const playersCopy = [...players]
  const firstPlayer = playersCopy.shift()

  if (firstPlayer) playersCopy.push(firstPlayer)

  return playersCopy[0]?.is_vaulted ? queueForward(playersCopy) : playersCopy
}
const queueBackward = (players: Player[]): Player[] => {
  const playersCopy = [...players]
  const lastPlayer = playersCopy.pop()

  if (lastPlayer) playersCopy.unshift(lastPlayer)

  return playersCopy[0]?.is_vaulted ? queueBackward(playersCopy) : playersCopy
}
const clearAllVaults = (players: Player[]) =>
  players.map((player) => ({ ...player, is_vaulted: false }))
