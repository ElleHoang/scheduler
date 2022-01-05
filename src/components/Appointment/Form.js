import React, { useState } from "react"; // useState hook gives an array containing 2 variables: currently stored value, and function to set a new value

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

//*** FORM COMPONENT ***//
export default function Form(props) {
  //console.log(props);
  // important to provide default values when creating state
  const [student, setStudent] = useState(props.student || ""); // solution uses JS || operator which will eval to props.student is truthy. If props.student is undefined then it will use emtpy string
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  // track and change error state
  const [error, setError] = useState("");

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

  /*** Validation Function ***/
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      {/* prevent default onSubmit bug that try & submit form when press [Enter] or [Return] */}
      <section className="appointment__validation">{error}</section>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <InterviewerList 
          interviewers={props.interviewers}
          //value={toString(interviewer)}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()}>Cancel</Button>
          {/*<Button confirm onClick={() => props.onSave(student, interviewer)}>Save</Button>*/}
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
}