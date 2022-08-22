import React, { MouseEventHandler } from "react";
import {Button} from "antd";

const AntButton = (props: {
  onClickFunction: MouseEventHandler<HTMLElement>
  , label: string}) => {
  return (
    <Button onClick={props.onClickFunction}>
      {props.label}
    </Button>)

}

export default AntButton;
