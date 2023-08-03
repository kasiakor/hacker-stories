/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import * as React from "react";

const App = () => {
  console.log("App renders");
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

  const [searchTerm, setSearchTerm] = React.useState("");

  // callback handler

  const handleSearch = (event) => {
    console.log(
      "event value passed by handler from child to parent:",
      event.target.value
    );
    setSearchTerm(event.target.value);
    console.log("search term from App", searchTerm);
  };

  return (
    <div>
      <h1>My car collection</h1>
      <Search onSearch={handleSearch} myTerm={searchTerm} />
      <hr />
      <List list={stories} />
    </div>
  );
};

const List = (props) => {
  console.log("List renders");
  return (
    <ul>
      {/* eslint-disable-next-line react/prop-types */}
      {props.list.map((item) => (
        <Item key={item.cardId} item={item} />
      ))}
      ;
    </ul>
  );
};

const Item = (props) => {
  console.log("Item renders");
  return (
    <li>
      {/* eslint-disable-next-line react/prop-types */}
      <span>{props.item.type}</span>
      {/* eslint-disable-next-line react/prop-types */}
      <span>{props.item.color} </span>
      {/* eslint-disable-next-line react/prop-types */}
      <span>{props.item.capacity}</span>
    </li>
  );
};

const Search = (props) => {
  console.log("Search renders");
  console.log("search term from Search", props.myTerm);

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={props.onSearch} />
    </div>
  );
};

export default App;
