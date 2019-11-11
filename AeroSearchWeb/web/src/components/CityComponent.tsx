import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface FilmOptionType {
    title: string;
    year: number;
  }

export default function CityComponent() {
  return (
    <Autocomplete
      options={top100Films}
      getOptionLabel={(option: FilmOptionType) => option.title}
      style={{ width: 300 }}
      renderInput={(params: any) => (
        <TextField {...params} label="Combo box" variant="outlined" fullWidth />
      )}
    />
  );
}

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 }
]