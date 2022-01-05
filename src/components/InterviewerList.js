import React from "react";

import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

import PropTypes from "prop-types";

export default function InterviewerList(props) {

  // InterviewerList receives three props:
  // 1. interviewers:array - array of interviewer objects
  // 2. setInterviewer:function - function that accepts interviewer id. Will be passed down to InterviewerListItem
  // 3. interviewer:number - num that rep id of currently selected interviewer
  
  // build component that returns array of InterviewerListItem components
  // each item in list will need unique key prop
  const parsedInterviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    );
  });
  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        { parsedInterviewers }
      </ul>
    </section>
  ); 
}

InterviewerList.propTypes = {
  //value: PropTypes.number,
  interviewers: PropTypes.array.isRequired
};