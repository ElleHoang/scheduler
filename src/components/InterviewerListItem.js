import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const interviewerClass = classNames("interviewers__item", {
    " interviewers__item--selected": props.selected
  });

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}> {/* rep. interviewer item */}
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      /> {/* interviewer img */}
      {props.selected && props.name} {/* conditionally render interviewer's name using short circuit evaluation */}
    </li>
  );
}