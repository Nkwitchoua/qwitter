import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react'

const SearchFriends = () => {
  return (
    <Paper
        component="form"
        variant='outlined'
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%", borderRadius: "20px" }}
        >
        <IconButton disabled={true} sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
        </IconButton>
        <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Friends"
            inputProps={{ 'aria-label': 'search friends' }}
        />
    </Paper>
  )
}

export default SearchFriends