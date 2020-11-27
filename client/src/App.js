import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import Upload from './components/Upload'

// Styles
import './App.css'

export default function App() {

  const [ state, setState ] = useState({
    uploading: false,
    uploadSuccess: false
  })

  const uploadFilesToServer = (files) => {
    // TODO: implement
    setState({ uploading: true })
    setTimeout(() => {
      setState({ uploading: false, uploadSuccess: true })
      setTimeout(() => {
        setState({ uploadSuccess: false })
      }, 3000)
    }, 2000)
  }

  return (
    <div className="container">
      <Grid container spacing={0} justify="center" alignItems="center" alignContent="center" >
        <Grid className="titleContainer" item xs={10}>
          <h2>Simple File Share</h2>
        </Grid>
        <Grid className="uploadContainer" item xs={10}>
          <Upload onUpload={uploadFilesToServer} success={state.uploadSuccess} isUploading={state.uploading} />
        </Grid>
      </Grid>
    </div>
  );
}
