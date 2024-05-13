import { useCallback, useEffect, useState } from 'react'

interface useBankRequestProps {
  rounds: number
}
type useBankReturnProps = {
  gameState: GameState
  addPlayer: (name: string) => void
  bank: (playersToVault: string[]) => void
  removePlayer: (name: string) => void
  replay: () => void
  rollDice: (roll: number, double?: boolean) => void
}
type Player = {
  name: string
  score: number
  is_vaulted: boolean
  id: number
}
export type GameState = {
  current_round: number
  game_over: boolean
  players: Player[]
  roll_count: number // Replace with roll_history.length
  roll_queue: Player[]
  round_over: boolean
  round_total: number // Replace with sum of roll_history.value
  total_rounds: number
  next_to_roll: number
}

export const useBank = (props: useBankRequestProps): useBankReturnProps => {
  const [gameState, setGameState] = useState<GameState>({
    current_round: 1,
    game_over: false,
    players: [],
    roll_count: 0,
    roll_queue: [],
    round_over: false,
    round_total: 0,
    total_rounds: 10,
    next_to_roll: 0,
  })

  useEffect(() => {
    setGameState((gameState) => ({ ...gameState, total_rounds: 3 }))
  }, [props.rounds])

  useEffect(() => {
    if (gameState.round_over) {
      // Reset game state for new round after 3000ms
      setTimeout(() => {
        const newQueue: Player[] = []

        for (let i = gameState.next_to_roll; i < gameState.players.length; i++)
          newQueue.push(gameState.players[i])

        for (let i = 0; i < gameState.next_to_roll; i++)
          newQueue.push(gameState.players[i])

        setGameState((gameState) => ({
          ...gameState,
          // current_round: gameState.current_round + 1,
          // players: gameState.players.map((player) => ({
          //   ...player,
          //   is_vaulted: false,
          // })),
          // roll_count: 0,
          roll_queue: newQueue,
          // round_over: false,
          round_total: 0,
          next_to_roll: 0,
        }))
      }, 2000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.round_over])

  const addPlayer = useCallback(
    (name: string) => {
      if (!name) throw new Error('Name is required')
      if (gameState.players.filter((player) => player.name === name).length)
        throw new Error('Name exists')

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

  const removePlayer = useCallback(
    (name: string) => {
      if (!name) throw new Error('Name is required')
      if (!gameState.players.filter((player) => player.name === name).length)
        throw new Error('Name does not exist')

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

  const rollDice = useCallback(
    (roll: number, double = false) => {
      if (!roll) throw new Error('Roll is required')
      if (gameState.current_round > gameState.total_rounds)
        throw new Error('Round over')

      const updateQueue = () => {
        const rollQueueCopy = [...gameState.roll_queue]
        const current = rollQueueCopy.shift()

        if (current) rollQueueCopy.push(current)

        return rollQueueCopy
      }
      const rollValue = (roll: number, double: boolean) => {
        if (roll === 7) {
          if (gameState.roll_count <= 3) {
            // Safe seven roll
            return 70
          } else {
            return 0
          }
        } else if (double && gameState.roll_count > 2) {
          // Double roll(double value)
          return gameState.round_total
        } else {
          // Normal roll
          return roll
        }
      }
      const roundOver = () =>
        roll === 7 && gameState.roll_count >= 3 ? true : gameState.round_over

      setGameState({
        ...gameState,
        game_over:
          roundOver() && gameState.current_round === gameState.total_rounds
            ? true
            : false,
        roll_count: gameState.roll_count + 1,
        roll_queue: updateQueue(),
        round_over: roundOver(),
        round_total: gameState.round_total + rollValue(roll, double),
        next_to_roll:
          roll === 7 && gameState.roll_count >= 3
            ? gameState.players.length - 1 === gameState.next_to_roll
              ? 0
              : gameState.roll_queue[0].id + 1
            : gameState.next_to_roll,
      })
    },
    [gameState]
  )

  const bank = useCallback(
    (playersToVault: string[]) => {
      if (!playersToVault || playersToVault.length === 0)
        throw new Error('playersToVault is required')
      const bankedPlayers = []

      const updatedPlayers = gameState.players.map((player) => {
        if (player.is_vaulted || playersToVault.includes(player.name))
          bankedPlayers.push(player)

        return playersToVault.includes(player.name)
          ? {
              ...player,
              score: player.score + gameState.round_total,
              is_vaulted: true,
            }
          : player
      })

      return setGameState({
        ...gameState,
        game_over:
          bankedPlayers.length === gameState.players.length &&
          gameState.current_round + 1 === gameState.total_rounds
            ? true
            : false,
        players: updatedPlayers,
        roll_queue: gameState.roll_queue.filter(
          (player) => !playersToVault.includes(player.name)
        ),
        round_over: bankedPlayers.length === gameState.players.length,
        next_to_roll:
          gameState.players.length - 1 === gameState.next_to_roll
            ? 0
            : updatedPlayers[0].id,
      })
    },
    [gameState]
  )

  const replay = useCallback(() => {
    const updatedPlayers = gameState.players.map((player) => {
      return {
        ...player,
        score: 0,
        is_vaulted: false,
      }
    })

    console.log('gameState.roll_queue', gameState.roll_queue)
    setGameState({
      current_round: 1,
      game_over: false,
      players: updatedPlayers,
      roll_count: 0,
      roll_queue: updatedPlayers,
      round_over: false,
      round_total: 0,
      total_rounds: props.rounds,
      next_to_roll: 0,
    })
  }, [gameState, props.rounds])

  return {
    gameState,
    addPlayer,
    bank,
    removePlayer,
    replay,
    rollDice,
  }
}
