import {
  Autocomplete,
  CircularProgress,
  Container,
  InputAdornment,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { getCities } from '../services/api';
import useDebounce from '../hooks/useDebounce';
import { useDispatch } from 'react-redux';
import { updateCity } from '../app/store/weather';

const useStyles = makeStyles(theme => ({
  container: {
    padding: '1rem',
    display: 'flex !important',
    justifyContent: 'center',
  },
}));

const SearchBar = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [city, setCity] = useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const debounce = useDebounce();
  const dispatch = useDispatch();

  useEffect(() => {
    if (inputValue.length < 2) return;
    try {
      setLoading(true);
      debounce(
        () =>
          getCities(inputValue).then(data =>
            setOptions(
              data.map(o => ({
                label: `${o.LocalizedName} (${o.Country.ID})`,
                ...o,
              }))
            )
          ),
        700
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [inputValue]);

  const handleOnChange = (e, value) => {
    setCity(value);
    if (value != null)
      dispatch(updateCity({ Key: value.Key, name: value.LocalizedName }));
  };

  return (
    <Container fixed className={classes.container}>
      <Autocomplete
        open={isOpen}
        onClose={() => setIsOpen(false)}
        options={options}
        value={city}
        onChange={handleOnChange}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          setIsOpen(true);
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        sx={{ width: 400, backgroundColor: 'white' }}
        renderInput={params => (
          <TextField
            {...params}
            label="Search..."
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </Container>
  );
};

export default SearchBar;
