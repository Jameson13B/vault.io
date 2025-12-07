import { Layout } from "antd"
import { layoutStyle, headerStyle, contentStyle } from "../styles/global.css.ts"
import * as styles from "../styles/roundOver.css.ts"

const { Header, Content } = Layout

export const RoundOver = ({ gameState }: { gameState: GameState }) => {
  return (
    <Layout className={layoutStyle}>
      <Header className={headerStyle} id="step-header">
        <h1 className={styles.roundOverHeaderTitleStyle}>End of Round</h1>
        <div className={styles.flexCenterStyle}>
          <p className={styles.roundOverStatsTextStyle}>Round</p>
          <p className={styles.roundOverStatsBoxStyle}>
            {gameState.currentRound}/{gameState.maxRounds}
          </p>
        </div>
      </Header>
      <Content className={contentStyle} id="step-content">
        <div className={styles.roundOverContentStyle}>
          {[...gameState.players]
            .sort((a, b) => b.score - a.score)
            .map((player) => (
              <div className={styles.roundOverPlayerCardStyle} key={player.id}>
                <p className={styles.roundOverPlayerNameStyle}>{player.name}</p>
                <p className={styles.roundOverPlayerScoreStyle}>
                  {player.score}
                </p>
              </div>
            ))}
        </div>
      </Content>
    </Layout>
  )
}
