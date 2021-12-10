import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

// component takes in 3 attributes (name:String - name of day, spots:Number - num of spots remaining, selected:Boolean - true/false declaring day is selected)
// component takes one action as props (setDay:Function - accepts name of day eg. "Monday", "Tuesday")
// need to update DayListItem component to reflect this after building stories
export default function DayListItem(props) {
  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}> {/* rep. entire day item */}
      <h2 className="text--regular">{props.name}</h2> {/* should display day name */}
      <h3 className="text--light">{props.spots} spots remaining</h3> {/* should display the spots remaining for a day */}
    </li>
  );
}

// DayListItem SCSS code generate 3 CSS classes for use with <li> element
// .day-list__item { ... }
// .day-list__item--selected { ... }
// .day-list__item--full. { ... }