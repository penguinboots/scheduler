// return array of appointments for given day
function getAppointmentsForDay(state, day) {
  let appts = [];
  let apptIDs = [];
  for (const oneDay of state.days) {
    if (oneDay.name === day) {
      apptIDs = oneDay.appointments;
    }
  }
  for (const id of apptIDs) {
    appts.push(state.appointments[id]);
  }

  return appts;
}

// return array of interviewers for given day
function getInterviewersForDay(state, dayOf) {
  const filteredDays = state.days.filter(day => day.name === dayOf);
  if (state.days.length === 0 | filteredDays.length === 0) {
    return [];
  }

  let interviewerIDs = filteredDays[0].interviewers;

  let interviewers = [];
  for (const intID of interviewerIDs) {
    interviewers.push(state.interviewers[intID]);
  }
  return interviewers;
}

// return new interview object with interviewer as object instead of id 
function getInterview(state, interview) {
  if (!interview) return null;
  let filteredInterview = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };
  return filteredInterview;
}

export { getAppointmentsForDay, getInterviewersForDay, getInterview }