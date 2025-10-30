import { Button, Layout } from "antd"
import {
  layoutStyle,
  headerStyle,
  contentStyle,
  footerStyle,
} from "../styles/global.css.ts"
import * as styles from "../styles/gameOver.css.ts"
import { vars } from "../styles/theme.css.ts"

const { Header, Content, Footer } = Layout

export const GameOver = ({ gameState }: { gameState: GameState }) => {
  return (
    <Layout className={layoutStyle}>
      <Header className={headerStyle} id='step-header'>
        <h1 className={styles.gameOverHeaderTitleStyle}>End of game</h1>
        <p className={styles.gameOverStatsTextStyle}>
          {`${
            gameState.players.sort((a, b) => b.score - a.score)[0].name
          } Wins!`}
        </p>
      </Header>
      <Content className={contentStyle} id='step-content'>
        <div className={styles.gameOverContentStyle}>
          {gameState.players
            .sort((a, b) => b.score - a.score)
            .map((player, i) => (
              <div
                className={styles.gameOverPlayerCardStyle}
                key={player.id}
                style={{
                  backgroundColor:
                    i === 0 ? vars.color.yellow : vars.color.dark,
                  color: i === 0 ? vars.color.dark : vars.color.yellow,
                }}
              >
                <p className={styles.gameOverPlayerNameStyle}>{player.name}</p>
                <p className={styles.gameOverPlayerScoreStyle}>
                  {player.score}
                </p>
              </div>
            ))}
        </div>
      </Content>
      <Footer
        className={footerStyle}
        id='step-footer'
        style={{ padding: "0 16px 16px" }}
      >
        <div className={styles.footerButtonContainerStyle}>
          <Button
            className={styles.gameOverButtonStyle}
            type="primary"
            onClick={() => alert("Replay coming soon!")}
          >
            Replay
          </Button>
          <Button
            className={styles.gameOverStartButtonStyle}
            type="primary"
            onClick={() => alert("Change players coming soon!")}
          >
            Change Players
          </Button>
        </div>
      </Footer>
    </Layout>
  )
}
