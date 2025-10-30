import { style } from "@vanilla-extract/css"
import { vars } from "./theme.css.ts"

// Header
export const roundOverHeaderTitleStyle = style({
  color: vars.color.yellow,
  fontSize: 48,
  marginBottom: 16,
  marginTop: 60,
})
export const flexCenterStyle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 24,
  marginBottom: 60,
})
export const roundOverStatsTextStyle = style({
  color: vars.color.yellow,
  margin: 0,
  padding: 0,
  marginRight: 8,
})
export const roundOverStatsBoxStyle = style({
  color: vars.color.yellow,
  padding: "4px 12px",
  borderRadius: 12,
  border: `1px solid ${vars.color.yellow}`,
  lineHeight: "normal",
  margin: 0,
  marginLeft: 8,
})

// Content
export const roundOverContentStyle = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: 16,
})
export const roundOverPlayerCardStyle = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 17.5px",
  borderRadius: 12,
  border: `1px solid ${vars.color.yellow}`,
})
export const roundOverPlayerNameStyle = style({
  color: vars.color.yellow,
  fontSize: 16,
  margin: 0,
  padding: 0,
})
export const roundOverPlayerScoreStyle = style({
  color: vars.color.yellow,
  fontSize: 16,
  margin: 0,
  padding: 0,
})
