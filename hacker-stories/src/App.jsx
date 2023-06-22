// eslint-disable-next-line no-unused-vars
import * as React from "react";

const App = () => {
  const stories = [
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
  return (
    <div>
      <h1>My car collection</h1>
      <Search />
      <hr />
      <List list={stories} />
    </div>
  );
};

const List = (props) => (
  <ul>
    {/* eslint-disable-next-line react/prop-types */}
    {props.list.map((car) => (
      <li key={car.cardId}>
        <span>{car.type}, </span>
        <span>{car.color}, </span>
        <span>{car.capacity}</span>
      </li>
    ))}
  </ul>
);

const Search = () => {
  const handleChange = (event) => {
    console.log(event);
    console.log(event.target.value);
  };

  const handleBlur = (event) => {
    console.log(event);
    console.log(event.target.value);
  };
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input
        id="search"
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default App;
