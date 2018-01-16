import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  color: #50a882;
  z-index: 10;
  h2,
  h4 {
    text-stroke: 2px #101010;
  }
  h2 {
    font-size: 2em;
  }
  h4 {
    margin-bottom: 0;
    font-size: 1.25em;
  }
`

const Numbers = ({ ip, bankAccount, ssn }) => (
  <Wrapper>
    <h2>{ip}</h2>
    <h2>{bankAccount}</h2>
    <h4>{ssn}</h4>
  </Wrapper>
)

export default Numbers
