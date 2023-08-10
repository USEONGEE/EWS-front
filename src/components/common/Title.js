import React from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'

const MainName = styled.div`
  font-size: 3rem;
  cursor: pointer;
`

const SubName = styled.div`
  font-size: 1.5rem;
`

export default function Title() {

  const navigate = useNavigate()
  
  return (
    <>
      <MainName onClick={() => navigate('/')}>Insurance Risk</MainName>
      <SubName>고추잠자리</SubName>
    </>
  )
}
