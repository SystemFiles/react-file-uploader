import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import PropTypes from 'prop-types'

import './DownloadProgress.css'

function DownloadProgress () {
  return (
    <div className='Upload-Progress'>
      <LinearProgress className='Upload-Progress-Bar' variant='indeterminate' />
    </div>
  )
}

DownloadProgress.propTypes = {
  progress : PropTypes.number
}

export default DownloadProgress
