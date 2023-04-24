import axios from "axios";
const { useState, useEffect } = require("react");

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // set day in use state
  const setDay = day => setState({ ...state, day });

  // gather data from API server
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')])
      .then((all) => {
        setState(prev => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }))
      })
  }, [])

  // takes name of day, returns matching index in state.days
  function dayToIndex(day) {
    const daysOfWeek = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4
    }
    return daysOfWeek[day];
  }

  // make new days object with updated # spots (add num)
  function updateSpots(num) {
    const dayIndex = dayToIndex(state.day);

    const newDay = {
      ...state.days[dayIndex],
      spots: state.days[dayIndex].spots + num
    }
    const days = [...state.days];
    days[dayIndex] = newDay;

    return days;
  }

  // takes interview object and adds it to appointments state at specified time (id)
  // makes HTTP request, updates local state
  function bookInterview(id, interview, updating) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    let days = updateSpots(0);

    if (updating) {
      days = updateSpots(-1);
    }

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => setState({ ...state, appointments, days }))
  }
  

  // replaces interview with null given id
  // makes HTTP request, updates local state
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    let days = updateSpots(1);

    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments, days }))
  }

  return { state, setDay, bookInterview, cancelInterview };
}