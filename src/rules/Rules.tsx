import { Layout } from "antd"
import { headerStyle, layoutStyle } from "../styles/global.css"
import { Content, Header } from "antd/es/layout/layout"
import styles from "./rules.module.css"
import { vars } from "../styles/theme.css"

import order from "../assets/rules/order.png"
import tinyDice from "../assets/rules/example_tiny_dice.png"
import safeRoll from "../assets/rules/safeRoll.png"
import exampleOne from "../assets/rules/example_one.svg?url"
import exampleTwo from "../assets/rules/example_two.svg?url"

export const Rules = ({
  handle,
}: {
  handle: useVaultReturnProps["handle"]
}) => {
  return (
    <Layout className={layoutStyle}>
      <Header
        className={headerStyle}
        id='step-header'
        style={{ lineHeight: "initial" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `1px solid ${vars.color.yellow}`,
          }}
        >
          <h1 style={{ color: vars.color.yellow }}>Rules</h1>
          <button
            className={styles.headerRulesButtonStyle}
            onClick={handle.toggleRules}
          >
            Close
          </button>
        </div>
      </Header>
      <Content className={styles.rulesContainer}>
        <div className={styles.section}>
          <h2 className={styles.sectionHeader}>Objective</h2>
          <p className={styles.sectionText}>
            Have the most points in your vault at the end of all the rounds.
          </p>
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionHeader}>Game Setup</h2>
          <div className={styles.imgTextContainer}>
            <img src={order} alt='Clock-wise order of play' />
            <p className={styles.sectionText}>
              Add players to the game in clock-wise order to ensure a continuous
              flow.
            </p>
          </div>
          <div className={styles.imgTextContainer}>
            <img src={tinyDice} alt='Example of Tiny Dice' />
            <p className={styles.sectionText}>You need 2 dice.</p>
          </div>
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionHeader}>Safe Rolls</h2>
          <div className={styles.imgTextContainer}>
            <img src={safeRoll} alt='Example of Safe Rolls' />
            <p className={styles.sectionText}>
              The first 3 players/rolls of every round are safe rolls.
            </p>
          </div>
          <p className={styles.sectionText}>
            Points are added to the group stash equal to the dice total.
          </p>
          <p className={styles.sectionText}>
            Rolling a seven adds 70 points to the group stash.
          </p>
        </div>
        <img src={exampleOne} alt='Example of Rolls' />
        <div className={styles.section}>
          <h2 className={styles.sectionHeader}>Continue Gameplay</h2>
          <p className={styles.sectionText}>
            Following the safe rolls, players continue taking turns rolling to
            add points to the group stash.
          </p>
          <p className={styles.sectionText}>
            At ANY point (regardless of if it is your turn or not) a player can
            call ‘vault’. As soon as ANY player calls ‘vault’, gameplay pauses
            immediately (stop rolling) and the scorekeeper marks the player as
            vaulted.{" "}
          </p>
          <p className={styles.sectionText}>
            When a player vaults, the current score is added to their personal
            vault and they are locked for the rest of the round. Vaulted players
            do not continue to roll the dice and cannot vault any more points
            for the current round.
          </p>
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionHeader}>Doubles</h2>
          <p className={styles.sectionText}>
            If a player rolls a double, the stash doubles. This rule isn’t
            applicable during the safe rolls.
          </p>
        </div>
        <img src={exampleTwo} alt='Example of Doubles' />
        <div className={styles.section}>
          <h2 className={styles.sectionHeader}>End of Round</h2>
          <p className={styles.sectionText}>
            There are two ways to end a round.
          </p>
          <p className={styles.sectionText}>
            The first way to end a round is if all players have vaulted.
          </p>
          <p className={styles.sectionText}>
            The second way to end a round is if a player rolls a seven. If this
            happens, points are added to the scores of those who called vault
            before the seven was rolled. The players who didn’t vault receive
            zero points.
          </p>
          <p className={styles.sectionText}>
            Gameplay continues with the next round, always starting with the
            safe rolls.
          </p>
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionHeader}>Risk It Round</h2>
          <p className={styles.sectionText}>
            On the final round of the game, any players who have not vaulted
            when a 7 is rolled lose the amount from the stash instead of taking
            0 points.
          </p>
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionHeader}>End of Game</h2>
          <p className={styles.sectionText}>
            At the end of all rounds, the game ends and the player with the most
            points in their vault is the winner!
          </p>
        </div>
      </Content>
    </Layout>
  )
}
