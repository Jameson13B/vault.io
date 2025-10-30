import { style } from "@vanilla-extract/css"
import { vars } from "../styles/theme.css.ts"

// Header
export const headerContainer1Style = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
})
export const headerTitleStyle = style({
  background: vars.color.gradient,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textAlign: "center",
  fontSize: 24,
  fontWeight: 600,
  lineHeight: "50%",
})
export const headerRoundLabelStyle = style({
  borderBottom: `1px solid ${vars.color.yellow}`,
  color: vars.color.yellow,
  textAlign: "center",
  fontSize: 20,
  fontWeight: 400,
  margin: 0,
})
export const headerRoundValueStyle = style({
  color: vars.color.yellow,
  textAlign: "center",
  fontSize: 24,
  fontWeight: 400,
  margin: 0,
})
export const headerRulesButtonStyle = style({
  background: "transparent",
  borderRadius: 12,
  border: `1px solid ${vars.color.yellow}`,
  color: vars.color.yellow,
  fontSize: 16,
  fontWeight: 700,
  width: 84,
  height: 35,
  padding: "4px 12px",
})
export const headerScoreStyle = style({
  color: vars.color.yellow,
  textAlign: "center",
  fontSize: 56,
  fontWeight: 700,
  lineHeight: "40px",
  margin: "12px 50px",
})

// Content
export const contentContainerStyle = style({
  display: "flex",
  width: "390px",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: 12,
  flex: "1 0 0",
})
export const contentVaultedPlayersStyle = style({
  background: vars.color.yellow,
  borderRadius: "0 12px 12px 0",
  display: "flex",
  padding: 0,
  flexDirection: "column",
  alignItems: "center",
  alignSelf: "stretch",
  margin: "0 0 16px 0",
  minWidth: 90,
})
export const contentVaultedPlayersLabelStyle = style({
  color: vars.color.dark,
  textAlign: "center",
  fontSize: 16,
  fontWeight: 700,
  padding: 0,
  margin: "4px 0",
  lineHeight: "100%",
})
export const contentVaultedPlayersListStyle = style({
  borderTop: `2px solid ${vars.color.dark}`,
  display: "flex",
  padding: "12px 16px",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: 24,
  alignSelf: "stretch",
})
export const contentVaultedPlayersItemStyle = style({
  display: "flex",
  width: "105px",
  height: "55px",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "flex-start",
  borderRadius: 12,
  border: `1px solid ${vars.color.dark}`,
  background: vars.color.dark,
})
export const contentVaultedPlayersItemNameStyle = style({
  padding: "0px 4px",
  flex: "1 0 0",
  alignSelf: "stretch",
  color: vars.color.yellow,
  textAlign: "center",
  fontSize: 20,
  fontWeight: 700,
  margin: 0,
})
export const contentVaultedPlayersItemScoreStyle = style({
  color: vars.color.dark,
  fontSize: 20,
  fontWeight: 700,
  display: "flex",
  padding: "0px 8px",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  flex: "1 0 0",
  alignSelf: "stretch",
  borderLeft: `1px solid ${vars.color.dark}`,
  background: vars.color.yellow,
  margin: "0 0.5px 1px 0",
  borderRadius: "0px 0px 11px 11px",
})
export const contentActivePlayersStyle = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 12,
  flex: "1 0 0",
  alignSelf: "stretch",
})
// export const gameContentStyle = style({
//   display: "flex",
//   flexDirection: "row",
//   flexWrap: "wrap",
//   justifyContent: "center",
//   gap: 12,
//   width: "100%",
//   textAlign: "left",
// })
// export const playerCardStyle = style({
// display: "flex",
// flexDirection: "row",
// justifyContent: "space-between",
// alignItems: "center",
// borderRadius: 12,
// border: `1px solid ${vars.color.yellow}`,
// background: vars.color.dark,
// width: "calc(50% - 16px)",
// maxHeight: 55,
// })
// export const playerNameStyle = style({
//   color: vars.color.yellow,
//   fontFamily: "Rajdhani",
//   fontSize: 16,
//   margin: 0,
//   lineHeight: "normal",
//   padding: "16px 0 16px 16px",
// })
// export const playerScoreStyle = style({
// color: vars.color.yellow,
// fontFamily: "Rajdhani",
// fontSize: 20,
//   lineHeight: "normal",
//   padding: "14px 15px",
//   boxSizing: "border-box",
//   textAlign: "center",
// })

// Footer
export const footerStatusBarStyle = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  marginBottom: 8,
})
export const footerStatusBarRollLabelStyle = style({
  color: vars.color.yellow,
  textAlign: "center",
  fontSize: 20,
  fontWeight: 700,
  margin: 0,
})
export const footerStatusBarPlayerLabelStyle = style({
  color: vars.color.yellow,
  fontSize: 36,
  fontWeight: 700,
  margin: 0,
  flexGrow: 1,
  paddingBottom: 8,
})
export const footerStatusBarTagsStyle = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
})
// Footer Keypad
export const keypadStyle = style({
  display: "flex",
  alignItems: "center",
  flexGrow: 1,
})
// Footer Vault
export const footerVaultContainerStyle = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
})
export const footerVaultLabelStyle = style({
  color: vars.color.yellow,
  fontFamily: "Rajdhani",
  fontSize: 24,
  margin: "0 0 16px 0",
})
export const footerVaultButtonContainerStyle = style({
  display: "flex",
  gap: 16,
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
})
export const footerVaultButtonStyle = style({
  padding: "12px 16px",
  width: "135px",
})
export const footerVaultButtonCancelStyle = style({
  background: vars.color.dark,
  color: vars.color.yellow,
  border: `1px solid ${vars.color.yellow}`,
  fontWeight: 700,
  fontSize: 16,
  fontFamily: "Rajdhani",
})
export const footerVaultButtonConfirmStyle = style({
  background: vars.color.yellow,
  color: vars.color.dark,
  fontWeight: 700,
  fontSize: 16,
  fontFamily: "Rajdhani",
  border: `1px solid ${vars.color.yellow}`,
})
