import { useEffect, useState } from 'react'
import './leaderboard.css'
import { GameState } from '../hooks/useBank'
import VaultIcon from '../assets/vault_icon.svg'
import { Checkbox } from './Checkbox'

interface LeaderboardProps {
  gameState: GameState
  isBanking: boolean
  playersToBank: string[]
  setPlayersToBank: (playersToBank: string[]) => void
}

export const Leaderboard = (props: LeaderboardProps) => {
  const [footAndHeadHeight, setFootAndHeadHeight] = useState(0)

  useEffect(() => {
    const footerElement = document.querySelector('.footer') as HTMLElement
    const headerElement = document.querySelector('.header') as HTMLElement

    setFootAndHeadHeight(
      footerElement?.offsetHeight + headerElement?.offsetHeight
    )
  }, [])

  return (
    <div
      className="leaderboard"
      style={{
        maxHeight: window.innerHeight - footAndHeadHeight,
        overflow: 'auto',
      }}
    >
      {props.gameState.players
        .filter((p) => !p.is_banked)
        .sort((a, b) => b.score - a.score)
        .map((player) => {
          const isPlayerActive =
            props.gameState.roll_queue.findIndex(
              (q) => q.name === player.name
            ) === 0

          return (
            <div
              className={`custom-row ${
                isPlayerActive && !props.isBanking ? 'active' : ''
              }`}
              key={player.name}
            >
              <p>
                {props.isBanking && (
                  <span>
                    <Checkbox
                      name={player.name}
                      onSelect={(name, remove) => {
                        props.setPlayersToBank(
                          remove
                            ? props.playersToBank.filter((p) => p !== name)
                            : [...props.playersToBank, name]
                        )
                      }}
                    />
                  </span>
                )}
                {player.name}
              </p>
              <p>{player.score} points</p>
            </div>
          )
        })}
      {props.gameState.players
        .filter((p) => p.is_banked)
        .sort((a, b) => b.score - a.score)
        .map((player) => {
          return (
            <div className="custom-row banked" key={player.name}>
              <p>
                <span
                  style={{
                    height: '30px',
                    width: '30px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <VaultIcon />
                </span>
                {player.name}
              </p>
              <p>{player.score} points</p>
            </div>
          )
        })}
    </div>
  )
}
