import { useCallback, useState, useEffect } from "react"

export const useVault = (props: useVaultRequestProps): useVaultReturnProps => {
  const [gameState, setGameState] = useState<GameState>({
    round_over: false, // Used to indicate the current round is over. Resets after 2000ms
    game_over: false, // Used to indicate the game is over.
    current_round: 1, // Used to keep track of the current round.
    total_rounds: 10, // Used to keep track of the total number of rounds. Defaults to 10
    players: [], // Used to keep track of the players in the game.
    roll_queue: [], // Used to keep track of the players who are in the roll queue.
    roll_history: [], // Used to keep track of the roll history.
  })

  // Sets the total number of rounds. Defaults to 10, is set by hook props.rounds.
  useEffect(() => {
    setGameState((prevState) => ({ ...prevState, total_rounds: props.rounds }))
  }, [props.rounds])

  // Reset game state for new round after props.roundTransitionDelay or 2000ms
  useEffect(() => {
    if (gameState.round_over) {
      const timer = setTimeout(() => {
        setGameState((prevState) => ({
          ...prevState,
          round_over: false,
          current_round: prevState.current_round + 1,
          roll_queue: prevState.roll_queue.map((player) => ({
            ...player,
            is_vaulted: false,
          })),
        }))
      }, props.roundTransitionDelay || 2000)

      return () => clearTimeout(timer)
    }
  }, [gameState.round_over, props.roundTransitionDelay])

  /**
   * Adds a new player to the game state.
   */
  const addPlayer = useCallback(
    (name: string) => {
      if (!name) throw new Error("Name is required")
      if (gameState.players.filter((player) => player.name === name).length)
        throw new Error("Name exists")

      const newPlayer: Player = {
        name,
        score: 0,
        is_vaulted: false,
        id: gameState.players.length,
      }

      return setGameState({
        ...gameState,
        players: [...gameState.players, newPlayer],
        roll_queue: [...gameState.roll_queue, newPlayer],
      })
    },
    [gameState]
  )
  /**
   * Removes a player from the game state.
   */
  const removePlayer = useCallback(
    (name: string) => {
      if (!name) throw new Error("Name is required")
      if (!gameState.players.filter((player) => player.name === name).length)
        throw new Error("Name does not exist")

      return setGameState({
        ...gameState,
        players: gameState.players.filter((player) => player.name !== name),
        roll_queue: gameState.roll_queue.filter(
          (player) => player.name !== name
        ),
      })
    },
    [gameState]
  )
  /**
   * Records a dice roll in the game state.
   */
  const rollDice = useCallback(
    (value: number | "double") => {
      if (!value) throw new Error("Roll is required")

      const rollValue = (roll: number | "double") => {
        if (roll === 7) {
          return gameState.roll_history.filter(
            (roll) => roll.round === gameState.current_round
          ).length >= 3
            ? 0
            : 70
        } else if (roll === "double") {
          return getCurrentRoundTotal(gameState)
        } else {
          return roll
        }
      }
      const isRoundOver = () =>
        value === 7 &&
        gameState.roll_history.filter(
          (roll) => roll.round === gameState.current_round
        ).length >= 3
          ? true
          : gameState.round_over

      return setGameState((prevState) => ({
        ...prevState,
        round_over: isRoundOver(),
        game_over:
          isRoundOver() && prevState.current_round === prevState.total_rounds,
        roll_queue: queueForward(prevState.roll_queue, true),
        roll_history: [
          {
            id: gameState.roll_history.length,
            value: rollValue(value),
            round: gameState.current_round,
          },
          ...prevState.roll_history,
        ],
      }))
    },
    [gameState]
  )
  /**
   * Undoes the most recent roll.
   */
  const undoRoll = useCallback(() => {
    if (gameState.roll_history.length > 0) {
      const roll_history = [...gameState.roll_history]

      const lastRoll = roll_history.shift()

      return setGameState((prevState) => ({
        ...prevState,
        current_round:
          lastRoll?.value === 0
            ? prevState.current_round - 1
            : prevState.current_round,
        roll_queue: queueBackward(prevState.roll_queue),
        roll_history,
      }))
    }
  }, [gameState])
  /**
   * Vaults a set of players' scores for the current round.
   */
  const vault = useCallback(
    (playersToVault: number[]) => {
      if (playersToVault.length === 0) throw new Error("No players to vault")

      const roll_queue = [...gameState.roll_queue]

      roll_queue.forEach((player) => {
        if (playersToVault.includes(player.id)) {
          player.is_vaulted = true
          player.score += getCurrentRoundTotal(gameState)
        }
      })

      const allPlayersVaulted = roll_queue.every((player) => player.is_vaulted)

      return setGameState((prevState) => ({
        ...prevState,
        round_over: allPlayersVaulted,
        game_over:
          allPlayersVaulted &&
          prevState.current_round === prevState.total_rounds,
        roll_queue:
          allPlayersVaulted || roll_queue[0]?.is_vaulted
            ? queueForward(roll_queue)
            : roll_queue,
      }))
    },
    [gameState]
  )
  /**
   * Resets game state to the start of the game.
   */
  const replay = useCallback(() => {
    return setGameState((prevState) => ({
      ...prevState,
      round_over: false,
      game_over: false,
      current_round: 1,
      total_rounds: props.rounds,
      roll_queue: [...prevState.players],
      roll_history: [],
    }))
  }, [props.rounds])

  return {
    gameState,
    addPlayer,
    removePlayer,
    rollDice,
    vault,
    undoRoll,
    replay,
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
/**
 * Moves the current item in the roll queue to the end recursively if not vaulted.
 */
const queueForward = (
  roll_queue: Player[],
  rolling: boolean = false
): Player[] => {
  const rollQueueCopy = [...roll_queue]
  const allPlayersVaulted = roll_queue.every((player) => player.is_vaulted)

  if (rolling && !rollQueueCopy[0]?.is_vaulted) {
    const currentRoller = rollQueueCopy.shift()

    if (currentRoller) rollQueueCopy.push(currentRoller)

    return rollQueueCopy
  } else if (allPlayersVaulted || !roll_queue[0]?.is_vaulted) {
    return rollQueueCopy
  } else {
    const currentRoller = rollQueueCopy.shift()

    if (currentRoller) rollQueueCopy.push(currentRoller)

    return queueForward(rollQueueCopy)
  }
}
/**
 * Moves the last item in the roll queue to the front recursively if not vaulted.
 */
const queueBackward = (roll_queue: Player[]): Player[] => {
  const rollQueueCopy = [...roll_queue]
  const lastRoll = rollQueueCopy.pop()
  const allPlayersVaulted = roll_queue.every((player) => player.is_vaulted)

  if (lastRoll) rollQueueCopy.unshift(lastRoll)

  return allPlayersVaulted || !lastRoll?.is_vaulted
    ? rollQueueCopy
    : queueBackward(rollQueueCopy)
}
