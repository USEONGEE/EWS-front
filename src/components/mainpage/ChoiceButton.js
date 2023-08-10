import React from 'react'
import { styled } from 'styled-components'

const Button = styled.button`
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  background: none;
  border: 3px solid black;
  border-radius: 5px;
  color: black;
  display: block;
  font-size: 1.6em;
  font-weight: bold;
  margin: 1em auto;
  padding: 3rem 3rem;
  position: relative;
  text-transform: uppercase;
  background-color: #E6E6E6;

  &:before,
  &:after {
    background: #fff;
    content: '';
    position: absolute;
    z-index: -1;
  }
  
  &::after {
    height: 0;
    left: 50%;
    top: 50%;
    width: 0;
  }

  &:hover {
    color: white;
    background-color: #4C4C4C;

    &:after {
      height: 100%;
      left: 0;
      top: 0;
      width: 100%;
    }
  }
`

export default function ChoiceButton({ category, handleClick }) {
  return (
    <>
      <Button
        onClick={() => handleClick()}>
        {category}
      </Button>
    </>
  )
}
