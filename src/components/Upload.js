import React, { useCallback, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { useDropzone } from 'react-dropzone'
import { Grid } from '@material-ui/core'
import UploadListItem from './UploadListItem'
import { v4 as uuid } from 'uuid'

// Styles
import './Upload.css'

function Upload() {

    // Component state
    const [state, setState] = useState({
        selectedFiles: []
    })

    // Handle drag and drop of files on upload area
    const onDrop = useCallback(files => {
        SaveFiles(files)
    }, [])
    const {getRootProps, getInputProps} = useDropzone({onDrop})

    // Set ref to access file input
    const fileUploaderRef = useRef(null);
    const handleBrowseClick = (e) => { // Open file select dialog
        e.preventDefault()
        e.stopPropagation()
        fileUploaderRef.current.click();
    }

    // Handles what happens after user is done with file select dialog
    const handleBrowseCompleted = (e) => {
        SaveFiles(e.target.files)
    }

    // Saves selected files to state for upload
    const SaveFiles = (files) => {
        if (state.selectedFiles.length <= 6 
            && state.selectedFiles.length + files.length <=6 ) {
            setState((st) => ({
                selectedFiles: [...st.selectedFiles, ...files]
            }))
        }
    }

    return (
        <Grid item container justify="flex-start" alignContent="flex-start" className="Upload-Component">
        <Grid item xs={12} sm={7} className="Upload">
        <div className="Upload">
            <div className='Upload-Container' {...getRootProps()}>
                <input hidden={true} {...getInputProps()} />
                <input type="file" id="files" ref={fileUploaderRef} 
                        style={{display: "none"}} 
                        onClick={(e) => {e.stopPropagation()}} 
                        onChange={handleBrowseCompleted} multiple />
                <div className="Upload-Icon">
                    <FontAwesomeIcon className="svgIcon" icon={faUpload} />
                </div>
                <div className="Upload-Label">
                    <h2>
                        Drag and Drop file
                    </h2>
                </div>
            </div>
            <h2>Or</h2>
            <div className="Upload-Browse">
                <a className="Upload-Button" onClick={handleBrowseClick} href="#">
                    Browse
                </a>
            </div>
        </div>
        </Grid>
        <Grid item xs={12} sm={5} className="Upload-List">
            <div className="Upload-List-Container">
                { state.selectedFiles.map((file) => (
                    <UploadListItem key={uuid()} file={file} /> 
                ))}
            </div>
        </Grid>
        </Grid>
    )
}

export default Upload
