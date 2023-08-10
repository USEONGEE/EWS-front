import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainPage from '../pages/MainPage'
import FileUploadingPage from '../pages/FileUploadingPage'
import FileListPage from '../pages/FIleListPage'

export default function Routers() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/file-uploading' element={<FileUploadingPage />} />
        <Route path='/files' element={<FileListPage/>} />
      </Routes>
    </>
  )
}
