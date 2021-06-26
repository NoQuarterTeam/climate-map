// don't import files or modules into this file
const { APP_ENV } = process.env
let env: "production" | "development"

if (APP_ENV) {
  env = APP_ENV as "production" | "development"
} else {
  const hostname = typeof window !== "undefined" && window?.location?.hostname
  if (hostname) {
    if (hostname.includes("climate-map")) {
      env = "production"
    } else {
      env = "development"
    }
  } else {
    env = "development"
  }
}

export const IS_PRODUCTION = env === "production"
export const IS_DEV = !IS_PRODUCTION
export const REDIRECT_PATH = "redirect"

export const SENTRY_DSN = "https://5d0371a223bb4509902f8940cb957daf@o204549.ingest.sentry.io/5741383"
export const API_URL = IS_PRODUCTION
  ? "https://nq-climate-map.herokuapp.com/graphql"
  : "http://localhost:5000/graphql"

export const WEB_URL = IS_PRODUCTION ? "climatemap.noquarter.co" : "localhost:3000"

export const SESSION_TOKEN = "climatemap.token"

export const NAV_HEIGHT = 50

export const MAPBOX_TOKEN =
  "pk.eyJ1Ijoibm9xdWFydGVyIiwiYSI6ImNraHl5czY1dzB5NnMycW1wMWhyaDJjMW0ifQ.e3Doof2xkFEN0tRM_GdfWg"

export const WORLD_BBOX = [
  [-138.5, -30.0],
  [49.7, 58.2],
]

export const MAPBOX_STYLE = "mapbox://styles/noquarter/cklce2b613rgw17sa5keqdhf9"
export const MAPBOX_STYLE_DARK = "mapbox://styles/noquarter/ckqeb3z940pz117lyh9rxn8fd"
