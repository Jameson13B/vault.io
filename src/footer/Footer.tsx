import './footer.css'
import { GameState } from '../hooks/useBank'
import { OnboardingFooter } from '../onboarding/Onboarding'
import UndoIcon from '../assets/undo_icon.svg'

type FooterProps = {
  gameState: GameState
  isBanking: boolean
  isOnboarding: boolean
  playersToBank: string[]
  rollDice: (num: number, double?: boolean) => void
  rounds: number
  setIsBanking: (isBanking: boolean) => void
  setIsOnboarding: (isOnboarding: boolean) => void
  setPlayersToBank: (playersToBank: string[]) => void
  setRounds: (rounds: number) => void
  bank: (playersToBank: string[]) => void
  replay: () => void
}

export const Footer = (props: FooterProps) => {
  const dangerRoll = props.gameState.roll_count >= 3
  const globalBankingDisable =
    props.isBanking || props.gameState.round_over ? 'disabled' : ''
  const globalRoundOverDisable = props.gameState.round_over ? 'disabled' : ''

  return (
    <div className="footer">
      <div className="buttons">
        {props.gameState.game_over && (
          <div className="half-row">
            <button
              className={`button yellow`}
              onClick={() => props.replay()}
              style={{ width: '50%' }}
            >
              Replay
            </button>
            <button
              className={`button`}
              style={{ width: '50%' }}
              // onClick={() => console.log('HIIIII')}
              onClick={() => {
                console.log('here')

                props.setIsOnboarding(true)
                return props.replay()
              }}
            >
              Change Players
            </button>
          </div>
        )}
        {props.isOnboarding && (
          <OnboardingFooter
            rounds={props.rounds}
            setIsOnboarding={props.setIsOnboarding}
            setRounds={props.setRounds}
          />
        )}
        {!props.isOnboarding && !props.gameState.game_over && (
          <>
            {props.gameState.roll_queue[0] &&
              (props.isBanking ? (
                <p>Select which players to bank</p>
              ) : (
                <p>{props.gameState.roll_queue[0].name} Roll</p>
              ))}
            <div className="quarter-row">
              <button
                disabled={props.isBanking}
                className={`button ${globalBankingDisable} ${
                  dangerRoll ? 'disabled' : ''
                }`}
                onClick={() => props.rollDice(2)}
              >
                2
              </button>
              <button
                disabled={props.isBanking}
                className={`button ${globalBankingDisable}`}
                onClick={() => props.rollDice(3)}
              >
                3
              </button>
              <button
                disabled={props.isBanking}
                className={`button ${globalBankingDisable}`}
                onClick={() => props.rollDice(4)}
              >
                4
              </button>
              <button
                disabled={props.isBanking}
                className={`button ${globalBankingDisable}`}
                onClick={() => props.rollDice(5)}
              >
                5
              </button>
            </div>
            <div className="quarter-row">
              <button
                disabled={props.isBanking}
                className={`button ${globalBankingDisable}`}
                onClick={() => props.rollDice(6)}
              >
                6
              </button>
              <button
                disabled={props.isBanking}
                className={`button ${
                  props.isBanking || props.gameState.round_over
                    ? 'disabled'
                    : ''
                } ${
                  dangerRoll && !props.isBanking && !props.gameState.round_over
                    ? 'red'
                    : ''
                }`}
                onClick={() => props.rollDice(7)}
              >
                7
              </button>
              <button
                disabled={props.isBanking}
                className={`button ${globalBankingDisable}`}
                onClick={() => props.rollDice(8)}
              >
                8
              </button>
              <button
                disabled={props.isBanking}
                className={`button ${globalBankingDisable}`}
                onClick={() => props.rollDice(9)}
              >
                9
              </button>
            </div>
            <div className="quarter-row">
              <button
                disabled={props.isBanking}
                className={`button ${globalBankingDisable}`}
                onClick={() => props.rollDice(10)}
              >
                10
              </button>
              <button
                disabled={props.isBanking}
                className={`button ${globalBankingDisable}`}
                onClick={() => props.rollDice(11)}
              >
                11
              </button>
              <button
                disabled={props.isBanking}
                className={`button ${globalBankingDisable} ${
                  dangerRoll ? 'disabled' : ''
                }`}
                onClick={() => props.rollDice(12)}
              >
                12
              </button>
              <button
                className={`button ${globalBankingDisable}`}
                onClick={() =>
                  alert(
                    'Feature: Undo Dice Roll\n\nThis feature is in the works and is coming soon. Check back soon.'
                  )
                }
              >
                <UndoIcon />
              </button>
            </div>
            <div className="half-row">
              <button
                className={`button ${
                  props.isBanking
                    ? 'red'
                    : props.gameState.round_over
                    ? 'disabled'
                    : 'yellow'
                } ${globalRoundOverDisable}`}
                onClick={() =>
                  props.setIsBanking(props.isBanking ? false : true)
                }
              >
                {props.isBanking ? 'Cancel' : 'Vault'}
              </button>
              <button
                disabled={!dangerRoll && !props.isBanking}
                className={`button ${
                  props.isBanking ? 'green' : !dangerRoll ? 'disabled' : ''
                } ${globalRoundOverDisable}`}
                onClick={() => {
                  if (props.isBanking) {
                    props.bank(props.playersToBank || [])
                    props.setPlayersToBank([])
                    props.setIsBanking(false)
                  } else if (dangerRoll) {
                    props.rollDice(1, true)
                  }
                }}
              >
                {props.isBanking ? 'Confirm' : 'Double'}
              </button>
            </div>
          </>
        )}
      </div>
      <div className="glow" />
    </div>
  )
}
