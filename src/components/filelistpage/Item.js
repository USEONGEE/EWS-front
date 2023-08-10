import React from 'react'
import deleteButtonImg from '../../assets/img/free-icon-delete-button-5974771.png'
import { styled } from 'styled-components'
export default function Item({ item, wantDelete, handleDelete, handleClickDetail, selectedFileId }) {
  return (
    <Container>
      {wantDelete ?
        <DeleteButton
          onClick={() => handleDelete(item.pk)}
        >
          <DeleteImg src={deleteButtonImg} alt='delete button' />
        </DeleteButton> : null}
      <File
        backgroundColor={selectedFileId === item.pk ? 'gray' : null}
        onClick={() => handleClickDetail(item.pk)}>
        <h2>대제목: {item.fields.title}</h2>
        <h3>파일 세부내용: {item.fields.cntent}</h3>
        <h3>파일명: {item.fields.imgfile}</h3>
      </File>
    </Container>
  )
}

const Container = styled.section`
  display: flex;
  align-items: center;
  width:100%;
`

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  margin-right: 1rem;
  height: 2rem;
  width: 3rem;
  cursor: pointer;
  transition: height 0.3s ease, width 0.3s ease;
  
  &:hover{
    height:2.5rem;
    width:3.75rem;
  }
`

const DeleteImg = styled.img`
  height: 100%;
  width: 100%;
`

const File = styled.button`
  display: flex;
  flex-direction: column;
  border: 2px solid #dbdbdb;
  background-color: ${(props) => (props.backgroundColor || 'transparent')};
  width: 100%;
  margin-bottom: 0.5rem;
  transition: background-color 0.3s ease;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
`