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

export function getInterview(state, interview) {
  if (!interview) return null;
  let filteredInterview = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };
  return filteredInterview;
}