import React, { useCallback, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import {useDropzone} from 'react-dropzone'

// Styles
import './Upload.css'

function Upload() {

    const [state, setState] = useState({
        files: [],
        uploading: false
    })

    const onDrop = useCallback(files => {
        SaveFiles(files)
    }, [])
    const {getRootProps, getInputProps} = useDropzone({onDrop})

    const fileUploaderRef = useRef(null);
    const handleBrowseClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        fileUploaderRef.current.click();
    }

    const handleBrowseCompleted = (e) => {
        SaveFiles(e.target.files)
    }

    const SaveFiles = (files) => {
        setState((st) => ({
            files: [...st.files, ...files]
        }))
    }

    return (
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
    )
}

export default Upload
