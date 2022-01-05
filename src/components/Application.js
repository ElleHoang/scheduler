import React from "react";

/*** CSS Component ***/
import "components/Application.scss";

/*** Components and Functions ***/
import DayList from "./DayList";
import "components/Appointment";
import Appointment from "./Appointment/index";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

/*** Custom Hook ***/
// Provide state and actions used to change state
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {

  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();
  
  // Array of appointment for a certain day
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // Array of interviewers for a certain day
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  // Schedule for appointment of certain day
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
