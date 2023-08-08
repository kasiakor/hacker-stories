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

  const [searchTerm, setSearchTerm] = React.useState(
    localStorage.getItem("search") ?? "react"
  );

  const filteredStories = stories.filter((story) =>
    story.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // callback handler

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // localstorage
  };

  React.useEffect(() => {
    localStorage.setItem("search", searchTerm);
    console.log("effect search", searchTerm);
  }, [searchTerm]);

  return (
    <div>
      <h1>My car collection</h1>
      <Search onSearch={handleSearch} myTerm={searchTerm} />
      <hr />
      <List list={filteredStories} />
    </div>
  );
};

const List = ({ list }) => {
  console.log("List after filter", list);
  return (
    <ul>
      {/* eslint-disable-next-line react/prop-types */}
      {list.map((item) => (
        <Item key={item.cardId} item={item} />
      ))}
    </ul>
  );
};

const Item = ({ item }) => {
  console.log("Item rendered", item);
  return (
    <li>
      {/* eslint-disable-next-line react/prop-types */}
      <span>{item.type}</span>
      <br />
      {/* eslint-disable-next-line react/prop-types */}
      <span>{item.color} </span>
      <br />
      {/* eslint-disable-next-line react/prop-types */}
      <span>{item.capacity}</span>
    </li>
  );
};

const Search = ({ myTerm, onSearch }) => {
  console.log("Search renders");
  console.log("search term from Search", myTerm);

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" value={myTerm} onChange={onSearch} />
    </div>
  );
};

export default App;
