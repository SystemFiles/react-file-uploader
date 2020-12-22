import React, { useCallback, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { useDropzone } from 'react-dropzone'
import { Grid, CircularProgress } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import UploadListItem from './UploadListItem'
import { v4 as uuid } from 'uuid'

// Styles
import './Upload.css'

function Upload (props) {
	// Component state
	const [ state, setState ] = useState({
		selectedFiles : []
	})

	// Saves selected files to state for upload
	const saveFiles = (files) => {
		if (state.selectedFiles.length <= 6 && state.selectedFiles.length + files.length <= 6) {
			setState((st) => ({
				selectedFiles : [ ...st.selectedFiles, ...files ]
			}))
		}
	}

	// Deletes a selected file from the list
	const deleteSelectedFile = (fileName) => {
		state.selectedFiles.filter((file) => file.name.includes(fileName)).map((filteredFile) => {
			let arr = state.selectedFiles
			let index = arr.indexOf(filteredFile)
			if (index !== -1) {
				arr.splice(index, 1)
				setState({
					selectedFiles : arr
				})
			}
		})
	}

	// Passes data up to App component for upload
	const handleUploadFiles = (e) => {
		// Use prop to upload
		if (state.selectedFiles.length === 0) {
			console.warn('No files selected for upload...')
			alert('Must select at least one file to upload!')
		} else {
			props.onUpload(state.selectedFiles)
			setState({ selectedFiles: [] })
		}
	}

	// Handle drag and drop of files on upload area
	const onDrop = useCallback(
		(files) => {
			saveFiles(files)
		},
		[ saveFiles ]
	)
	const { getRootProps, getInputProps } = useDropzone({ onDrop })

	// Set ref to access file input
	const fileUploaderRef = useRef(null)
	const handleBrowseClick = (e) => {
		// Open file select dialog
		e.preventDefault()
		e.stopPropagation()
		fileUploaderRef.current.click()
	}

	// Handles what happens after user is done with file select dialog
	const handleBrowseCompleted = (e) => {
		saveFiles(e.target.files)
	}

	return (
		<Grid item container justify='flex-start' alignContent='flex-start' className='Upload-Component'>
			<Grid item xs={12} sm={7} className='Upload'>
				<div className='Upload'>
					<div className='Upload-Container' {...getRootProps()}>
						<input hidden={true} {...getInputProps()} />
						<input
							type='file'
							id='files'
							ref={fileUploaderRef}
							style={{ display: 'none' }}
							onClick={(e) => {
								e.stopPropagation()
							}}
							onChange={handleBrowseCompleted}
							multiple
						/>
						<div className='Upload-Icon'>
							<FontAwesomeIcon className='svgIcon' icon={faUpload} />
						</div>
						<div className='Upload-Label'>
							<h2>Drag and Drop file</h2>
						</div>
					</div>
					<h2>Or</h2>
					<div className='Upload-Browse'>
						<a className='Upload-Button' onClick={handleBrowseClick} href='#'>
							Browse
						</a>
					</div>
				</div>
			</Grid>
			<Grid item xs={12} sm={5} className='Upload-List'>
				<div className='Upload-List-Container'>
					{state.selectedFiles.length === 0 ? (
						<div>
							<h2>No Files Selected</h2>
						</div>
					) : (
						state.selectedFiles.map((file) => (
							<UploadListItem key={uuid()} file={file} onClick={deleteSelectedFile} />
						))
					)}
				</div>
			</Grid>
			<Grid item xs={12} className='Upload-Submit-Container'>
				<button
					type='submit'
					disabled={props.isUploading || props.done || props.error}
					onClick={handleUploadFiles}>
					{props.isUploading ? (
						<CircularProgress size={24} className='fabProgress' />
					) : props.done ? props.error === false ? (
						<CheckIcon className='successCheck' />
					) : (
						<ErrorOutlineIcon className='errorIcon' />
					) : (
						'Upload Files!'
					)}
				</button>
			</Grid>
		</Grid>
	)
}

Upload.propTypes = {
	onUpload    : PropTypes.func,
	isUploading : PropTypes.bool,
	done        : PropTypes.bool,
	error       : PropTypes.bool
}

export default Upload
