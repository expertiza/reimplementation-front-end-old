import React from 'react';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import {InfoIcon} from "./Icons";

function InfoToolTip(props) {
  const tooltip = <Tooltip id={`tooltip-${props.id}`}>{props.info}</Tooltip>;

  return (
    <OverlayTrigger
      placement={props.placement || "right"}
      delay={{show: 150, hide: 300}}
      overlay={tooltip}
    >
      <span><InfoIcon/></span>
    </OverlayTrigger>
  );
}

export default InfoToolTip;
