import React from "react";

import "components/Appointment/styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";

// mode constants
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {
  // when props.interview contains value, then we want to pass useVisualMode the SHOW mode
  // if props.interview is empty then should pass EMPTY
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // ensure that child component (Appointment) can call the action w/ correct data
  // pass function to "Form" component.
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer: interviewer
    };
    // console.log("HERE!!!!!!");
    // console.log(name);
    // console.log(interview);
    
    transition(SAVING);
    // call props.bookInterview function w/ appointment id and interview as arguments from w/in save function
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      });
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY &&
        <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        /*
          Form should capture "name" and "interviewer" and pass them to props.onSave as arguments
          then create new interview obj to be passed to props.bookInterview
        */
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && (
        <Status message='Saving' />
      )}
    </article>
  );
}