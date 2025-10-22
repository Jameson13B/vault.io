import { style } from "@vanilla-extract/css"
import { vars } from "../styles/theme.css.ts"

// Header
export const headerTitleStyle = style({
  background: vars.color.gradient,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textAlign: "center",
  fontFamily: "Rajdhani",
  fontSize: 48,
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "normal",
  margin: "16px auto",
})
export const formStyle = style({
  display: "flex",
  flexDirection: "row",
  gap: 10,
})
export const inputStyle = style({
  background: vars.color.dark,
  border: `1px solid ${vars.color.darkyellow}`,
  borderRadius: 12,
  color: vars.color.darkyellow,
  fontSize: 20,
  fontWeight: 700,
  height: 55,
  padding: "14.5px 16px",
  outline: "none",
  "::placeholder": {
    color: vars.color.darkyellow,
    opacity: 0.5,
  },
  selectors: {
    "&:focus, &:hover": {
      background: vars.color.dark,
      borderColor: vars.color.darkyellow,
    },
  },
})
export const headerButtonStyle = style({
  background: vars.color.darkyellow,
  border: "0.5px solid #cca209",
  color: vars.color.dark,
  height: 55,
  padding: "15px 25px",
  outline: "none",
  selectors: {
    "&:hover": {
      background: vars.color.darkyellow,
    },
  },
})

// Content
export const onboardingContentStyle = style({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: 12,
  width: "100%",
  padding: "20px 4px",
})
export const playerCardStyle = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: 12,
  border: `1px solid ${vars.color.liteyellow}`,
  background: vars.color.dark,
  width: "calc(50% - 16px)",
  maxHeight: 55,
})
export const playerNameStyle = style({
  color: vars.color.liteyellow,
  fontFamily: "Rajdhani",
  textAlign: "start",
  fontSize: 20,
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "normal",
  flexGrow: 1,
  margin: "9.5px 9.5px 9.5px 11px",
})
export const removeButtonStyle = style({
  background: "transparent",
  border: "none",
  borderLeft: `1px solid ${vars.color.liteyellow}`,
  borderRadius: 0,
  color: vars.color.liteyellow,
  cursor: "pointer",
  height: "100%",
  textAlign: "center",
  fontFamily: "Rajdhani",
  fontSize: 20,
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "normal",
  width: 51,
})

// Footer
export const footerTitleStyle = style({
  fontSize: 24,
  fontWeight: 700,
  color: vars.color.yellow,
  textAlign: "center",
  fontFamily: "Rajdhani",
  fontStyle: "normal",
  lineHeight: "normal",
  margin: "0 auto 16px",
})
export const footerButtonContainerStyle = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  gap: 16,
  marginBottom: 16,
})
export const footerButtonStyle = style({
  background: "transparent",
  border: `1px solid ${vars.color.darkyellow}`,
  color: vars.color.darkyellow,
  fontSize: 16,
  fontWeight: 700,
  outline: "none",
  padding: "12px 16px",
  width: "75px",
  selectors: {
    "&:hover": {
      background: vars.color.liteyellow,
      color: vars.color.dark,
    },
    "&.active": {
      background: vars.color.yellow,
      color: vars.color.dark,
      borderColor: "transparent",
    },
  },
})
export const footerStartButtonStyle = style({
  background: vars.color.yellow,
  border: "0.5px solid #cca209",
  color: vars.color.dark,
  padding: "12px 45px",
  outline: "none",
  fontSize: 16,
  fontWeight: 700,
  selectors: {
    "&:hover": {
      background: vars.color.liteyellow,
    },
  },
})

export default {
  headerTitleStyle,
  formStyle,
  inputStyle,
  headerButtonStyle,
  onboardingContentStyle,
  playerCardStyle,
  playerNameStyle,
  removeButtonStyle,
  footerTitleStyle,
  footerButtonContainerStyle,
  footerButtonStyle,
  footerStartButtonStyle,
}
