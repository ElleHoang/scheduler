import { useState } from "react";

export default function useVisualMode(initial) {
  // useVisualMode function can take initial argument to set mode state
  //const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // when transition is called, need to add new mode to history
  function transition(newMode, replace = false) {
    // when replace is true, replace current mode in history with new one
    replace ? setHistory([initial, newMode]) : setHistory((prevHistory) => { 
      const newHistory = [...prevHistory, newMode]; // => return a new history array w/ new mode
      return newHistory;
    })
  }

  // when back is called, should set mode to previous item in history array
  function back() {
    if(history.length < 2) {
      return;
    }
    setHistory((newHistory) => {  // newHistory = history w/ newMode
      const prevHistory = [...newHistory];
      prevHistory.pop(); // remove newMode
      return prevHistory; // return history w/o newMode
    })
  }

  //then return obj { mode } that lets tests ( and components) access current value of mode from hook
  const mode = history[history.length -1];
  return { mode, transition, back }; // { mode: mode }
}