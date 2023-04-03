import { Grid, ImageList, ImageListItem, Typography } from '@mui/material'
import React from 'react'

const PostCard = ({ post }) => {
    return (
        <Grid 
            sx={{
                border: 1, 
                cursor: 'pointer',
                fontFamily: "Roboto, sans-serif",
                p: 3,
                borderColor: 'grey.200',
                '&:hover': {
                    bgcolor: 'grey.50'
                }
            }}
            item
        >
            <Typography>
                { post.message }
            </Typography>
            {
                post.selectedFiles ?
                <ImageList
                    variant="quilted"
                    cols={post.selectedFiles.length > 1 ? 2 : 0}>
                    {
                        post.selectedFiles.map((base64, index) => {
                            let rows = 1;
                            let cols = 1;
                            if(post.selectedFiles.length == 3 && index == 0) {
                                rows = 2;
                            }
                            return (
                                <ImageListItem 
                                    rows={rows}
                                    cols={cols} 
                                    sx={{ borderRadius: '20px', cursor: 'pointer' }} 
                                    key={base64}>
                                    <img 
                                        style={{ borderRadius: 20, cursor: 'pointer' }}
                                        src={base64}
                                        loading='lazy'>
                                    </img>
                                </ImageListItem>
                            )
                        })
                    }
                </ImageList> :
                <></>
            }
        </Grid>
    )
}

export default PostCard