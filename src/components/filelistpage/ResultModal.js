import React from 'react'
import { styled } from 'styled-components'

export default function ResultModal({ setUseModal, reuslt }) {
  return (
    <Container>
      <CloseButton onClick={() => setUseModal(false)}>x</CloseButton>
      <PostContainer>
        <Title>결과</Title>
        <GapContainer />
        {!!reuslt ?
          reuslt :
          <>
            <h1>분석 중...</h1>
            <h2>URL창에서 결과를 다운로드할 수 있습니다.</h2>
          </>}
      </PostContainer>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  background-color: yellow;
  left: 0%;
  top: 0%;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 알파 값이 0.3으로 설정하여 살짝 어둡게 투명하게 만듦 */
  z-index: 999;
`
const CloseButton = styled.button`
  position: fixed;
  color: white;
  font-size: 2rem;
  background-color: transparent;
  border: none;
  left: 98%;
  top: 2%;
`

const PostContainer = styled.div`
  display: flex;
  position: absolute;
  left:50%;
  top:50%;
  transform: translate(-50%, -50%);
  height: 90%;
  width: 30%;
  background-color: white;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h1`
  margin-top: 1.5rem;
`

const GapContainer = styled.div`
  width: 100%;
  height: 1px;
  background-color: #dbdbdb
`