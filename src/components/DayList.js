import React from "react";
import DayListItem from "./DayListItem";

// DayList component accepts 3 props:
// 1. An array of DAYS
// 2. The name of currently selected DAY
// 3. Function that can be used to set current day SETDAY

// pass data to each <DayListItem> within <DayList> component

export default function DayList(props) {
  
  // mock days data
  const days = [
    {
      id: 1,
      name: "Monday",
      spots: 2,
    },
    {
      id: 2,
      name: "Tuesday",
      spots: 5,
    },
    {
      id: 3,
      name: "Wednesday",
      spots: 0,
    },
  ];

  // dynamically create array of <DayListItem> component
  const parsedDays = days.map(day =>
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