export function getAppointmentsForDay(state, day) {
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

export function getInterviewersForDay(state, dayOf) {
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

export function getInterview(state, interview) {
  if (!interview) return null;
  let filteredInterview = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };
  return filteredInterview;
}
