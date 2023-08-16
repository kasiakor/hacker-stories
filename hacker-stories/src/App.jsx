/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import * as React from "react";
import beachImage from "../src/assets/image_beach.jpg";

const App = () => {
  const initialStories = [
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

  const [currentRadio, setCurrentRadio] = React.useState();

  const [checked, setChecked] = React.useState(false);

  const [selected, setSelected] = React.useState();

  const [sliderValue, setValue] = React.useState("");

  const [count, setCount] = React.useState(0);

  const [toggle, setToggle] = React.useState(true);

  const [stories, setStories] = React.useState(initialStories);

  const filteredStories = stories.filter((story) =>
    story.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // event handler to remove the story
  const handleRemoveStory = (item) => {
    const newStories = stories.filter((story) => item.cardId !== story.cardId);
    setStories(newStories);
  };

  // callback handler

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  React.useEffect(() => {
    localStorage.setItem("search", searchTerm);
  }, [searchTerm]);

  const handleClick = () => {
    setCount(count + 1);
    console.log("count", count);
  };

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

  return (
    <div>
      <h1>My car collection</h1>
      <InputWithLabel
        id="search"
        onSearch={handleSearch}
        value={searchTerm}
        isFocused
      >
        <strong>Search:</strong>
      </InputWithLabel>
      <hr />
      <InputWithLabel
        id="search"
        onSearch={handleSearch}
        value={searchTerm}
        isFocused
      >
        <strong>Search2:</strong>
      </InputWithLabel>
      <hr />
      <List list={filteredStories} onRemoveItem={handleRemoveStory} />
      <hr />
      <ButtonComponent onClick={handleClick} count={count} />
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
    </div>
  );
};

const ImageComponent = ({ onClick, toggle }) => {
  return (
    <div>
      <button onClick={onClick}>Toggle image</button>
      <hr />
      {toggle && <img alt="beach" src={beachImage} height={150} width={150} />}
    </div>
  );
};

const ButtonComponent = ({ count, onClick }) => {
  return (
    <>
      <button onClick={onClick}>Click me</button>
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

const List = ({ list, onRemoveItem }) => {
  return (
    <ul>
      {/* eslint-disable-next-line react/prop-types */}
      {list.map((item) => (
        <Item key={item.cardId} item={item} onRemoveItem={onRemoveItem} />
      ))}
    </ul>
  );
};

const Item = ({ item, onRemoveItem }) => {
  // const handleRemoveItem = () => {
  //   onRemoveItem(item);
  //   console.log("removed item", item);
  // };

  return (
    <>
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
      <button
        type="button"
        onClick={() => {
          onRemoveItem(item);
          console.log("removed item", item.type);
        }}
      >
        Remove
      </button>
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
      // console.log("current", inputRef.current);
      // console.log("current value", inputRef.current.value);
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onSearch}
      />
    </>
  );
};

export default App;
