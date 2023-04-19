import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import React, { useState } from "react";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // clear selections
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  }

  // if fields have selections or error messages displayed, return to empty form
  // if form is empty, perform onCancel function (exits form)
  const cancel = () => {
    if (student || interviewer || error) {
      reset();
      setError("");
      return;
    }
    reset();
    props.onCancel();
  }

  // validate that name input cannot be empty
  const validate = () => {
    if (!student) {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
    setError("");
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={props.student}
            type="text"
            value={student}
            placeholder='Enter Student Name'
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>
  );
}