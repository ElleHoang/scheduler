import React from "react";

// component takes in 3 attributes (name:String - name of day, spots:Number - num of spots remaining, selected:Boolean - true/false declaring day is selected)
// component takes one action as props (setDay:Function - accepts name of day eg. "Monday", "Tuesday")
// need to update DayListItem component to reflect this after building stories
export default function DayListItem(props) {
  return (
    <li> {/* rep. entire day item */}
      <h2 className="text--regular">DayName</h2> {/* should display day name */}
      <h3 className="text--light">X sports remaining</h3> {/* should display the spots remaining for a day */}
    </li>
  );
}