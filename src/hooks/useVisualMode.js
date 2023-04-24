import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // transition function
  // changes to new mode, adds/overwrites previous mode to/in history
  function transition(newMode, replace = false) {
    if (replace) {
      setHistory(prev => [...prev.slice(0,-1), newMode]);
    } else {
      setHistory(prev => [...prev, newMode]);
    }
    setMode(newMode);
  }

  // back function
  // returns to latest mode in history
  function back() {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(history.slice(0, -1));
    }
  }

  return { mode, transition, back };

}