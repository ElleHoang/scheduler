import React, { useState } from "react"; // useState hook gives an array containing 2 variables: currently stored value, and function to set a new value

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  // important to provide default values when creating state
  const [student, setStudent] = useState(props.student || ""); // solution uses JS || operator which will eval to props.student is truthy. If props.student is undefined then it will use emtpy string
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
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
          <Button danger {/* your code goes here */}>Cancel</Button>
          <Button confirm {/* your code goes here */}>Save</Button>
        </section>
      </section>
    </main>
  );
}