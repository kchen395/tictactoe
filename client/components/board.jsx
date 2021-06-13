import React from "react";

export default function Board(props) {
  const borderPicker = {
    0: "square",
    1: "square border-v",
    2: "square",
    3: "square border-h",
    4: "square border-v border-h",
    5: "square border-h",
    6: "square",
    7: "square border-v",
    8: "square"
  };
  const square = i => (
    <div
      key={"square" + i}
      className={borderPicker[i]}
      onClick={() => props.handleClick(i)}
    >
      {props.moves[i]}
    </div>
  );

  const squares = [];
  for (let i = 0; i < 3; i++) {
    let row = [];
    for (let j = 0; j < 3; j++) {
      row.push(square(j + i * 3));
    }

    squares.push(
      <div key={"row" + i} className="row justify-content-center">
        {row}
      </div>
    );
  }

  return <div className="mt-2">{squares}</div>;
}
