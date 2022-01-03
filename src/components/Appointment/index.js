import React from "react";

import "components/Appointment/styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

// mode constants
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  // when props.interview contains value, then we want to pass useVisualMode the SHOW mode
  // if props.interview is empty then should pass EMPTY
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // ensure that child component (Appointment) can call the action w/ correct data
  // pass function to "Form" component.
  const save = (name, interviewer) => {
    transition(SAVING);
    console.log(name, interviewer);
    const interview = {
      student: name,
      interviewer: interviewer
    };
    // console.log("HERE!!!!!!");
    // console.log(name);
    // console.log(interview);
    
    // call props.bookInterview function w/ appointment id and interview as arguments from w/in save function
    //console.log(`APPOINTMENT: ${props}`)
    Promise.resolve(props.bookInterview(props.id, interview))
      .then(() => transition(SHOW))
      .catch(err => console.log(`ERROR: ${err}`));
  };

  // Delete Interview
  const del = () => {
    transition(DELETING);

    Promise.resolve(props.cancelInterview(props.id))
      .then(() => transition(EMPTY));
  }
  // console.log(props.interview.student);
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY &&
        <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          //apptID={props.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        /*
          Form should capture "name" and "interviewer" and pass them to props.onSave as arguments
          then create new interview obj to be passed to props.bookInterview
        */
        <Form
          //student={props.student}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && (
        <Status message="Saving" />
      )}
      {mode === DELETING && (
        <Status message= "Deleting" />
      )}
      {mode === CONFIRM && (
        <Confirm
          //apptID={props.id}
          message= "Are you sure you would like to delete?"
          onCancel={() => back()}
          onConfirm={del}
        />
      )}
    </article>
  );
}