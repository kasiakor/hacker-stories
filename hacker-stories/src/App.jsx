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
  return (
    <div>
      <h1>My car collection</h1>
      <Search />
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

const Search = () => {
  console.log("Search renders");
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    console.log(searchTerm);
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
      <div>{searchTerm}</div>
    </div>
  );
};

export default App;
