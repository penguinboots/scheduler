import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // transition function
  function transition(newMode) {
    setHistory(prev => [...prev, newMode]);
    setMode(newMode);
  }

  // back function
  function back() {
    if (history.length > 1) {
      setMode(history[history.length-2]);
      setHistory(history.slice(0, -1));
    }
  }

  return { mode, transition, back };

}