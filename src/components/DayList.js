import React from "react";
import DayListItem from "./DayListItem";

// pass data to each <DayListItem> within <DayList> component
export default function DayList(props) {
  // dynamically create array of <DayListItem> component
  const parsedDays = props.days.map(day =>
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.value}
      setDay={props.onChange}
    />
  );
  
  return (
    <ul>
      { parsedDays }
    </ul>
  );
}