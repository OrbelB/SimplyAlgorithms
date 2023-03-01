import { useState, useEffect } from 'react';

export default function useTimer() {
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [stoppedTime, setStoppedTime] = useState(null);

  const start = () => {
    setStartTime(new Date());
    setIsRunning(true);
  };

  const stop = () => {
    setStoppedTime(new Date());
    setIsRunning(false);
  };

  const reset = () => {
    setStartTime(null);
    setElapsedTime(0);
    setIsRunning(false);
  };

  useEffect(() => {
    if (isRunning) {
      const now = new Date();
      const newElapsedTime = now.getTime() - startTime.getTime();
      setElapsedTime(newElapsedTime);
    }
  }, [isRunning, startTime]);

  return { elapsedTime, start, stop, reset, startTime, stoppedTime };
}
