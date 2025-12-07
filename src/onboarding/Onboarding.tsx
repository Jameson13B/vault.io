import { Input, Layout, message } from "antd"
import {
  layoutStyle,
  headerStyle,
  contentStyle,
  footerStyle,
} from "../styles/global.css.ts"
import styles from "./onboarding.css.ts"
import { useState } from "react"

const { Header, Content, Footer } = Layout

type OnboardingProps = {
  handle: useVaultReturnProps["handle"]
  gameState: GameState
}

export const Onboarding = ({ handle, gameState }: OnboardingProps) => {
  const [name, setName] = useState("")

  return (
    <Layout className={layoutStyle}>
      {/* Header */}
      <Header className={headerStyle} id="step-header">
        <h1 className={styles.headerTitleStyle}>VAULT</h1>
      </Header>
      {/* Main */}
      <Content
        className={contentStyle}
        id="step-content"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "0 19px",
        }}
      >
        {/* Map through players and display them */}
        <div className={styles.onboardingContentStyle}>
          {gameState.players.map((player) => (
            <div className={styles.playerCardStyle} key={player.id}>
              <p className={styles.playerNameStyle}>{player.name}</p>
              <button
                className={styles.removeButtonStyle}
                onClick={() => handle.removePlayer(player.name)}
              >
                X
              </button>
            </div>
          ))}
        </div>
        <form
          className={styles.formStyle}
          onSubmit={(e) => {
            e.preventDefault()
            handle.addPlayer(name)
            setName("")
          }}
        >
          <Input
            className={styles.inputStyle}
            placeholder="Enter player name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className={styles.headerButtonStyle} type="submit">
            Add
          </button>
        </form>
      </Content>
      {/* Footer */}
      <Footer className={footerStyle} id="step-footer">
        <h2 className={styles.footerTitleStyle}>Select number of turns</h2>
        <div className={styles.footerButtonContainerStyle}>
          <button
            className={
              styles.footerButtonStyle +
              (gameState.maxRounds === 10 ? " active" : "")
            }
            onClick={() => handle.setRounds(10)}
          >
            10
          </button>
          <button
            className={
              styles.footerButtonStyle +
              (gameState.maxRounds === 15 ? " active" : "")
            }
            onClick={() => handle.setRounds(15)}
          >
            15
          </button>
          <button
            className={
              styles.footerButtonStyle +
              (gameState.maxRounds === 20 ? " active" : "")
            }
            onClick={() => handle.setRounds(20)}
          >
            20
          </button>
        </div>
        <button
          className={styles.footerStartButtonStyle}
          onClick={() =>
            gameState.players.length < 2
              ? message.error("Please add at least 2 players")
              : handle.toggleOnboarding()
          }
        >
          Start Game
        </button>
      </Footer>
    </Layout>
  )
}
