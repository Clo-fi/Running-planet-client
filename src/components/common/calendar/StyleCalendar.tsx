import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export const CalendarBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyleCalendar = styled(Calendar)`
  width: 88vw;
  border: none;
  border-top-left-radius: 2vh;
  border-top-right-radius: 2vh;
  height: 10.5vh;
  background-color: lightgray;

  .react-calendar__navigation {
    border-top-left-radius: 2vh;
    border-top-right-radius: 2vh;
    display: flex;
    height: 5.5vh;
    background-color: lightgray;
    margin-bottom: 0;
    justify-content: space-evenly;
  }

  .react-calendar__navigation__label {
    font-size: 2.3vh;
    font-weight: 500;
  }

  .react-calendar__navigation button {
    width: 5vw;
    background-color: none;
  }

  .react-calendar__navigation button:disabled {
    background-color: #e8e8e8;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e8e8e8;
  }

  .react-calendar__viewContainer {
    background-color: white;
    border-radius: 2vh;
    border: 1px solid black;
    height: 48vh;
  }

  .react-calendar__month-view > div > div {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin: 2vw;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    font-weight: 250;
    font-size: 1.5vh;
    display: flex;
    justify-content: space-evenly;
    text-transform : none;
    margin-bottom: 1vh;
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: none;
    width: 12vw;
  }

  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 0;
  }

  .react-calendar__month-view__days {
    margin-top : 1vh;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
  }

  .circle-tile {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: white;
    width: 12vw;
    box-sizing: border-box;
    padding: 0;
    
    }

  .circle-tile abbr {
    border-radius: 50%;
    border: none;
    background-color: lightgrey;
    width: 6.5vw;
    height: 6.5vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .react-calendar__month-view__days__day--neighboringMonth abbr {
    background-color: white;
    border: 1px solid lightgray;
  }

  .react-calendar__tile--now abbr {
  }

  .circle-tile:hover {
    background-color: transparent;
  }

  .circle-tile:active {
    background-color: transparent;
  }

  .react-calendar__tile--hasActive {
    color: #ffffff;
    background-color: transparent;
  }

  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background-color: transparent;
  }

  .react-calendar__tile--active {
    color: #ffffff;
    background-color: transparent;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background-color: transparent;
  }

  // 추가된 스타일
  .circle-tile div {
    margin-top: 0.2vh;
    font-size: 1.3vh;
    color: black;
    height: 1.5vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
