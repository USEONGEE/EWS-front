import React, { useEffect, useState } from 'react'
import Title from '../components/common/Title'
import { PageContainer } from '../components/styles/Common'
import instance from '../api/axios'
import requests from '../api/requests'
import { styled } from 'styled-components'
import Item from '../components/filelistpage/Item'
import Option from '../components/filelistpage/Option'
import ResultModal from '../components/filelistpage/ResultModal'

export default function FileListPage() {

  const [files, setFiles] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [wantDelete, setwantDelete] = useState(false);

  const [checkedFeatures, setCheckedFeatures] = useState([])
  const [checkedTargets, setCheckedTargets] = useState([])
  const [checkedTech, setCheckedTech] = useState([])
  const [selectedFileId, setSelectedFIleId] = useState(null)

  const [useModeal, setUseModeal] = useState(false)
  const [result, setResult] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await instance.get(requests.getAllFiles);
        if (response.status === 200) {
          setFiles(response.data);
        }
      } catch (error) {
        alert("전체 파일 로드에 에러가 발생했습니다. 관리자에게 문의하세요");
      }

    }
    fetchData();
  }, [])

  // 데이터 분석 요청을 보내는 함수
  const sendData = async () => {
    try {
      if (!(checkedFeatures.length > 0 && checkedTargets.length > 0)) {
        alert("Features, Target을 1개 이상 선택하세요.");
        return;
      }

      setUseModeal(true);

      let formData = new FormData();
      formData.append("features", checkedFeatures);
      formData.append("targets", checkedTargets);

      let axiosConfig = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
      const response = await instance.post(requests.analyze(selectedFileId), formData, axiosConfig);
      if (response.status === 200) {
        console.log(response.data)
        setResult(response.data);
      }
    } catch (error) {
      alert("데이터 분석 처리 요청에 에러가 발생했습니다. 관리자에게 문의하세요");
    }

  }

  // 상세 정보를 넘겨주는 함수
  const handleClickDetail = async (pk) => { // 테스트 함수
    try {
      const response = await instance.get(requests.getFileMetadata(pk));
      if (response.status === 200) {
        setMetadata(response.data);
        console.log(response.data);
        setSelectedFIleId(pk);
      }
    } catch (error) {
      alert("파일 메타데이터 로드에 에러가 발생했습니다. 관리자에게 문의하세요");
    }
  }

  const handleWantDelete = () => {
    setwantDelete(prev => !prev);
  }

  const handleDelete = async (pk) => {
    try {
      const response = await instance.delete(requests.deleteFile(pk));
      if (response.status === 200) {
        setFiles(files => files.filter(item => item.pk !== pk));
        setMetadata(null)
        selectedFileId(null)
      }
    } catch (error) {
    }
  }

  const handleCheckFeatures = (e, feature) => {
    if (e.target.checked) {
      setCheckedFeatures(prev => [...prev, feature])
    } else {
      setCheckedFeatures(prev => prev.filter(item => item !== feature))
    }
  }

  const handleCheckTargets = (e, target) => {
    if (e.target.checked) {
      setCheckedTargets(prev => [...prev, target])
    } else {
      setCheckedTargets(prev => prev.filter(item => item !== target))
    }
  }

  const handleCheckTechs = (e, tech) => {
    if (e.target.checked) {
      setCheckedTech(prev => [...prev, tech])
    } else {
      setCheckedTech(prev => prev.filter(item => item !== tech))
    }
  }

  return (
    <PageContainer>
      <Title />
      <ButtonContainer>
        <WantDeleteButton onClick={handleWantDelete}>{wantDelete ? '파일 삭제 버튼 가리기' : `파일 삭제 버튼 보기`}</WantDeleteButton>
        <h2></h2>
        {!!selectedFileId ? <SendButton onClick={() => sendData()}>데이터 분석 요청</SendButton> : null}
      </ButtonContainer>
      <DataContainer>
        <ItemContainer>
          <h1>데이터 목록</h1>
          {!files ? null : files.map((item, index) => (
            <Item
              key={index}
              item={item}
              wantDelete={wantDelete}
              handleDelete={handleDelete}
              handleClickDetail={handleClickDetail}
              selectedFileId={selectedFileId}
            />))}
        </ItemContainer>

        <ItemContainer>
          {
            !!selectedFileId ?
              <>
                <h1>Features 선택 </h1>
                {!metadata?.column ? null : metadata?.column.map((item, index) => (
                  <Option
                    key={index}
                    item={item}
                    handleCheck={handleCheckFeatures} />
                ))}

                <h1>Target 선택 </h1>
                {!metadata?.column ? null : metadata?.column.map((item, index) => (
                  <Option
                    key={index}
                    item={item}
                    handleCheck={handleCheckTargets} />
                ))}

                <h1>분석 기법 선택 </h1>
                {!metadata?.tech ? null : metadata?.tech.map((item, index) => (
                  <Option
                    key={index}
                    item={item}
                    handleCheck={handleCheckTechs}
                    checked={true}
                    disabled={true} />
                ))}
                <h1></h1>
              </> :
              <h1>데이터를 골라주세요</h1>
          }

        </ItemContainer>
      </DataContainer>

      {useModeal ?
        <ResultModal
          setUseModal={setUseModeal}
          result={result}
          setResult={setResult}
        /> :
        null}
    </PageContainer>
  )
}

const ItemContainer = styled.div` 
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  overflow: scroll;
  overflow-x: hidden;
  padding: 1rem;
`

const DataContainer = styled.div`
  flex-direction: row;
  width:60%;
  height:70vh;
  display: flex;
  border: 1px solid #DBDBDB;
  overflow: hidden;
  margin-top: 0.5rem;
`

const ButtonContainer = styled.div`
  display: flex;
  width:60%;
  margin-top: 2rem;
  justify-content: space-between;
`

const WantDeleteButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #DBDBDB;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;/* 트랜지션 설정 */
  color: black;
  font-weight: bold;
  &:hover {
    background-color: #B0B0B0;
    color: white;
  }
`

const SendButton = styled.button`
padding: 10px 20px;
  font-size: 16px;
  background-color: #DBDBDB;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;/* 트랜지션 설정 */
  color: black;
  font-weight: bold;
  &:hover {
    background-color: #B0B0B0;
    color: white;
  }
`
