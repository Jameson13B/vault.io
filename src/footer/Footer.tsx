import './footer.css'
import { GameState } from '../hooks/useBankNew'
import { OnboardingFooter } from '../onboarding/Onboarding'
import UndoIcon from '../assets/undo_icon.svg'

type FooterProps = {
  gameState: GameState
  isVaulting: boolean
  isOnboarding: boolean
  playersToVault: number[]
  rollDice: (value: number | 'double') => void
  rounds: number
  setIsVaulting: (isVaulting: boolean) => void
  setIsOnboarding: (isOnboarding: boolean) => void
  setPlayersToVault: (playersToVault: number[]) => void
  setRounds: (rounds: number) => void
  vault: (playersToVault: number[]) => void
  replay: () => void
  undoRoll: () => void
}

export const Footer = (props: FooterProps) => {
  const dangerRoll =
    props.gameState.roll_history.filter(
      (roll) => roll.round === props.gameState.current_round
    ).length >= 3
  const globalBankingDisable =
    props.isVaulting || props.gameState.round_over ? 'disabled' : ''
  const globalRoundOverDisable = props.gameState.round_over ? 'disabled' : ''
  const nonVaultedPlayers = props.gameState.roll_queue.filter(
    (p) => !p.is_vaulted
  )

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
              (props.isVaulting ? (
                <p>Select which players to bank</p>
              ) : (
                <p>
                  {nonVaultedPlayers.length
                    ? nonVaultedPlayers[0].name + ' Roll'
                    : ''}
                </p>
              ))}
            <div className="quarter-row">
              <button
                disabled={props.isVaulting}
                className={`button ${globalBankingDisable} ${
                  dangerRoll ? 'disabled' : ''
                }`}
                onClick={() => props.rollDice(2)}
              >
                2
              </button>
              <button
                disabled={props.isVaulting}
                className={`button ${globalBankingDisable}`}
                onClick={() => props.rollDice(3)}
              >
                3
              </button>
              <button
                disabled={props.isVaulting}
                className={`button ${globalBankingDisable}`}
                onClick={() => props.rollDice(4)}
              >
                4
              </button>
              <button
                disabled={props.isVaulting}
                className={`button ${globalBankingDisable}`}
                onClick={() => props.rollDice(5)}
              >
                5
              </button>
            </div>
            <div className="quarter-row">
              <button
                disabled={props.isVaulting}
                className={`button ${globalBankingDisable}`}
                onClick={() => props.rollDice(6)}
              >
                6
              </button>
              <button
                disabled={props.isVaulting}
                className={`button ${
                  props.isVaulting || props.gameState.round_over
                    ? 'disabled'
                    : ''
                } ${
                  dangerRoll && !props.isVaulting && !props.gameState.round_over
                    ? 'red'
                    : ''
                }`}
                onClick={() => props.rollDice(7)}
              >
                7
              </button>
              <button
                disabled={props.isVaulting}
                className={`button ${globalBankingDisable}`}
                onClick={() => props.rollDice(8)}
              >
                8
              </button>
              <button
                disabled={props.isVaulting}
                className={`button ${globalBankingDisable}`}
                onClick={() => props.rollDice(9)}
              >
                9
              </button>
            </div>
            <div className="quarter-row">
              <button
                disabled={props.isVaulting}
                className={`button ${globalBankingDisable}`}
                onClick={() => props.rollDice(10)}
              >
                10
              </button>
              <button
                disabled={props.isVaulting}
                className={`button ${globalBankingDisable}`}
                onClick={() => props.rollDice(11)}
              >
                11
              </button>
              <button
                disabled={props.isVaulting}
                className={`button ${globalBankingDisable} ${
                  dangerRoll ? 'disabled' : ''
                }`}
                onClick={() => props.rollDice(12)}
              >
                12
              </button>
              <button
                disabled={
                  props.gameState.roll_history.filter(
                    (roll) => roll.round === props.gameState.current_round
                  ).length === 0
                }
                className={`button ${globalBankingDisable} ${
                  props.gameState.roll_history?.filter(
                    (roll) => roll.round === props.gameState.current_round
                  ).length === 0
                    ? 'disabled'
                    : ''
                }`}
                onClick={() => props.undoRoll()}
              >
                <UndoIcon />
              </button>
            </div>
            <div className="half-row">
              <button
                className={`button ${
                  props.isVaulting
                    ? 'red'
                    : props.gameState.round_over
                    ? 'disabled'
                    : 'yellow'
                } ${globalRoundOverDisable}`}
                onClick={() =>
                  props.setIsVaulting(props.isVaulting ? false : true)
                }
              >
                {props.isVaulting ? 'Cancel' : 'Vault'}
              </button>
              <button
                disabled={!dangerRoll && !props.isVaulting}
                className={`button ${
                  props.isVaulting ? 'green' : !dangerRoll ? 'disabled' : ''
                } ${globalRoundOverDisable}`}
                onClick={() => {
                  if (props.isVaulting) {
                    props.vault(props.playersToVault || [])
                    props.setPlayersToVault([])
                    props.setIsVaulting(false)
                  } else if (dangerRoll) {
                    props.rollDice('double')
                  }
                }}
              >
                {props.isVaulting ? 'Confirm' : 'Double'}
              </button>
            </div>
          </>
        )}
      </div>
      <div className="glow" />
    </div>
  )
}
