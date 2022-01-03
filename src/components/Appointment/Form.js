import React, { useState } from "react"; // useState hook gives an array containing 2 variables: currently stored value, and function to set a new value

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

//*** FORM COMPONENT ***//
export default function Form(props) {
  // important to provide default values when creating state
  const [student, setStudent] = useState(props.student || ""); // solution uses JS || operator which will eval to props.student is truthy. If props.student is undefined then it will use emtpy string
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  /*** Inputs Reset Function  ***/
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  }

  /*** Cancel Function: calls reset() and props.onCancel ***/
  const cancel = () => {
    reset();
    props.onCancel();
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      {/* prevent default onSubmit bug that try & subnit form when press [Enter] or [Return] */}
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList 
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()}>Cancel</Button>
          <Button confirm onClick={() => props.onSave(student, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  );
}