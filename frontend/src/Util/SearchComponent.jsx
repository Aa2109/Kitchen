import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doSearch } from '../State/Search/Action';

const SearchComponent = () => {
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();
  
  // Retrieve search results and loading status from Redux store
  const { results, loading, error } = useSelector((state) => state.search);

  const handleSearch = () => {
    if (keyword) {
      const jwt = localStorage.getItem('jwt');
      dispatch(doSearch(keyword, jwt));
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Food and Restaurant Search
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </Grid>
      </Grid>

      {error && <Typography color="error">{error}</Typography>}

      <Typography variant="h6" gutterBottom>
        Results:
      </Typography>
      <ul>
        {results && results.items && results.items.map((item) => (
          <li key={item.id}>{item.name}</li> // Render food items
        ))}
        {results && results.restaurants && results.restaurants.map((restaurant) => (
          <li key={restaurant.id}>{restaurant.name}</li> // Render restaurants
        ))}
      </ul>
    </Container>
  );
}
export default SearchComponent;
