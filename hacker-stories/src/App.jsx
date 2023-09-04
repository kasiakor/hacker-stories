/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import * as React from "react";
import axios from "axios";
import { useCallback } from "react";
import beachImage from "../src/assets/image_beach.jpg";
import "./App.css";
import { v4 as uuidv4 } from "react-uuid";

const API_ENDPOINT = "http://hn.algolia.com/api/v1/search?query=";

// usememo
const users = [
  { id: "a", name: "Robin" },
  { id: "b", name: "Dennis" },
];

const App = () => {
  console.log("App rendered");
  // usememo
  const [text, setText] = React.useState("");
  const [search, setSearch] = React.useState("");

  const [players, setPlayers] = React.useState([
    { id: "a", name: "Robin" },
    { id: "b", name: "Dennis" },
  ]);

  const handleText = (event) => {
    setText(event.target.value);
  };

  const handlememoSearch = () => {
    setSearch(text);
  };

  const filteredUsers = React.useMemo(
    () =>
      users.filter((user) => {
        console.log("Filter function is running ...");
        return user.name.toLowerCase().includes(search.toLowerCase());
      }),
    [search]
  );

  const [searchTerm, setSearchTerm] = React.useState(
    localStorage.getItem("search") ?? "react"
  );

  const [currentRadio, setCurrentRadio] = React.useState();

  const [checked, setChecked] = React.useState(false);

  const [selected, setSelected] = React.useState();

  const [sliderValue, setValue] = React.useState("");

  const [count, setCount] = React.useState(0);

  const [toggle, setToggle] = React.useState(true);

  const [state, setState] = React.useState({
    type: "",
    color: "",
    capacity: 0,
    objectId: 0,
  });

  const [url, setUrl] = React.useState();

  // reducer

  const storiesReducer = (state, action) => {
    switch (action.type) {
      case "STORIES_FETCH_INIT":
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case "STORIES_FETCH_SUCCESS":
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload,
        };

      case "STORIES_FETCH_FAILURE":
        return {
          ...state,
          isLoading: false,
          isError: true,
        };

      case "REMOVE_STORY":
        return {
          ...state,
          // state is an object now
          data: state.data.filter(
            (story) => action.payload.objectID !== story.objectID
          ),
        };

      default:
        throw new Error();
    }
  };
  const [stories, dispatchStories] = React.useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  const handleFetchStories = useCallback(async () => {
    dispatchStories({ type: "STORIES_FETCH_INIT" });

    try {
      const result = await axios.get(url);
      // respose object
      dispatchStories({
        type: "STORIES_FETCH_SUCCESS",
        payload: result.data.hits,
      });
    } catch {
      dispatchStories({ type: "STORIES_FETCH_FAILURE" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  // event handler to remove the story
  const handleRemoveStory = (item) => {
    dispatchStories({ type: "REMOVE_STORY", payload: item });
  };

  // callback handler
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  React.useEffect(() => {
    localStorage.setItem("search", searchTerm);
  }, [searchTerm]);

  const handleClick = useCallback(
    (event) => {
      setCount(count + 1);
    },
    [count]
  );

  const handleRadio = (event) => {
    setCurrentRadio(event.target.value);
  };

  const handleSelection = (event) => {
    setSelected(event.target.value);
  };

  React.useEffect(() => {
    // Do what it needs to be done after updating state here
  }, [selected]);

  React.useEffect(() => {
    // Do what it needs to be done after updating state here
  }, [currentRadio]);

  const handleCheckbox = () => {
    setChecked(!checked);
  };

  const handleSlider = (event) => {
    setValue(event.target.value);
  };

  React.useEffect(() => {
    // Do what it needs to be done after updating state here
  }, [sliderValue]);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  // add list item
  function handleChange(event) {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
    // track input field's state
  }

  function handleAdd() {
    // add item
    const newList = stories.concat(state);
    dispatchStories({ type: "SET_STORIES", payload: newList });
  }

  React.useEffect(() => {
    // list/stories/state {data: Array(20), isLoading: false, isError: false}
  }, [stories]);

  // sumbit search term
  const handleSearchSubmit = (event) => {
    setUrl(`${API_ENDPOINT}searchTerm`);
    event.preventDefault();
  };

  const handleAddPlayer = () => {
    setPlayers(players.concat({ id: uuidv4, name: text }));
  };

  return (
    <div className="container">
      <div>
        <input type="text" value={text} onChange={handleText} />
        <button
          type="button"
          onClick={handlememoSearch}
          className="button_small"
        >
          Search User
        </button>
        <button type="button" onClick={handleAddPlayer}>
          Add Player
        </button>
        <div>Players</div>
        <ListPlay listplay={players} />
        <div>Users</div>
        <ListMemo listmemo={filteredUsers} />
      </div>
      <h1 className="headline-primary">Hacker News</h1>
      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearch}
        onSearchSubmit={handleSearchSubmit}
      ></SearchForm>
      <hr />
      {stories.isError && <p>Ups sth went wrong</p>}
      {stories.isLoading ? (
        <p>data is loading ....</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}
      <hr />
      <hr />
      <div>
        <label>
          Car type
          <input
            type="text"
            name="type"
            value={state.type}
            onChange={handleChange}
          />
        </label>
        <label>
          Car color
          <input
            type="text"
            name="color"
            value={state.color}
            onChange={handleChange}
          />
        </label>
        <label>
          Car capacity
          <input
            type="number"
            name="capacity"
            value={state.capacity}
            onChange={handleChange}
            min={2}
          />
        </label>
        <label>
          Car id
          <input
            type="number"
            name="objectId"
            value={state.objectId}
            onChange={handleChange}
            min={8}
          />
        </label>
        <button type="button" onClick={handleAdd}>
          Add
        </button>
      </div>
      <hr />
      <ButtonComponent
        onClick={handleClick}
        count={count}
        className={"button_small"}
      />
      <hr />
      <RadioButtonComponent onChange={handleRadio} />
      <hr />
      <CheckboxComponent
        label="My value"
        value={checked}
        onChange={handleCheckbox}
      />
      <p>Is My Value checked? {checked.toString()}</p>
      <hr />
      <DropdownComponent onChange={handleSelection} />
      <hr />
      <SliderComponent onChange={handleSlider} value={sliderValue} />
      <hr />
      <ImageComponent onClick={handleToggle} toggle={toggle} />
      <hr />
      <RefComponent />
    </div>
  );
};

const ListMemo = ({ listmemo }) => {
  return (
    <ul>
      {listmemo.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

const ListItem = ({ item }) => {
  return <li>{item.name}</li>;
};

const SearchForm = ({ searchTerm, onSearchInput, onSearchSubmit }) => (
  <form onSubmit={onSearchSubmit} className="search-form">
    <InputWithLabel id="search" onSearch={onSearchInput} isFocused>
      <strong>Search:</strong>
    </InputWithLabel>
    <hr />
    <button
      type="submit"
      disabled={!searchTerm}
      className="button button_large"
    >
      Submit
    </button>
  </form>
);

const ImageComponent = ({ onClick, toggle }) => {
  return (
    <div>
      <button onClick={onClick}>Toggle image</button>
      <hr />
      {toggle && <img alt="beach" src={beachImage} height={150} width={150} />}
    </div>
  );
};

const ButtonComponent = ({ count, onClick, className }) => {
  return (
    <>
      <button onClick={onClick} className={className}>
        Click me
      </button>
      <div>{count}</div>
    </>
  );
};

const RadioButtonComponent = ({ onChange }) => {
  return (
    <>
      <fieldset>
        <legend>Please select your preferred contact method:</legend>
        <div onClick={onChange}>
          <input
            type="radio"
            id="contactChoice1"
            name="contact"
            value="email"
          />
          <label htmlFor="contactChoice1">Email</label>
          <input
            type="radio"
            id="contactChoice2"
            name="contact"
            value="phone"
          />
          <label htmlFor="contactChoice2">Phone</label>

          <input type="radio" id="contactChoice3" name="contact" value="mail" />
          <label htmlFor="contactChoice3">Mail</label>
        </div>
      </fieldset>
    </>
  );
};

const CheckboxComponent = ({ label, value, onChange }) => {
  return (
    <>
      <div>
        <label>
          {label}
          <input type="checkbox" value={value} onClick={onChange}></input>
        </label>
      </div>
    </>
  );
};

const DropdownComponent = ({ onChange }) => {
  return (
    <>
      <select onChange={onChange}>
        <option value="0">Select</option>
        <option value="8">text1</option>
        <option value="5">text2</option>
        <option value="4">text3</option>
      </select>
    </>
  );
};

const SliderComponent = ({ value, onChange }) => {
  return (
    <>
      <div>
        <p>Default range slider:</p>
        <input
          type="range"
          min="1"
          max="100"
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
};

const List = ({ list, onRemoveItem }) =>
  console.log("B: List") || (
    <ul>
      {/* eslint-disable-next-line react/prop-types */}
      {list.map((item) => (
        <Item key={item.objectId} item={item} onRemoveItem={onRemoveItem} />
      ))}
    </ul>
  );

const Item = ({ item, onRemoveItem }) => {
  return (
    <>
      <li className="item">
        <span style={{ width: "40%" }}>
          <a href={item.url}>{item.title}</a>
        </span>
        {/* eslint-disable-next-line react/prop-types */}
        <span style={{ width: "30%" }}>{item.author}</span>
        <br />
        {/* eslint-disable-next-line react/prop-types */}
        <span style={{ width: "10%" }}>{item.num_comments} </span>
        <br />
        {/* eslint-disable-next-line react/prop-types */}
        <span style={{ width: "10%" }}>{item.points}</span>
        <span style={{ width: "10%" }}>
          <button
            type="button"
            onClick={() => {
              onRemoveItem(item);
            }}
            className="button_small"
          >
            Remove
          </button>
        </span>
      </li>
    </>
  );
};
//type is set as default parameter, if it is not passed from the parent
const InputWithLabel = ({
  id,
  value,
  type = "text",
  onSearch,
  children,
  isFocused,
}) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id} className="label">
        {children}
      </label>
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onSearch}
        className="input"
      />
    </>
  );
};

const RefComponent = () => {
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <input
      ref={inputRef}
      placeholder="Type something"
      className="imput"
    ></input>
  );
};

const ListPlay = ({ listplay }) => {
  console.log("ListPlay rendered");
  return (
    <ul>
      {listplay.map((item) => (
        <ListPlayItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

const ListPlayItem = ({ item }) => {
  console.log("ListPlayItem rendered");

  return <li>{item.name}</li>;
};

export default App;
