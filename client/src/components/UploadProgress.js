import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import PropTypes from 'prop-types'

import './UploadProgress.css'

function UploadProgress (props) {
  const { progress } = props

  return (
    <div className='Upload-Progress'>
      <LinearProgress className='Upload-Progress-Bar' value={progress} variant='determinate' />
      <span className='Uplaod-Progress-'>{progress}%</span>
    </div>
  )
}

UploadProgress.propTypes = {
  progress : PropTypes.number
}

export default UploadProgress
