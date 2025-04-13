import React, { useState, useEffect, useRef } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

const PomodoroTimer = () => {
  const PROMODORO = "Pomodoro";
  const SHORT_BREAK = "Short Break";
  const LONG_BREAK = "Long Break";

  // Set the initial time to 25 minutes (in seconds)
  const initialTime = 25 * 60;
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [activeTab, setActiveTab] = useState(PROMODORO);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Update the timer when activeTab has changed completely
    setTimerByActiveTab();
  }, [activeTab]);

  // Function to start the timer
  const startTimer = () => {
    if (!isActive) {
      setIsActive(true);
    }
  };

  // Function to pause the timer
  const pauseTimer = () => {
    setIsActive(false);
  };

  // Function to set the timer based on the active tab
  const setTimerByActiveTab = () => {
    switch (activeTab) {
      case PROMODORO:
        setTime(25 * 60);
        break;
      case SHORT_BREAK:
        setTime(5 * 60);
        break;
      case LONG_BREAK:
        setTime(15 * 60);
        break;
      default:
        break;
    }
  };

  // Function to reset the timer back to the initial value
  const resetTimer = () => {
    setIsActive(false);
    setTimerByActiveTab();
  };

  // Function to change the active tab and set the time accordingly
  const changeActiveTab = (tab) => {
    setActiveTab(tab);
    setIsActive(false);
  };

  // useEffect to handle the interval for the timer
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          // If the time reaches zero, stop the timer
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);
            setIsActive(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    // Clear the interval when component unmounts or when timer stops
    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  // Helper function to format seconds into mm:ss format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  return (
    <div style={styles.container}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#ccffff",
          borderRadius: "8px",
          padding: "20px",
          width: "35%",
          margin: "0 auto",
          alignItems: "center",
          "& > *": {
            m: 1,
          },
        }}
      >
        <h1>Pomodoro Timer</h1>
        <ButtonGroup size="large" aria-label="Pomodoro Timer">
          <Button
            key="one"
            onClick={() => changeActiveTab(PROMODORO)}
            variant={activeTab === PROMODORO ? "contained" : "outlined"}
          >
            Pomodoro
          </Button>
          <Button
            key="two"
            onClick={() => changeActiveTab(SHORT_BREAK)}
            variant={activeTab === SHORT_BREAK ? "contained" : "outlined"}
          >
            Short Break
          </Button>
          <Button
            key="three"
            onClick={() => changeActiveTab(LONG_BREAK)}
            variant={activeTab === LONG_BREAK ? "contained" : "outlined"}
          >
            Long Break
          </Button>
        </ButtonGroup>
        <div style={styles.timerDisplay}>{formatTime(time)}</div>
        <div style={styles.buttonContainer}>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              color="success"
              onClick={startTimer}
              disabled={isActive || time === 0}
            >
              Start
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={pauseTimer}
              disabled={!isActive}
            >
              Pause
            </Button>
            <Button variant="outlined" onClick={resetTimer}>
              Reset
            </Button>
          </Stack>
        </div>
      </Box>
    </div>
  );
};

// Simple styling object
const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "Arial, sans-serif",
  },
  timerDisplay: {
    fontSize: "100px",
    margin: "20px",
    fontWeight: "bold",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
};

export default PomodoroTimer;
