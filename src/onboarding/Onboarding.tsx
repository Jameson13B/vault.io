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
  addPlayer: (name: string) => void
  players: Player[]
  removePlayer: (id: string) => void
  rounds: number
  setRounds: (rounds: number) => void
  startGame: () => void
}

export const Onboarding = ({
  addPlayer,
  players,
  removePlayer,
  rounds,
  setRounds,
  startGame,
}: OnboardingProps) => {
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
          {players.map((player) => (
            <div className={styles.playerCardStyle} key={player.id}>
              <p className={styles.playerNameStyle}>{player.name}</p>
              <button
                className={styles.removeButtonStyle}
                onClick={() => removePlayer(player.name)}
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
            addPlayer(name)
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
              styles.footerButtonStyle + (rounds === 10 ? " active" : "")
            }
            onClick={() => setRounds(10)}
          >
            10
          </button>
          <button
            className={
              styles.footerButtonStyle + (rounds === 15 ? " active" : "")
            }
            onClick={() => setRounds(15)}
          >
            15
          </button>
          <button
            className={
              styles.footerButtonStyle + (rounds === 20 ? " active" : "")
            }
            onClick={() => setRounds(20)}
          >
            20
          </button>
        </div>
        <button
          className={styles.footerStartButtonStyle}
          onClick={() =>
            players.length < 2
              ? message.error("Please add at least 2 players")
              : startGame()
          }
        >
          Start Game
        </button>
      </Footer>
    </Layout>
  )
}
