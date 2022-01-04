import React from "react";

import "components/Appointment/styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

// mode constants
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  // when props.interview contains value, then we want to pass useVisualMode the SHOW mode
  // if props.interview is empty then should pass EMPTY
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // ensure that child component (Appointment) can call the action w/ correct data
  // pass function to "Form" component.
  const save = (name, interviewer) => {
    transition(SAVING, true);
    //console.log(name, interviewer);
    const interview = {
      student: name,
      interviewer: interviewer
    };
    
    // call props.bookInterview function w/ appointment id and interview as arguments from w/in save function
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(err => transition(ERROR_SAVE, true)); // when transition from SAVING to ERROR_SAVE, replace mode in history rather than pushing it on to end
  };

  // Delete Interview
  const destroy = (event) => {
    transition(DELETING, true);

    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(err => transition(ERROR_DELETE, true));
  }
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY &&
        <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
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
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer}
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
          message= "Are you sure you would like to delete?"
          onCancel={() => back()}
          onConfirm={destroy}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message= "Fail to save appointment."
          onClose={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message= "Fail to cancel apppointment."
          onClose={() => back()}
        />
      )}
    </article>
  );
}