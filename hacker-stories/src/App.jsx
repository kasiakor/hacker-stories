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

  const [currentRadio, setCurrentRadio] = React.useState();

  const [checked, setChecked] = React.useState(false);

  const [selected, setSelected] = React.useState();

  const [sliderValue, setValue] = React.useState("");

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

  const handleClick = () => {
    console.log("hello");
  };

  const handleRadio = (event) => {
    setCurrentRadio(event.target.value);
  };

  const handleSelection = (event) => {
    setSelected(event.target.value);
    console.log("selected value from handler", selected);
  };

  React.useEffect(() => {
    console.log("selected value from effect", selected);
    // Do what it needs to be done after updating state here
  }, [selected]);

  React.useEffect(() => {
    console.log("current checked radio button", currentRadio);
    // Do what it needs to be done after updating state here
  }, [currentRadio]);

  const handleCheckbox = () => {
    setChecked(!checked);
    console.log("checkbox value", checked);
  };

  const handleSlider = (event) => {
    setValue(event.target.value);
    console.log("slider value", sliderValue);
  };

  React.useEffect(() => {
    console.log("current slider value", sliderValue);
    // Do what it needs to be done after updating state here
  }, [sliderValue]);

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
      <List list={filteredStories} />
      <hr />
      <ButtonComponent onClick={handleClick} />
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
    </div>
  );
};

const ButtonComponent = ({ onClick }) => {
  return <button onClick={onClick}>Click me</button>;
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
      console.log("current", inputRef.current);
      console.log("current value", inputRef.current.value);
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
