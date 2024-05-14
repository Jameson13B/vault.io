import './footer.css'
import { GameState } from 'usevault'
import UndoIcon from '../assets/undo_icon.svg'

type FooterProps = {
  gameState: GameState
  isVaulting: boolean
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
              onClick={() => {
                props.setIsOnboarding(true)
                return props.replay()
              }}
            >
              Change Players
            </button>
          </div>
        )}
        {props.isVaulting && (
          <div className="half-row">
            <button
              className="button black"
              onClick={() => props.setIsVaulting(false)}
            >
              Cancel
            </button>
            <button
              className="button yellow"
              onClick={() => {
                props.vault(props.playersToVault || [])
                props.setPlayersToVault([])
                props.setIsVaulting(false)
              }}
            >
              Confirm
            </button>
          </div>
        )}
        {!props.isVaulting && !props.gameState.game_over && (
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
                className={`button ${globalRoundOverDisable} ${
                  dangerRoll ? 'disabled' : ''
                }`}
                onClick={() => props.rollDice(2)}
              >
                2
              </button>
              <button
                className={`button ${globalRoundOverDisable}`}
                onClick={() => props.rollDice(3)}
              >
                3
              </button>
              <button
                className={`button ${globalRoundOverDisable}`}
                onClick={() => props.rollDice(4)}
              >
                4
              </button>
              <button
                className={`button ${globalRoundOverDisable}`}
                onClick={() => props.rollDice(5)}
              >
                5
              </button>
            </div>
            <div className="quarter-row">
              <button
                className={`button ${globalRoundOverDisable}`}
                onClick={() => props.rollDice(6)}
              >
                6
              </button>
              <button
                className={`button ${globalRoundOverDisable} ${
                  dangerRoll && !props.gameState.round_over ? 'red' : ''
                }`}
                onClick={() => props.rollDice(7)}
              >
                7
              </button>
              <button
                className={`button ${globalRoundOverDisable}`}
                onClick={() => props.rollDice(8)}
              >
                8
              </button>
              <button
                className={`button ${globalRoundOverDisable}`}
                onClick={() => props.rollDice(9)}
              >
                9
              </button>
            </div>
            <div className="quarter-row">
              <button
                className={`button ${globalRoundOverDisable}`}
                onClick={() => props.rollDice(10)}
              >
                10
              </button>
              <button
                className={`button ${globalRoundOverDisable}`}
                onClick={() => props.rollDice(11)}
              >
                11
              </button>
              <button
                className={`button ${globalRoundOverDisable} ${
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
                className={`button ${
                  props.gameState.roll_history?.filter(
                    (roll) => roll.round === props.gameState.current_round
                  ).length === 0
                    ? 'disabled'
                    : ''
                } ${globalRoundOverDisable}`}
                onClick={() => props.undoRoll()}
              >
                <UndoIcon />
              </button>
            </div>
            <div className="half-row">
              <button
                className={`button ${
                  props.gameState.round_over ? 'disabled' : 'yellow'
                }`}
                onClick={() => props.setIsVaulting(true)}
              >
                Vault
              </button>
              <button
                disabled={!dangerRoll}
                className={`button ${
                  !dangerRoll || props.gameState.round_over ? 'disabled' : ''
                }`}
                onClick={() => props.rollDice('double')}
              >
                Double
              </button>
            </div>
          </>
        )}
      </div>
      <div className="glow" />
    </div>
  )
}
