import { useState, useEffect} from "react";
import axios from "axios";

export default function useApplicationData() {
 
  // combined states into state object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}, // direct child of state obj
    interviewers: {}
  });

  // setDay function that updates state w/ new day
  const setDay = (day) => setState({ ...state, day });


  // call API to GET data and set state
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
    .then((all) => {
      setState((prev) => (
        { ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}
      ));
    }).catch(err => console.log(err));
  }, []);

  // Changes local state when booking an interview
  const bookInterview = (id, interview) => {
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
      });
  }

  // cancelInterview function find appointment slot and set it's interview data to null
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

  return { state, setDay, bookInterview, cancelInterview };
}