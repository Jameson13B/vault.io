# useVault Hook

[![npm version](https://badge.fury.io/js/usevault.svg)](https://badge.fury.io/js/usevault)

A React hook for creating a Vault score tracker. Written in Typescript.

Created by [Jameson](https://jamesonb.com) at [Atomic10 Studio](https://atomic10.studio)

## Installation

### NPM

```
npm i usevault
```

## Usage

```
const { gameState, addPlayer, ... } = useVault({ rounds: rounds })
```

### Properties

| Prop                   | Type   | Description                                         | Default |
| ---------------------- | ------ | --------------------------------------------------- | ------- |
| `rounds`               | number | The number of rounds per game.                      | 10      |
| `roundTransitionDelay` | number | The number of ms for the transition between rounds. | 2000    |

### Return Values

| Value                     | Type        | Description                                                                                                                  |
| ------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `gameState`               | `GameState` | The state of the game to provide key details.                                                                                |
| `gameState.round_over`    | `boolean`   | If the current round has ended(7 out or all vaulted). `roundTransitionDelay` is the delay till this value auto resets.       |
| `gameState.game_over`     | `boolean`   | If the game has ended(all `rounds` completed).                                                                               |
| `gameState.current_round` | `number`    | The number of the current round.                                                                                             |
| `gameState.total_rounds`  | `number`    | The total number of rounds for the game. Set with `props.rounds` defaulting to 10.                                           |
| `gameState.players`       | `Players[]` | List of players that doesn't change.                                                                                         |
| `gameState.roll_queue`    | `Players[]` | List of players that reflects updates to turns, score, if vaulted, etc.                                                      |
| `gameState.roll_history`  | `Roll[]`    | List of roll history. Length can be used for roll count, sum of `roll.value` can be used for round total.                    |
| `addPlayer`               | `function`  | Function to add new player to `gameState.players` and `gameState.roll_queue`.                                                |
| `removePlayer`            | `function`  | Function to remove player from `gameState.players` and `gameState.roll_queue`.                                               |
| `rollDice`                | `function`  | Function to record a new dice roll.                                                                                          |
| `undoRoll`                | `function`  | Function to undo last dice roll. Can only undo dice roll from current round.                                                 |
| `vault`                   | `function`  | Function to vault a player with the current round score.                                                                     |
| `replay`                  | `function`  | Function to replay/restart a new round. Can update players and round count after calling this function but before `rollDice` |
