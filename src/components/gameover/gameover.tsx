import React from "react";

import "./gameover.scss";

export interface IGameover {
  show: boolean;
}

export default function Gameover(props: IGameover) {
  const showHideClassName = props.show
    ? "gameover display-block"
    : "gameover display-none";

  return (
    <div className={showHideClassName}>
      <h3>Gameover</h3>
    </div>
  );
}
