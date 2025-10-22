import { useMemo, useState } from "react"
import { Layout } from "antd"
import {
  layoutStyle,
  headerStyle,
  contentStyle,
  footerStyle,
} from "../styles/global.css.ts"
import * as styles from "./game.css.ts"
import * as modules from "./game.module.css"
import { vars } from "../styles/theme.css.ts"

const { Header, Content, Footer } = Layout

export const Game = ({
  gameState,
  handle,
  isVaulting,
  rounds,
  setIsVaulting,
}: GameProps) => {
  const currentRoundRolls = useMemo(() => {
    return gameState.roll_history.filter(
      (roll) => roll.round === gameState.current_round
    )
  }, [gameState.current_round, gameState.roll_history])
  const [playersToVault, setPlayersToVault] = useState<Player[]>([])

  return (
    <Layout className={layoutStyle}>
      <Header
        className={headerStyle}
        style={{ lineHeight: "initial" }}
        id="step-header"
      >
        <div className={styles.headerContainer1Style}>
          <h1 className={styles.headerTitleStyle}>Vault</h1>
          <div>
            <p className={styles.headerRoundLabelStyle}>Round</p>
            <p className={styles.headerRoundValueStyle}>
              {gameState.current_round}/{rounds}
            </p>
          </div>
          <button className={styles.headerRulesButtonStyle}>Rules</button>
        </div>
        <div>
          <h1 className={styles.headerScoreStyle}>
            {gameState.roll_history
              .filter((roll) => roll.round === gameState.current_round)
              .reduce((acc, roll) => acc + Number(roll.value), 0)}{" "}
            Points
          </h1>
        </div>
      </Header>

      <Content
        className={contentStyle}
        id="step-content"
        style={{ display: "flex" }}
      >
        <div className={styles.contentContainerStyle}>
          <div className={styles.contentVaultedPlayersStyle}>
            <p className={styles.contentVaultedPlayersLabelStyle}>
              VAULTED
              <br />
              PLAYERS
            </p>
            <div className={styles.contentVaultedPlayersListStyle}>
              {gameState.players
                .filter((p) => p.is_vaulted)
                .map((p) => (
                  <div className={styles.contentVaultedPlayersItemStyle}>
                    <p className={styles.contentVaultedPlayersItemNameStyle}>
                      {p.name}
                    </p>
                    <p className={styles.contentVaultedPlayersItemScoreStyle}>
                      {p.score}
                    </p>
                  </div>
                ))}
            </div>
          </div>
          <div className={modules.activePlayersStyle}>
            {gameState.players
              .filter((p) => !p.is_vaulted)
              .sort((a, b) => b.score - a.score)
              .map((p) => (
                <div className={modules.activePlayersItemStyle}>
                  <p className={modules.activePlayerName}>{p.name}</p>
                  <p className={modules.activePlayerScore}>{p.score}</p>
                </div>
              ))}
          </div>
        </div>
      </Content>

      <Footer
        className={footerStyle}
        id="step-footer"
        style={{
          padding: 16,
          marginBottom: "none",
          display: "flex",
          borderBottom: "none",
          flexDirection: "column",
          borderTop: `2px solid ${
            !isVaulting ? vars.color.yellow : "transparent"
          }`,
        }}
      >
        {!isVaulting ? (
          <>
            <div className={styles.footerStatusBarStyle}>
              <p className={styles.footerStatusBarPlayerLabelStyle}>
                {gameState.players[0].name}
              </p>
              <div style={{ width: "75px", padding: "0 0 0 8px" }}>
                <p className={styles.footerStatusBarRollLabelStyle}>Roll</p>
                <hr
                  style={{
                    borderColor: vars.color.yellow,
                    margin: "4px 0",
                  }}
                />
                <p className={styles.footerStatusBarRollLabelStyle}>
                  {currentRoundRolls.length + 1}
                </p>
              </div>
            </div>
            <div className={styles.keypadStyle}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  width: "75%",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <KeypadButton
                    disabled={currentRoundRolls.length === 0}
                    label={
                      <div>
                        <img
                          src="/src/assets/undo_icon.svg"
                          alt="React logo"
                          style={{
                            width: 15,
                            height: 16,
                            display: "block",
                            margin: "0 auto",
                          }}
                        />
                        <p style={{ margin: 0, fontSize: 10 }}>Undo</p>
                      </div>
                    }
                    onClick={handle.undoRoll}
                  />
                  <KeypadButton
                    disabled={currentRoundRolls.length >= 3}
                    label="2"
                    onClick={() => handle.rollDice(2)}
                  />
                  <KeypadButton label="3" onClick={() => handle.rollDice(3)} />
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <KeypadButton label="4" onClick={() => handle.rollDice(4)} />
                  <KeypadButton label="5" onClick={() => handle.rollDice(5)} />
                  <KeypadButton label="6" onClick={() => handle.rollDice(6)} />
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <KeypadButton
                    stylesOverride={
                      currentRoundRolls.length >= 3
                        ? { backgroundColor: vars.color.red }
                        : { backgroundColor: vars.color.dark }
                    }
                    label="7"
                    onClick={() => handle.rollDice(7)}
                  />
                  <KeypadButton label="8" onClick={() => handle.rollDice(8)} />
                  <KeypadButton label="9" onClick={() => handle.rollDice(9)} />
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <KeypadButton
                    label="10"
                    onClick={() => handle.rollDice(10)}
                    stylesOverride={{ marginBottom: 0 }}
                  />
                  <KeypadButton
                    label="11"
                    onClick={() => handle.rollDice(11)}
                    stylesOverride={{ marginBottom: 0 }}
                  />
                  <KeypadButton
                    disabled={currentRoundRolls.length >= 3}
                    label="12"
                    onClick={() => handle.rollDice(12)}
                    stylesOverride={{ marginBottom: 0 }}
                  />
                </div>
              </div>
              <hr
                style={{
                  height: "100%",
                  borderColor: vars.color.yellow,
                  margin: "0 3%",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  height: "100%",
                  width: "19%",
                }}
              >
                {/* Two buttons */}
                <LargeKeypadButton
                  label="Vault"
                  onClick={() => setIsVaulting(true)}
                />
                <LargeKeypadButton
                  disabled={currentRoundRolls.length < 3}
                  label="Double"
                  onClick={() => handle.rollDice("DOUBLE")}
                />
              </div>
            </div>
          </>
        ) : (
          <div className={styles.footerVaultContainerStyle}>
            <h2 className={styles.footerVaultLabelStyle}>
              Select which players to vault
            </h2>
            <div className={styles.footerVaultButtonContainerStyle}>
              <button
                className={`${styles.footerVaultButtonStyle} ${styles.footerVaultButtonCancelStyle}`}
                onClick={() => {
                  setIsVaulting(false)
                  setPlayersToVault([])
                }}
              >
                Cancel
              </button>
              <button
                className={`${styles.footerVaultButtonStyle} ${styles.footerVaultButtonConfirmStyle}`}
                onClick={() => {
                  handle.vault(playersToVault.map((p) => p.id))
                  setIsVaulting(false)
                  setPlayersToVault([])
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </Footer>
    </Layout>
  )
}

const KeypadButton = ({
  label,
  stylesOverride = {},
  ...props
}: {
  label: string | React.ReactNode
  stylesOverride?: React.CSSProperties
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      style={{
        borderRadius: 12,
        background: vars.color.dark,
        borderColor: vars.color.yellow,
        border: "1px solid",
        color: vars.color.yellow,
        cursor: props.disabled ? "disabled" : "pointer",
        height: "40px",
        fontSize: 16,
        maxWidth: "75px",
        width: "100%",
        opacity: props.disabled ? 0.15 : 1,
        ...stylesOverride,
      }}
      {...props}
    >
      {label}
    </button>
  )
}
const LargeKeypadButton = ({
  label,
  ...props
}: { label: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      style={{
        borderRadius: 12,
        border: "none",
        background: vars.color.yellow,
        color: vars.color.dark,
        cursor: props.disabled ? "not-allowed" : "pointer",
        height: "48%",
        fontSize: 16,
        maxWidth: "80px",
        width: "100%",
        opacity: props.disabled ? 0.15 : 1,
        fontWeight: 700,
        lineHeight: "normal",
      }}
      {...props}
    >
      {label}
    </button>
  )
}
