import React, { useState, useEffect} from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";
import "components/Appointment";
import Appointment from "./Appointment/index"
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
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
    appointments: {}, // direct child of state obj
    interviewers: {}
  });

  // setDay function that updates state w/ new day
  const setDay = (day) => setState({ ...state, day });

  /*
  // setDays function that update the days state
  const setDays = (days) => setState(prev => ({ ...prev, days }));
  */

  // call API to GET data and set state
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
    .then((all) => {
      /** test request by loggin values of state.interviewers **/
      // console.log(all[2].data)
      //const [days, appointments, interviewers] = all;
        setState((prev) => (
          { ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}
        ));
    }).catch(err => console.log(err));
  }, []);

  // Array of appointment for a certain day
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  //Array of interviewers for a certain day
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  // function will log values that we pass to it for now.
  // in future, it will allow us to change local state when we book interview
  const bookInterview = (id, interview) => {
    //console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // base on use case, must return api call for promise to complete book interview call
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(response => {
        setState({
          ...state,
          appointments
        });
        //console.log(`-------Appointments: ${appointments}`);
      });
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.delete(`/api/appointments/${id}`)
      .then(response => {
        setState({
          ...state,
          appointments
        });
      });
  }

  const schedule = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

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
            bookInterview={bookInterview}
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
