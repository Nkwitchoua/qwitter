import { Button, Grid, Container, Icon, IconButton, Typography, Box, Input, InputLabel, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
//import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, getPosts } from '../actions/posts';
import ImageIcon from '@mui/icons-material/Image';
import GifBoxIcon from '@mui/icons-material/GifBox';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { ReactDOM } from 'react';

const PostForm = () => {
    const [ postData, setPostData ] = useState({
        message: "",
        date: null,
        selectedFiles: []
    });

    const form = document.querySelector('#post-form');
    const dispatch = useDispatch();

    const handlePostForm = (e) => {
        setPostData({
            ...postData,
            message: e.target.textContent
        });
    }

    const handleFileUpload = async (e) => {
        const files = e.target.files;

        if(!files) return;

        for(let i = 0; i < files.length; i++) {
            const base64 = await getBase64(files[i]);
            const postFiles = postData.selectedFiles;
            postFiles.push(base64);
            setPostData({
                ...postData,
                selectedFiles: postFiles
            });
        }
    }

    const removeImage = (key) => {
        const images = postData.selectedFiles.slice();
        images.splice(key, 1);
        setPostData({
            ...postData,
            selectedFiles: images
        });
    }

    const submitPost = () => {
        dispatch(createPost(postData));
        setPostData({
            message: '',
            selectedFiles: []
        })
    }

    const getBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    })

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'grey.200', px: 0 }}>
            <Container sx={{borderBottom: 1, borderColor: "grey.200"}}>
                <Typography 
                    variant='h5' 
                    fontWeight="bold" 
                    sx={{ textAlign: 'left', py: 3}}>
                    Home
                </Typography>
            </Container>
            
            <Container>
                <Box>

                </Box>

                <Box>
                    <Box 
                        contentEditable
                        id='post-form'
                        onInput={(e) => handlePostForm(e)}
                        sx={{
                            minHeight: 100, 
                            outline: "none", 
                            borderBottom: 1, 
                            borderColor: "grey.200",
                            fontSize: 20,
                            fontFamily: "Roboto, sans-serif",
                            display: 'flex',
                            alignContent: 'center',
                            "&:empty": {
                                lineHeight: "auto"
                            }
                        }}>
                    </Box>
                    <ImageList
                        variant="quilted"
                        cols={postData.selectedFiles.length > 1 ? 2 : 0}>
                        {
                            postData.selectedFiles.map((base64, index) => {
                                let rows = 1;
                                let cols = 1;
                                if(postData.selectedFiles.length == 3 && index == 0) {
                                    rows = 2;
                                }
                                return (
                                    <ImageListItem 
                                        rows={rows}
                                        cols={cols} 
                                        sx={{ borderRadius: 20, cursor: 'pointer' }} 
                                        key={index}>
                                        <ImageListItemBar
                                            sx={{
                                                background:
                                                    'transparent',
                                            }}
                                            position='top'
                                            actionPosition="left"
                                            actionIcon={
                                                <IconButton 
                                                    onClick={() => removeImage(index)}
                                                    color='white'>
                                                    <RemoveCircleIcon/>
                                                </IconButton>
                                            }>
                                        </ImageListItemBar>
                                        <img 
                                            style={{ borderRadius: 20 }}
                                            src={base64}
                                            loading='lazy'>
                                        </img>
                                    </ImageListItem>
                                )
                            })
                        }
                    </ImageList>

                    <Box sx={{ 
                            display: "flex", 
                            justifyContent: "space-between", 
                            flexDirection: "row", 
                            py: 1
                        }}>
                        <Box>
                            <IconButton >
                                    <input 
                                        id='file-input' 
                                        multiple
                                        accept="image/png, image/jpeg"
                                        type='file' 
                                        style={{ display: "none" }}
                                        onChange={(e) => handleFileUpload(e)}>
                                    </input>
                                <InputLabel htmlFor='file-input' sx={{ height: 24, cursor: 'pointer' }}>
                                    <ImageIcon color='primary'/>
                                </InputLabel>
                            </IconButton>

                            <IconButton>
                                <GifBoxIcon color='primary'/>
                            </IconButton>

                            <IconButton>
                                <EmojiEmotionsIcon color='primary'/>
                            </IconButton>

                            <IconButton>
                                <PendingActionsIcon color='primary'/>
                            </IconButton>
                        </Box>
                        <Box>
                            <Button 
                                disabled={ postData.message === ''} 
                                variant="contained" 
                                sx={{ borderRadius: '9999px'}}
                                onClick={() => submitPost()}>
                                Tweet
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default PostForm