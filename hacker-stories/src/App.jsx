// eslint-disable-next-line no-unused-vars
import * as React from "react";

const list = [
  {
    color: "purple",
    type: "minivan",
    capacity: 7,
    cardId: 1,
  },
  {
    color: "red",
    type: "sedan",
    capacity: 4,
    cardId: 2,
  },
  {
    color: "blue",
    type: "cabrio",
    capacity: 2,
    cardId: 3,
  },
];

function App() {
  return (
    <div>
      <h1>My car collection</h1>
      <hr />
      <List />
    </div>
  );
}

function List() {
  return (
    <ul>
      {list.map((car) => (
        <li key={car.cardId}>
          <span>{car.type}, </span>
          <span>{car.color}, </span>
          <span>{car.capacity}</span>
        </li>
      ))}
    </ul>
  );
}

export default App;
