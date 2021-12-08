import {useState, useEffect} from "react";

const useTimer = () => {
  const [timeLeft, setTimeLeft] = useState<number>(-1);

  // -- Manage the test counter every 1s --
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1000);
        }
      }, 1000);

      return () => clearTimeout(timer); // Clear timeout if the component is unmounted
    }
  },[timeLeft]);

  // -- Start the timer method --
  const startTheTimer = (timeInMilliseconds: number) => {
    setTimeLeft(timeInMilliseconds);
  };

  // -- End the timer --
  const endTheTimer = () => {
    setTimeLeft(0);
  };

  return {timeLeft, startTheTimer, endTheTimer};
};

export default useTimer;