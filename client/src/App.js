import React, { useState } from 'react'
import { Collapse, Grid } from '@material-ui/core'
import Upload from './components/Upload'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { FILES_ENDPOINT } from './config'
import axios from 'axios'

// Styles
import './App.css'

export default function App () {
	const [ state, setState ] = useState({
		uploading     : false,
		doneUploading : false,
		error         : false,
		errorMessage  : ''
	})

	const uploadFilesToServer = async (files) => {
		setState({ uploading: true })

		// Build data for transmission
		let formData = new FormData()
		for (let i = 0; i < files.length; i++) {
			const file = files[i]
			formData.append('fileField', file)
		}

		// Make request to upload
		try {
			let result = await axios({
				method  : 'POST',
				url     : FILES_ENDPOINT,
				data    : formData,
				headers : { 'Content-Type': 'multipart/form-data' }
			})

			if (result.status === 200) {
				setState({ uploading: false, doneUploading: true })
				setTimeout(() => {
					setState({ doneUploading: false })
				}, 2000)
			}
		} catch (err) {
			console.log(`Error Occured when uploading file: ${err}`)
			setState({
				uploading     : false,
				doneUploading : true,
				error         : true,
				errorMessage  : 'Failed to upload files. Reason: A file was too large!'
			})
		}
	}

	return (
		<div className='container'>
			<Grid container spacing={0} justify='center' alignItems='center' alignContent='center'>
				<Grid className='titleContainer' item xs={10}>
					<h2>Simple File Share</h2>
				</Grid>
				<Grid className='uploadContainer' item xs={11} md={10} lg={8} xl={6}>
					<Upload
						onUpload={uploadFilesToServer}
						done={state.doneUploading}
						error={state.error}
						isUploading={state.uploading}
					/>
				</Grid>
			</Grid>
			<Grid className='toast' container spacing={0} justify='center' alignItems='center' alignContent='center'>
				<Collapse in={state.error}>
					<Alert
						action={
							<IconButton
								aria-label='close'
								color='inherit'
								size='small'
								onClick={() => {
									setState({ error: false })
								}}>
								<CloseIcon fontSize='inherit' />
							</IconButton>
						}
						variant='filled'
						severity='error'>
						{state.errorMessage}
					</Alert>
				</Collapse>
			</Grid>
		</div>
	)
}
