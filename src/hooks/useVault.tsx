import { useCallback, useState, useEffect } from "react"

import {
  diceToPoints,
  dangerRoll,
  processRiskIt,
  processVault,
  queueForward,
  clearVaults,
} from "./utils"

const initialGameState: GameState = {
  showRules: false,
  isOnboarding: true,
  isVaulting: false,
  isRoundOver: false,
  isGameOver: false,
  currentRound: 1,
  maxRounds: 15,
  players: [],
  rollHistory: [],
}

export const doubleRoll = "double"

export const useVault = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState)

  // Reset game state for new round after 2000ms
  useEffect(() => {
    if (gameState.isRoundOver) {
      setTimeout(() => {
        setGameState((prevState: GameState) => ({
          ...prevState,
          players: clearVaults([...gameState.players]),
          isRoundOver: false,
          currentRound: prevState.currentRound + 1,
        }))
      }, 2000)
    }
  }, [gameState.isRoundOver])

  /**
   * Adds a new player to the game.
   */
  const addPlayer = useCallback(
    (name: string) => {
      if (!name) throw new Error("Name is required")
      if (gameState.players.some((player) => player.name === name))
        throw new Error("Player already exists")

      return setGameState((prevState) => ({
        ...prevState,
        players: [
          ...prevState.players,
          {
            name,
            score: 0,
            is_vaulted: false,
            id: gameState.players.length,
          },
        ],
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
      const rollValue = diceToPoints(value, gameState)
      const isRoundOver = value === 7 && dangerRoll(gameState)
      const isGameOver =
        isRoundOver && gameState.currentRound === gameState.maxRounds

      return setGameState((prev) => ({
        ...prev,
        isRoundOver: isRoundOver,
        isGameOver: isGameOver,
        players: isGameOver
          ? processRiskIt(prev.players, gameState)
          : queueForward(prev.players),
        rollHistory: [
          {
            id: prev.rollHistory.length,
            value: rollValue,
            round: prev.currentRound,
          },
          ...prev.rollHistory,
        ],
      }))
    },
    [gameState]
  )

  /**
   * Vaults a set of players' scores for the current round.
   */
  const vault = useCallback(
    (playersToVault: number[]) => {
      if (playersToVault.length === 0) throw new Error("No players to vault")
      const players = processVault(gameState.players, playersToVault, gameState)

      return setGameState((prevState) => ({
        ...prevState,
        players,
        isRoundOver: players.every((player) => player.is_vaulted),
        isGameOver:
          players.every((player) => player.is_vaulted) &&
          prevState.currentRound === gameState.maxRounds,
        isVaulting: false,
      }))
    },
    [gameState]
  )

  /**
   * Undoes the most recent roll. Cannot undo a roll that ended the round.
   */
  // const undoRoll = useCallback(() => {
  //   const rollHistory = [...gameState.rollHistory]
  //   const lastRoll = rollHistory.shift()

  //   if (gameState.rollHistory.length > 0 && lastRoll?.value !== 0) {
  //     return setGameState((prevState) => ({
  //       ...prevState,
  //       rollHistory,
  //       players: queueBackward(prevState.players),
  //     }))
  //   }
  // }, [gameState])

  /**
   * Resets game state to the start of the game.
   */
  const replayGame = useCallback(
    () =>
      setGameState((prevState) => ({
        ...initialGameState,
        players: prevState.players
          .map((player) => ({
            ...player,
            score: 0,
            is_vaulted: false,
          }))
          .sort((a, b) => a.id - b.id),
        isRoundOver: false,
        isGameOver: false,
        currentRound: 1,
      })),
    [gameState]
  )

  /**
   * Toggles the onboarding state.
   */
  const toggleOnboarding = useCallback(
    () =>
      setGameState((prevState) => ({
        ...prevState,
        isOnboarding: !prevState.isOnboarding,
      })),
    [gameState]
  )

  /**
   * Toggles the vaulting state.
   */
  const toggleVaulting = useCallback(
    () =>
      setGameState((prevState) => ({
        ...prevState,
        isVaulting: !prevState.isVaulting,
      })),
    [gameState]
  )

  /**
   * Sets the total number of rounds.
   */
  const setRounds = useCallback(
    (rounds: number) =>
      setGameState((prevState) => ({
        ...prevState,
        maxRounds: rounds,
      })),
    [gameState]
  )

  /**
   * Toggles the rules state.
   */
  const toggleRules = useCallback(
    () =>
      setGameState((prevState) => ({
        ...prevState,
        showRules: !prevState.showRules,
      })),
    [gameState]
  )

  return {
    gameState,
    handle: {
      addPlayer,
      removePlayer,
      rollDice,
      setRounds,
      toggleOnboarding,
      toggleRules,
      toggleVaulting,
      // undoRoll,
      vault,
      replayGame,
    },
  }
}
