import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // creates interview object, calls bookInterview
  function save(student, interviewer) {
    const interview = {
      student: student,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview, true)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  // creates interview object, calls bookInterview without changing spots remaining
  function saveEdit(student, interviewer) {
    const interview = {
      student: student,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview, false)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  function remove() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment" data-testid="appointment" >
      <Header time={props.time} />
      {mode === SHOW &&
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(DELETE)}
          onEdit={() => transition(EDIT)}
        />}
      {mode === EMPTY &&
        <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />}
      {mode === SAVING &&
        <Status message="Saving..."/>}
      {mode === DELETING &&
        <Status message="Deleting..."/>}
      {mode === DELETE &&
        <Confirm
          onConfirm={remove}
          onCancel={back}
          message="Are you sure you would like to delete?"
        />}
      {mode === EDIT &&
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={saveEdit}
        />}
      {mode === ERROR_SAVE &&
        <Error
          message="Save could not be completed."
          onClose={back}
        />}
      {mode === ERROR_DELETE &&
        <Error
          message="Delete could not be completed."
          onClose={back}
        />}
    </article>
  );
}