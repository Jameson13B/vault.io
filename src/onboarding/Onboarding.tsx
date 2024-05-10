import { useEffect, useState } from 'react'
import './onboarding.css'
import { GameState } from '../hooks/useBank'
import DeleteIcon from '../assets/delete_icon.svg'

type OnboardingHeaderProps = {
  addPlayer: (name: string) => void
  name: string
  setName: (name: string) => void
}
type OnboardingFooterProps = {
  rounds: number
  setIsOnboarding: (isOnboarding: boolean) => void
  setRounds: (rounds: number) => void
}
type OnboardingLeaderboardProps = {
  gameState: GameState
  removePlayer: (name: string) => void
}

export const OnboardingFooter = (props: OnboardingFooterProps) => {
  return (
    <div className="onboarding-footer">
      <p>Select number of turns</p>
      <div className="quarter-row">
        <button
          className={`button ${props.rounds === 10 ? 'active' : ''}`}
          onClick={() => props.setRounds(10)}
        >
          10
        </button>
        <button
          className={`button ${props.rounds === 15 ? 'active' : ''}`}
          onClick={() => props.setRounds(15)}
        >
          15
        </button>
        <button
          className={`button ${props.rounds === 20 ? 'active' : ''}`}
          onClick={() => props.setRounds(20)}
        >
          20
        </button>
      </div>
      <div className="half-row">
        <button
          className="button bgyellow"
          onClick={() => props.setIsOnboarding(false)}
        >
          Start Game
        </button>
      </div>
    </div>
  )
}

export const OnboardingHeader = (props: OnboardingHeaderProps) => {
  return (
    <div className="container">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          props.addPlayer(props.name)
          props.setName('')
        }}
        className="onboarding-header"
      >
        <h1 className="onboarding-title">Add Players</h1>
        <input
          onChange={(e) => props.setName(e.target.value)}
          placeholder="Player Name"
          value={props.name}
        />
        <button className="button" type="submit">
          Add
        </button>
      </form>
    </div>
  )
}

export const OnboardingLeaderboard = (props: OnboardingLeaderboardProps) => {
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
      className="onboarding-leaderboard"
      style={{
        maxHeight: window.innerHeight - footAndHeadHeight,
        overflow: 'auto',
      }}
    >
      {props.gameState.players.map((player) => (
        <div className="custom-row" key={player.name}>
          <p>{player.name}</p>
          <button
            className="delete-button"
            onClick={() => props.removePlayer(player.name)}
          >
            <DeleteIcon />
          </button>
        </div>
      ))}
    </div>
  )
}
