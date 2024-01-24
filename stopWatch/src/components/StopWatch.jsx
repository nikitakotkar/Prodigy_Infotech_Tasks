
import styles from './Element.module.css';
import { useState ,  useEffect} from "react";


const StopWatch = () => {

   const [isRunning, setIsRunning] = useState(false);
   const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
   const [buttonColors, setButtonColors] = useState({
      start: '#3498db',
      stop: '#e74c3c',
      restart: '#2ecc71',
    });

    useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          const seconds = prevTime.seconds + 1;

          if (seconds === 60) {
            const minutes = prevTime.minutes + 1;

            if (minutes === 60) {
              return { hours: prevTime.hours + 1, minutes: 0, seconds: 0 };
            }

            return { ...prevTime, minutes, seconds: 0 };
          }

          return { ...prevTime, seconds };
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning]);


    const handleStart = () => {
         if(!isRunning){
            setIsRunning(true)
            setButtonColors({ ...buttonColors, start: '#2980b9' });
         }
    }

    const handleStop = () => {
          if(isRunning){
              setIsRunning(false)
              setButtonColors({ ...buttonColors, stop: '#c0392b' });
     }
    }

    const handleRestart = () => {
           setTime(0)
           setTime({ hours: 0, minutes: 0, seconds: 0 });
           setButtonColors({ ...buttonColors, restart: '#27ae60' });
    }


    const formatTime = (value) => (value < 10 ? `0${value}` : value);

    return(
      <div className={styles.stopWatchContainer}>
          <h1 className={styles.watchHeading}>Stop Watch </h1>
          <p className={styles.watchPara}>  {formatTime(time.hours)}:{formatTime(time.minutes)}:{formatTime(time.seconds)} </p>
          <button  className={styles.watchButton} onClick={handleStart} disabled={isRunning} style={{ backgroundColor: buttonColors.start }}>Start</button>
          <button  className={styles.watchButton} onClick={handleStop} disabled={!isRunning} style={{ backgroundColor: buttonColors.stop }}>Stop</button>
          <button  className={styles.watchButton} onClick={handleRestart} style={{ backgroundColor: buttonColors.restart }}>Restart</button>
      </div>
        
    );

} 

export default StopWatch;