import { useState } from 'react'
import { GameState } from '../hooks/useBank'
import { OnboardingHeader } from '../onboarding/Onboarding'
import './header.css'

type HeaderProps = {
  addPlayer: (name: string) => void
  gameState: GameState
  isOnboarding: boolean
}

export const Header = (props: HeaderProps) => {
  const [name, setName] = useState('')

  return (
    <div
      className={`header ${
        props.gameState.round_over || props.gameState.game_over
          ? 'round-over'
          : ''
      }`}
    >
      {!props.isOnboarding && (
        <h1 className="title">
          {props.gameState.game_over && 'End of game'}
          {props.gameState.round_over &&
            !props.gameState.game_over &&
            'End of turn'}{' '}
          {!props.gameState.game_over && !props.gameState.round_over && (
            <FormattedNumber
              border={false}
              value={props.gameState.round_total}
              unit="Points"
            />
          )}
        </h1>
      )}
      {props.isOnboarding && (
        <OnboardingHeader
          addPlayer={props.addPlayer}
          name={name}
          setName={setName}
        />
      )}
      {!props.isOnboarding && (
        <div
          className={`subtitles ${
            props.gameState.round_over ? 'round-over' : ''
          }`}
        >
          {!props.gameState.game_over ? (
            <>
              <h2
                className={`subtitle ${
                  props.gameState.round_over ? 'round-o' : ''
                }`}
              >
                <FormattedNumber
                  border={true}
                  value={`${props.gameState.current_round}/${props.gameState.total_rounds}`}
                  unit="Turn"
                  reverse={true}
                />
              </h2>
              <h2
                className={`subtitle ${
                  props.gameState.round_over ? 'round-over' : ''
                }`}
              >
                <FormattedNumber
                  border={true}
                  value={props.gameState.roll_count}
                  unit="Roll"
                  reverse={true}
                />
              </h2>
            </>
          ) : (
            <h2
              className="subtitle"
              style={{ textAlign: 'center', width: '100%' }}
            >
              {
                props.gameState.players.sort((a, b) => b.score - a.score)[0]
                  .name
              }{' '}
              Wins
            </h2>
          )}
        </div>
      )}
    </div>
  )
}

const FormattedNumber = (props: {
  border: boolean
  value: string | number
  unit: string
  reverse?: boolean
}) => {
  return props.reverse ? (
    <>
      {props.unit}{' '}
      <span
        className={
          props.border ? 'formatted-number border' : 'formatted-number'
        }
      >
        {props.value}
      </span>
    </>
  ) : (
    <>
      <span
        className={
          props.border ? 'formatted-number border' : 'formatted-number'
        }
      >
        {props.value}
      </span>{' '}
      {props.unit}
    </>
  )
}

export default FormattedNumber
