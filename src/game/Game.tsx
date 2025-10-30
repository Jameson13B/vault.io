import { useMemo, useState } from "react"
import { Layout } from "antd"

import {
  layoutStyle,
  headerStyle,
  contentStyle,
  footerStyle,
} from "../styles/global.css.ts"
import * as styles from "./game.css.ts"
import modules from "./game.module.css"
import { vars } from "../styles/theme.css.ts"
import { doubleRoll } from "../hooks/useVault.tsx"
import Logo from "../assets/Logo.svg"

const { Header, Content, Footer } = Layout

export const Game = ({ handle, gameState }: useVaultReturnProps) => {
  const currentRoundRolls = useMemo(
    () =>
      gameState.rollHistory.filter(
        (roll) => roll.round === gameState.currentRound
      ),
    [gameState.currentRound, gameState.rollHistory]
  )
  const [playersToVault, setPlayersToVault] = useState<Player[]>([])

  return (
    <Layout className={layoutStyle}>
      <Header
        className={headerStyle}
        style={{ lineHeight: "initial" }}
        id='step-header'
      >
        <div className={styles.headerContainer1Style}>
          <Logo />
          <div>
            <p className={styles.headerRoundLabelStyle}>Round</p>
            <p className={styles.headerRoundValueStyle}>
              {gameState.currentRound}/{gameState.maxRounds}
            </p>
          </div>
          <button
            className={styles.headerRulesButtonStyle}
            onClick={handle.toggleRules}
          >
            Rules
          </button>
        </div>
        <div>
          <h1 className={styles.headerScoreStyle}>
            {gameState.rollHistory
              .filter((roll) => roll.round === gameState.currentRound)
              .reduce((acc, roll) => acc + Number(roll.value), 0)}{" "}
            Points
          </h1>
        </div>
      </Header>

      <Content
        className={contentStyle}
        id='step-content'
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
                  <div
                    key={p.id}
                    className={styles.contentVaultedPlayersItemStyle}
                  >
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
              .map((p) => {
                const isVaulted = playersToVault.includes(p)

                return (
                  <div
                    key={p.id}
                    className={`${modules.activePlayersItemStyle} ${
                      isVaulted && modules.activePlayerVaultItemSelected
                    }`}
                    onClick={() =>
                      isVaulted
                        ? setPlayersToVault(
                            playersToVault.filter((p) => p.id !== p.id)
                          )
                        : setPlayersToVault([...playersToVault, p])
                    }
                    role='button'
                    tabIndex={0}
                  >
                    <p className={modules.activePlayerName}>{p.name}</p>
                    <p
                      className={`${modules.activePlayerScore} ${
                        isVaulted && modules.activePlayerScoreSelected
                      }`}
                    >
                      {p.score}
                    </p>
                  </div>
                )
              })}
          </div>
        </div>
      </Content>

      <Footer
        className={footerStyle}
        id='step-footer'
        style={{
          padding: 16,
          marginBottom: "none",
          display: "flex",
          borderBottom: "none",
          flexDirection: "column",
          borderTop: `2px solid ${vars.color.yellow}`,
        }}
      >
        {!gameState.isVaulting ? (
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
                          src='/src/assets/undo_icon.svg'
                          alt='React logo'
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
                    onClick={() => alert("Undo not implemented")}
                  />
                  <KeypadButton
                    disabled={currentRoundRolls.length >= 3}
                    label='2'
                    onClick={() => handle.rollDice(2)}
                  />
                  <KeypadButton label='3' onClick={() => handle.rollDice(3)} />
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <KeypadButton label='4' onClick={() => handle.rollDice(4)} />
                  <KeypadButton label='5' onClick={() => handle.rollDice(5)} />
                  <KeypadButton label='6' onClick={() => handle.rollDice(6)} />
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
                    label='7'
                    onClick={() => handle.rollDice(7)}
                  />
                  <KeypadButton label='8' onClick={() => handle.rollDice(8)} />
                  <KeypadButton label='9' onClick={() => handle.rollDice(9)} />
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <KeypadButton
                    label='10'
                    onClick={() => handle.rollDice(10)}
                    stylesOverride={{ marginBottom: 0 }}
                  />
                  <KeypadButton
                    label='11'
                    onClick={() => handle.rollDice(11)}
                    stylesOverride={{ marginBottom: 0 }}
                  />
                  <KeypadButton
                    disabled={currentRoundRolls.length >= 3}
                    label='12'
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
                  label={
                    <div>
                      <p className={modules.footerVaultButtonLabelStyle}>
                        Vault
                      </p>
                      {/* I need to clip a little border around the following picture to get rid of white space */}
                      <img
                        src='/src/assets/vault_icon.svg'
                        alt='Vault'
                        className={modules.footerVaultButtonIconStyle}
                      />
                    </div>
                  }
                  onClick={() => handle.toggleVaulting()}
                />
                <LargeKeypadButton
                  disabled={currentRoundRolls.length < 3}
                  label={
                    <div>
                      <p className={modules.footerVaultButtonLabelStyle}>
                        Double
                      </p>
                      <p className={modules.footerVaultButtonDoubleLabelStyle}>
                        x2
                      </p>
                    </div>
                  }
                  onClick={() => handle.rollDice(doubleRoll)}
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
                  handle.toggleVaulting()
                  setPlayersToVault([])
                }}
              >
                Cancel
              </button>
              <button
                className={`${styles.footerVaultButtonStyle} ${styles.footerVaultButtonConfirmStyle}`}
                onClick={() => {
                  handle.vault(playersToVault.map((p) => p.id))
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
}: {
  label: string | React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
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
