import React from "react";

export default function Board(props) {
  const square = i => (
    <button className="square" onClick={() => props.handleClick(i)}>
      {props.moves[i]}
    </button>
  );

  return (
    <div>
      <div className="row">
        {square(0)}
        {square(1)}
        {square(2)}
      </div>
      <div className="row">
        {square(3)}
        {square(4)}
        {square(5)}
      </div>
      <div className="row">
        {square(6)}
        {square(7)}
        {square(8)}
      </div>
    </div>
  );
}
