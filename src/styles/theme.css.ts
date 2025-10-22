import { createGlobalTheme, globalStyle } from "@vanilla-extract/css"

export const vars = createGlobalTheme("*", {
  color: {
    liteyellow: "#f3ce75",
    yellow: "#ffdd00",
    darkyellow: "#b98a03",
    red: "#5c1a09",
    dark: "#1c1f21",
    gradient:
      "linear-gradient(to bottom, #fff 0%, #f3ce75 5%, #b98903 80%, #5c1a09 100% )",
  },
})

globalStyle("*", {
  fontFamily: "Rajdhani",
})
globalStyle("button", {
  borderRadius: 12,
  cursor: "pointer",
})

export default vars
