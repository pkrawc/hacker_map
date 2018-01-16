import React from "react"
import ReactDOM from "react-dom"
import { injectGlobal } from "styled-components"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"

// #e74c3c
// #EF5350

injectGlobal`
*,*:before,*:after {
  box-sizing: border-box;
}
:root {
  font-size: 18px;
  font-family: 'Hack', sans-serif;
}
html, body {
  height: 100%;
  width: 100%;
}
body {
  position: relative;
  margin: 0;
  padding: 0;
}
.mapboxgl-canvas-container.mapboxgl-interactive {
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
}
`

ReactDOM.render(<App />, document.getElementById("root"))
registerServiceWorker()
