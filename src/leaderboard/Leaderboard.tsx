import { useEffect, useState } from 'react'
import './leaderboard.css'
import { GameState } from 'usevault'
import VaultIcon from '../assets/vault_icon.svg'
import { Checkbox } from './Checkbox'

interface LeaderboardProps {
  gameState: GameState
  isVaulting: boolean
  playersToVault: number[]
  setPlayersToVault: (playersToVault: number[]) => void
}

export const Leaderboard = (props: LeaderboardProps) => {
  const [footAndHeadHeight, setFootAndHeadHeight] = useState(0)

  useEffect(() => {
    const footerElement = document.querySelector('.footer') as HTMLElement
    const headerElement = document.querySelector('.header') as HTMLElement

    setFootAndHeadHeight(
      footerElement?.offsetHeight + headerElement?.offsetHeight
    )
  }, [props.isVaulting])

  return (
    <div
      className="leaderboard"
      style={{
        maxHeight: window.innerHeight - footAndHeadHeight,
        overflow: 'auto',
      }}
    >
      {props.gameState.roll_queue
        .filter((p) => !p.is_vaulted)
        .sort((a, b) => b.score - a.score)
        .map((player) => {
          const isPlayerActive =
            props.gameState.roll_queue.findIndex(
              (q) => q.name === player.name
            ) === 0

          return (
            <div
              className={`custom-row ${
                isPlayerActive && !props.isVaulting ? 'active' : ''
              }`}
              key={player.name}
            >
              <p>
                {props.isVaulting && (
                  <span>
                    <Checkbox
                      id={player.id}
                      onSelect={(id, remove) => {
                        props.setPlayersToVault(
                          remove
                            ? props.playersToVault.filter((p) => p !== id)
                            : [...props.playersToVault, id]
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
      {props.gameState.roll_queue
        .filter((p) => p.is_vaulted)
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
