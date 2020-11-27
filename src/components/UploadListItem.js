import React from 'react'
import PropTypes from 'prop-types'

// Styles
import './UploadListItem.css'
import { Grid } from '@material-ui/core'

function UploadListItem(props) {
    const { name, size } = props.file
    const format = name.trim().substring(name.length - 4, name.length)
    return (
        <div className="UploadItem">
            <Grid item xs={12} container justify="center" alignContent="center" alignItems="center">
                <Grid item container xs={8}>
                    <Grid item xs={11}>
                    <span style={{ float: 'left' }} className="UploadItem-Name">
                        {name.trim().substring(0, 16)} {name.length > 16 ? '... ' + format : null}
                    </span>
                    </Grid>
                    <Grid item xs={1}>
                    <span style={{ float: 'left' }} className="UploadItem-Size">
                        {Math.round(size / 1024 / 1024) + 1}mb
                    </span>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default UploadListItem
