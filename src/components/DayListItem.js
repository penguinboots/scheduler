import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  let dayClass = classNames(
    'day-list__item',
    {
      'day-list__item--selected': props.selected,
      'day-liste__item--full': props.spots === 0
    }
  )

  let formatSpots = (spots) => {
    let message = '';
    switch (spots) {
      case 0:
        message = 'no spots remaining';
        break;
      case 1:
        message = '1 spot remaining';
        break;
      default:
        message = `${spots} spots remaining`
    }
    return message;
  }


  return (
    <li
      data-testid="day"
      className={dayClass}
      onClick={props.setDay}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}