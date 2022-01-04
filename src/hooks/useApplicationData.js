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

  // updateSpots function update number of spots remaining for certain day
  // call update spots to get new days array inside bookinterview
  const updateSpots = function (state, appointments) {
    const index = state.days.findIndex((d) => d.name === state.day);
    const day = state.days[index];
  
    //const day = state.days.find((d) => d.name === state.day);
    console.log(day);
    let spots = 0
    for (const id of day.appointments) {
      const appointment = appointments[id];
      if(!appointment.interview) {
        spots++;
      }
    }
    
    const newDay = {...day, spots};
    // const updatedDays = state.days.map ((d) => d.name === state.day ? newDay : d);
    const updatedDays = [...state.days]
    updatedDays[index] = newDay; // replace day at index 
    
    return updatedDays;
  };
  
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
    const appointments = { // new appointments
      ...state.appointments,
      [id]: appointment
    };
    
    // base on use case, must return api call for promise to complete book interview call
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(response => {
        const days = updateSpots(state, appointments);
        setState({
          ...state,
          days, //days => get spots from days function.
          appointments
        });
      });
  };

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
        const days = updateSpots(state, appointments);
        setState({
          ...state,
          days,
          appointments
        });
      });
  };

  return { state, setDay, bookInterview, cancelInterview };
};