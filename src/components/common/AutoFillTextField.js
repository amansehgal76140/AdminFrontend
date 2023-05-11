import { useState } from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel } from "@mui/material";

export default function AutoFillTextField({ emails, emailTo, setEmailTo }) {
  const handleAutocompleteChange = (event, value) => {
    console.log(value);
    setEmailTo(value);
  };

  return (
    <FormControl variant="standard" fullWidth>
      <Autocomplete
        multiple
        freeSolo
        id="tags-filled"
        options={emails.map((supplier) => supplier.email)}
        value={emailTo}
        onChange={handleAutocompleteChange}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <>
            <TextField {...params} variant="outlined" placeholder="Add Email" />
          </>
        )}
      />
    </FormControl>
  );
}
