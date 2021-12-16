import React, { useState, useEffect} from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";
import "components/Appointment";
import Appointment from "./Appointment/index"
import { getAppointmentsForDay, getInterview } from "helpers/selectors";
/*
//mock days data
const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];
*/

/*
// test data for appointments
const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
  }
];
*/

export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  //console.log(day);
  //when call setDay action, it changes day state. When day state change, <Application renders and pass new day to <DayList>.
  // const [days, setDays] = useState([]);
  // defining days as an array
  // days array pass as prop to DayList component is empty (no days render in sidebar)
  // next: make request and call setDays method w/ data we retrieve from API

  // combined states into state object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // setDay function that updates state w/ new day
  const setDay = (day) => setState({ ...state, day });

  /*
  // setDays function that update the days state
  const setDays = (days) => setState(prev => ({ ...prev, days }));
  */

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  const schedule = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
    .then((all) => {
      /** test request by loggin values of state.interviewers **/
      //console.log(all[2].data);
      //const [days, appointments, interviewers] = all;
        setState((prev) => (
          { ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}
        ));
    })
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
          /*
          <DayList> renders and passes new props to <DayListItem> causing update to selected visual state
          */
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
