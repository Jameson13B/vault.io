import { Layout } from "antd"
import { contentStyle, headerStyle, layoutStyle } from "../styles/global.css"
import { Content, Header } from "antd/es/layout/layout"
import styles from "./rules.module.css"
import { vars } from "../styles/theme.css"

export const Rules = ({
  setShowRules,
}: {
  setShowRules: (show: boolean) => void
}) => {
  return (
    <Layout className={layoutStyle}>
      <Header
        className={headerStyle}
        id="step-header"
        style={{ lineHeight: "initial" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ color: vars.color.darkyellow }}>Rules</h1>
          <button
            className={styles.headerRulesButtonStyle}
            onClick={() => setShowRules(false)}
          >
            Close
          </button>
        </div>
      </Header>
      <Content className={contentStyle} id="step-content">
        {/* TODO: Add rules content here */}
        <strong style={{ color: vars.color.yellow }}>Coming Soon...</strong>
      </Content>
    </Layout>
  )
}
