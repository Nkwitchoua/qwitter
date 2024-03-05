import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { searchUsers } from '../../actions/messages';

const SearchFriends = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleInput = (event) => {
    const val = event.target.value;
    
    if(val) {
      setQuery(val);

      console.log("query in component", query);

      dispatch(searchUsers(val));
    }
  }

  return (
    <Paper
        component="form"
        variant='outlined'
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%", borderRadius: "20px", marginBottom: "10px" }}
        >
        <IconButton disabled={true} sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
        </IconButton>
        <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Friends"
            inputProps={{ 'aria-label': 'search friends' }}
            // value={query}
            onInput={(event) => handleInput(event)}
        />
    </Paper>
  )
}

export default SearchFriends