import React from 'react'
import { styled } from 'styled-components'

export default function Option({ item, handleCheck, checked, disabled }) {
  return (
    <Container>
      <Options>{item}</Options>
      <Checkbox
        type='checkbox'
        onChange={(e) => handleCheck(e, item)}
        checked={checked}
        disabled={disabled}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Options = styled.span`
  font-size: 1.4rem;
  font-weight: bold;
`

const Checkbox = styled.input`
  height: 1.5rem;
  width: 1.5rem;
`