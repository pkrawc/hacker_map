import React from "react"
import styled from "styled-components"

const Wrapper = styled.label`
  position: relative;
  display: block;
  z-index: 10;
  input {
    font-family: "Hack", monospace;
    padding: 1rem;
    background-color: #202020;
    border: 2px solid #295442;
    border-radius: 2px;
    box-shadow: 0 6px 1em rgba(0, 0, 0, 0.24);
    color: #50a882;
    font-size: 1.5em;
    outline: none;
    width: 100%;
    &::placeholder {
      color: #505050;
    }
  }
  .autocomplete-box {
    margin-top: 0.5rem;
    background-color: #202020;
    border-radius: 2px;
    color: #50a882;
    overflow: hidden;
    > span {
      display: block;
      padding: 1rem;
      cursor: pointer;
      transition: 200ms;
      &:hover {
        background: #101010;
      }
    }
  }
`

const SearchBar = ({
  inputValue,
  handleChange,
  suggestionsArray,
  handleAddressClick
}) => (
  <Wrapper>
    <input
      type="text"
      value={inputValue}
      onChange={handleChange}
      placeholder="Enter an address to begin"
    />
    {suggestionsArray.length > 0 && (
      <div className="autocomplete-box">
        {suggestionsArray.map(suggestion => (
          <span
            key={suggestion.place_id}
            onClick={e => handleAddressClick(suggestion.description)}
          >
            {suggestion.description}
          </span>
        ))}
      </div>
    )}
  </Wrapper>
)

export default SearchBar
