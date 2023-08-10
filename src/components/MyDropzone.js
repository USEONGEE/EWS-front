import React, { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { styled } from 'styled-components';

const baseStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const Container = styled.div`
  margin-top: 2rem;
`


function MyDropzone({setFile}) {
  const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles)
        setFile(acceptedFiles)
  }, [])

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({onDrop});

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  return (
    <Container>
      <div {...getRootProps({ style })}>
        <input type='file' name='imgfile' {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </Container>
  );
}
export default MyDropzone;