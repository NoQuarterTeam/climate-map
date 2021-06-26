import ReactMapboxGl from "react-mapbox-gl"
import { MAPBOX_TOKEN } from "./config"

export const Mapbox = ReactMapboxGl({ accessToken: MAPBOX_TOKEN })
