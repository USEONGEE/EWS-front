import React from 'react'
import { PageContainer } from '../components/styles/Common'
import { styled } from 'styled-components'
import Title from '../components/common/Title'
import ChoiceButton from '../components/mainpage/ChoiceButton'
import { useNavigate } from 'react-router-dom'

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top:7rem;
  width: 60%;
`

export default function MainPage() {

  const navigate = useNavigate()

  return (
    <PageContainer>
      <Title />

      <ButtonContainer>
        <ChoiceButton
          category={"파일 업로딩"}
          handleClick={() => {
            navigate('/file-uploading')
          }
          } />
        <ChoiceButton
          category={"데이터 분석"}
          handleClick={() => {
            navigate('/files')
          }
          } />
      </ButtonContainer>
    </PageContainer>
  )
}
