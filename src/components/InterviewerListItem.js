import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

// InterviewerListItem receive props: ( id: num - id of interviewer, name:string - name of interviewer, avatar: url - url to img of interviewer )
// InterviewerListItme need prop to know if selected ( selected:boolean - determines if interviewer is selected or not & display name & apply style of selected )
// InterviewerListItem receive function = setInterviewer ( setInterviewer:function - runs when InterviewerListItem is clicked. Receives interviewer's id as argument. sets selected interviewer )
export default function InterviererListItem(props) {
  let interviewerClass = classNames("interviewers__item", {
    " interviewers__item--selected": props.selected
  });

  return (
    <li className={interviewerClass} onClick={() => props.setInterviewer(props.id)}> {/* rep. interviewer item */}
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      /> {/* interviewer img */}
      {props.selected && props.name} {/* conditionally render interviewer's name using short circuit evaluation */}
    </li>
  );
}