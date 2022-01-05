import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  // function takes spots conditon and return appropriate text
  const formatSpots = () => {
    if (props.spots === 1) {
      return `${props.spots} spot remaining`;
    }
    
    if (props.spots > 1) {
      return `${props.spots} spots remaining`;
    }
    
    return `no spots remaining`;
  }

  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)}
      selected={props.selected} data-testid="day"
    > {/* rep. entire day item */}
    {/* 1. setDay was passed down via props all way from Application component */}
      <h2 className="text--regular">{props.name}</h2> {/* should display day name */}
      <h3 className="text--light">{formatSpots(props.spots)}</h3> {/* should display the spots remaining for a day */}
    </li>
  );
}

// DayListItem SCSS code generate 3 CSS classes for use with <li> element
// .day-list__item { ... }
// .day-list__item--selected { ... }
// .day-list__item--full. { ... }