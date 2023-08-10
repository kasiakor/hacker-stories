/* eslint-disable react/prop-types */
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

  const [searchTerm, setSearchTerm] = React.useState(
    localStorage.getItem("search") ?? "react"
  );

  const filteredStories = stories.filter((story) =>
    story.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // callback handler

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  React.useEffect(() => {
    localStorage.setItem("search", searchTerm);
  }, [searchTerm]);

  return (
    <div>
      <h1>My car collection</h1>
      <InputWithLabel
        id="search"
        label="Search"
        onSearch={handleSearch}
        value={searchTerm}
      />
      <hr />
      <List list={filteredStories} />
    </div>
  );
};

const List = ({ list }) => {
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
//type is set as default parameter, if it is not passed from the parent
const InputWithLabel = ({ id, label, value, type = "text", onSearch }) => {
  console.log("type is:", type);
  return (
    <>
      <label htmlFor={id}>{label}:</label>
      <input id={id} type={type} value={value} onChange={onSearch} />
    </>
  );
};

export default App;
