export function getAppointmentsForDay(state, day) {
  // 3. If there's no appoinment on given day, days data will be empty. Should return empty array
  if (!state.appointments || !state.days) {
    return [];
  }
  // 1. find obj in state.days array who's name matches the provided day
  const apptArrDay = state.days.filter((obj) => obj.name === day);
  if (apptArrDay.length === 0) {
    return [];
  }

  // 2. iterate through appt array for given day, comparing where it's id matches id of states.appointments and return that value
  // return array of appts for that day
  return apptArrDay[0].appointments.map((id) => state.appointments[id]);
}

export function getInterview(state, interview) {
  // function will return object that contains interview data if it's passed an object that contains an "interviewer".
  if (interview && interview.interviewer) {
    const interviewer = state.interviewers[interview.interviewer];
    return {...interview, interviewer};
  }
  //Otherwise, function should return "null"
  return null;
}