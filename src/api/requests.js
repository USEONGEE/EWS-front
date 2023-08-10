const requests = {
  postFile: "files/",
  getAllFiles: "files/",
  getFile: (id) => `files/${id}/`,
  deleteFile: (id) =>`files/${id}/`,
  getFileMetadata:(id) => `files/${id}/metadata/`,
  analyze: (id) =>`files/${id}/analyze/`
}

export default requests