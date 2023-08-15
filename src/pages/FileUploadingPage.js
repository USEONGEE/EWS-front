import React, { useState } from 'react'
import { styled } from 'styled-components'
import instance from '../api/axios'
import requests from '../api/requests'
import Title from '../components/common/Title'
import { PageContainer } from '../components/styles/Common'

export default function FileUploadingPage() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null)
  const [content, setContent] = useState('')

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }
  const handleContentChange = (e) => {
    setContent(e.target.value)
  }

  const handleFileChange= (e) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0])
  }

  /**
   * 파일을 보내는 비동기 함수
   */
  const sendData = async () => {
    if (file !== null && content.trim().length !== 0 && title.trim().length !== 0) {
      let formData = new FormData();
      formData.append("title", title)
      formData.append("content", content)
      formData.append("imgfile", file)
      formData.append('enctype', 'multipart/form-data')

      let axiosConfig = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }

      let response = await instance.post(requests.postFile, formData, axiosConfig) // 요청

      setTitle('');
      setContent('');
      setFile(null);

      alert("파일 등록이 완료되었습니다.");

      return response.status
    }
    return
  }

  console.log(file)

  return (
    <PageContainer>
      <Title />
        <TitleInput
          type='text'
          name='title'
          value={title}
          onChange={handleTitleChange} />
        <input
          type='file'
          name='imgfile'
          onChange={handleFileChange} />
        <ContentInput
          type='text'
          name='content'
          value={content}
          onChange={handleContentChange} />
        <button onClick={() => sendData()}>전송</button>

    </PageContainer>
  )
}

const TitleInput = styled.input`
  font-size: 4rem;
  margin-top: 6rem;
  width: 60%;
  height: 5rem;
  font-size: 15px;
  border: 0;
  border-radius: 15px;
  outline: none;
  padding-left: 10px;
  background-color: rgb(233, 233, 233);`

const ContentInput = styled.input`
  margin-top: 2rem;
  width: 60%;
  height: 5rem;
  font-size: 15px;
  border: 0;
  border-radius: 15px;
  outline: none;
  padding-left: 10px;
  background-color: rgb(233, 233, 233);`

const SubmitForm = styled.input`
  position: relative;
  border: none;
  display: inline-block;
  padding: 15px 30px;
  border-radius: 15px;
  font-family: "paybooc-Light", sans-serif;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  font-weight: 600;
  transition: 0.25s;
  background-color: aliceblue;
  color: #1e6b7b;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  ${({ outline }) =>
    outline &&
    `
    border: 3px solid aliceblue;
    background: transparent;

    &:hover {
      color: aliceblue;
      background: #1e6b7b;
    }
  `}
`

const Form = styled.form`
  width:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
