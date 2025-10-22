import { style } from "@vanilla-extract/css"
import { vars } from "./theme.css.ts"

export const layoutStyle = style({
  borderRadius: "8px 8px 0px 0px",
  overflow: "hidden",
  width: "100%",
  maxWidth: "420px",
  margin: "0 auto",
  background: vars.color.dark,
  height: "100%",
})
export const headerStyle = style({
  textAlign: "center",
  color: "#fff",
  height: "auto",
  padding: "16px",
  backgroundColor: vars.color.dark,
})
export const contentStyle = style({
  textAlign: "center",
  minHeight: 120,
  color: "#fff",
  backgroundColor: vars.color.dark,
})
export const footerStyle = style({
  textAlign: "center",
  color: "#fff",
  backgroundColor: vars.color.dark,
  padding: 16,
})
