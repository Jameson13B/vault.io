import { style } from "@vanilla-extract/css"
import { vars } from "./theme.css.ts"

// Header
export const gameOverHeaderTitleStyle = style({
  color: vars.color.darkyellow,
  fontSize: 48,
  fontWeight: 500,
  marginBottom: 16,
  marginTop: 14,
})
export const gameOverStatsTextStyle = style({
  color: vars.color.darkyellow,
  margin: 0,
  padding: 0,
  marginRight: 8,
  fontSize: 24,
  lineHeight: "normal",
})

// Content
export const gameOverContentStyle = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: 16,
})
export const gameOverPlayerCardStyle = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 17.5px",
  borderRadius: 12,
  border: `1px solid ${vars.color.yellow}`,
})
export const gameOverPlayerNameStyle = style({
  fontSize: 16,
  margin: 0,
  padding: 0,
})
export const gameOverPlayerScoreStyle = style({
  fontSize: 16,
  margin: 0,
  padding: 0,
})

// Footer
export const footerButtonContainerStyle = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  gap: "4%",
  marginBottom: 16,
})
export const gameOverButtonStyle = style({
  background: "transparent",
  border: `0.5px solid ${vars.color.white}`,
  fontSize: 16,
  height: "100%",
  outline: "none",
  padding: "12px 0",
  width: "48%",
  maxHeight: 43,
  selectors: {
    "&:hover": {
      background: vars.color.white,
      color: vars.color.dark,
    },
    "&.active": {
      background: vars.color.white,
      color: vars.color.dark,
    },
  },
})
export const gameOverStartButtonStyle = style({
  background: vars.color.darkyellow,
  border: "0.5px solid #cca209",
  color: vars.color.dark,
  fontSize: 16,
  height: "100%",
  padding: "12px 0",
  outline: "none",
  width: "48%",
  maxHeight: 43,
  selectors: {
    "&:hover": {
      background: vars.color.darkbrown,
    },
  },
})
