/* eslint-disable no-undef */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

if (window.tizen && window.tizen.tvinputdevice) {
  try {
    tizen.tvinputdevice.registerKey("MediaPlayPause");
    tizen.tvinputdevice.registerKey("MediaPlay");
    tizen.tvinputdevice.registerKey("MediaStop");
    tizen.tvinputdevice.registerKey("MediaRewind");
    tizen.tvinputdevice.registerKey("MediaFastForward");
  } catch (e) {
    console.log("TV Key Registration: ", e);
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
