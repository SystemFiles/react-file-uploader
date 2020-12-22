import React, { useState, useRef } from 'react'
import { Collapse, Grid } from '@material-ui/core'
import Upload from './components/Upload'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import FileCopyIcon from '@material-ui/icons/FileCopy'
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
		errorMessage  : '',
		showDetails   : false,
		shareLink     : ''
	})

	const [ linkCopied, setlinkCopied ] = useState(false)
	const [ clipboardCopyEnabled, setClipboardCopyEnabled ] = useState(true)

	const shareLinkFieldRef = useRef(null)
	const handleCopyLink = (e) => {
		if (window.isSecureContext) {
			console.log(`Copied to clipboard: ${shareLinkFieldRef.current.childNodes[0].data}`)
			navigator.clipboard.writeText(shareLinkFieldRef.current.childNodes[0].data)

			// Done copied link
			setlinkCopied(true)
		} else {
			if (clipboardCopyEnabled) {
				alert(
					'Due to a short-term security issue, we do not have access to your clipboard. You will need to manually highlight and copy the share link for the time being. Thank you :)'
				)
				console.log('Currently unavailable')
				setClipboardCopyEnabled(false)
			}
		}
	}

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
				setState({
					uploading     : false,
					doneUploading : true,
					showDetails   : true,
					error         : false,
					shareLink     : `${FILES_ENDPOINT}/${result.data.id}`
				})
				setTimeout(() => {
					setState({
						doneUploading : false,
						showDetails   : true,
						shareLink     : `${FILES_ENDPOINT}/${result.data.id}`
					})
				}, 2000)
			}
		} catch (err) {
			setState({
				uploading     : false,
				doneUploading : true,
				error         : true,
				errorMessage  : `Failed to upload files. Reason: ${err}`
			})
		}
	}

	return (
		<div className='container'>
			<Grid container spacing={0} justify='center' alignItems='center' alignContent='center'>
				<Grid className='titleContainer' item xs={10}>
					<h2>File Uploader</h2>
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
			<Grid
				className='uploadDetails'
				container
				spacing={0}
				justify='center'
				alignItems='center'
				alignContent='center'>
				<Grid item xs={11} md={10} lg={8} xl={6}>
					<Collapse in={state.showDetails}>
						<div className='uploadDetails-container'>
							<h2>Upload Complete</h2>
							<p>Use the following link to share and download your files</p>
							<Grid container>
								<Grid item xs={12}>
									<pre onClick={handleCopyLink} ref={shareLinkFieldRef}>
										{state.shareLink}
										<FileCopyIcon className='linkCopyIcon' />
									</pre>
								</Grid>
								<p>
									<span>
										** TIP: Click on the link field or copy icon to copy the link to your clipboard.
										**
									</span>
								</p>
							</Grid>
						</div>
					</Collapse>
				</Grid>
			</Grid>
			<Grid className='toast' container spacing={0} justify='center' alignItems='center' alignContent='center'>
				<Collapse in={state.error || linkCopied}>
					<Alert
						action={
							<IconButton
								aria-label='close'
								color='inherit'
								size='small'
								onClick={() => {
									setState({ error: false })
									setlinkCopied(false)
								}}>
								<CloseIcon fontSize='inherit' />
							</IconButton>
						}
						variant='filled'
						severity={!linkCopied ? 'error' : 'success'}>
						{!linkCopied ? state.errorMessage : 'Link copied to your clipboard!'}
					</Alert>
				</Collapse>
			</Grid>
		</div>
	)
}
