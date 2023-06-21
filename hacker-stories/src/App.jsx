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

const App = () => (
  <div>
    <h1>My car collection</h1>
    <Search />
    <hr />
    <List />
  </div>
);

const List = () => (
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

const Search = () => (
  <div>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text" />
  </div>
);

export default App;
