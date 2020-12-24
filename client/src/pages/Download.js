import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DownloadProgress from '../components/DownloadProgress'
import axios from 'axios'
import FileDownload from 'js-file-download'
import { FILES_ENDPOINT } from '../config'

import './Download.css'

function Download () {
  const { id } = useParams()
  const [ downloading, setDownloading ] = useState(true)
  const [ error, setError ] = useState('')
  const processFile = async () => {
    try {
      const res = await axios({
        method       : 'GET',
        url          : `${FILES_ENDPOINT}/${id}`,
        responseType : 'blob'
      })

      if (res.status === 200 || res.status === 201) {
        setDownloading(false)
        FileDownload(res.data, `${id}.zip`)
      } else {
        setError(`Could not download file. Reason: ${res.data}`)
      }
    } catch (e) {
      setError(`Failed to download file. Reason: ${e} (most likely we could not find the files...)`)
    }
  }

  // Start download of file (only once)
  useEffect(() => processFile(), [])

  return (
    <div className='Download'>
      <h1>Processing Files</h1>
      {error && <p>{error}</p>}
      {downloading && !error && <DownloadProgress />}
      {!error && downloading && <p>Don&apos;t worry this process can sometimes take a while...</p>}
    </div>
  )
}

export default Download
