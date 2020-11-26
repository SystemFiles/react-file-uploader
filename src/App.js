import React from 'react'
import { Grid } from '@material-ui/core'
import Upload from './components/Upload'

// Styles
import './App.css'

export default function App() {
  return (
    <div className="container">
      <Grid container spacing={0} justify="center" alignItems="center" alignContent="center" >
        <Grid className="titleContainer" item xs={10}>
          <h2>File Uploader</h2>
        </Grid>
        <Grid className="uploadContainer" item xs={10}>
          <Upload />
        </Grid>
      </Grid>
    </div>
  );
}
