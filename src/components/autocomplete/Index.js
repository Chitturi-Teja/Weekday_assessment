import React from "react";
import { MenuItem, Autocomplete, TextField } from "@mui/material";
import "./Index.css";
import { filteredOptions } from "../../constants/Constants";


export default function AutoComplete({ selectedItems,setItems, multiple=false, width,placeholder,options, groupBy=false }) {
  return (
    <div className="select-container">
      {(selectedItems?.length>0 || selectedItems?.label?.length>0) && <p className="autocomplete-title">{placeholder}</p>}
      <Autocomplete
        multiple={multiple}
        className="autocomplete"
        style={{ minWidth: width}}
        onChange={(e, value) => {
         
          setItems(value)
        }}
        options={multiple? filteredOptions(selectedItems,options):options}
        getOptionLabel={(option) => option.label}
        groupBy={groupBy ? (option) => option.group : undefined}
        disableCloseOnSelect
        renderOption={(props, option, { selected }) => (
          <MenuItem key={option.key} value={option.label} {...props} className="menu-item">
            {option.label}
          </MenuItem>
        )}
        renderInput={(params) => {
          return (
            <TextField
              sx={{ "& input::placeholder": { fontSize: "13px" } }}
              {...params}
              placeholder={
                params.InputProps.startAdornment?.length > 0 ? "" : placeholder
              }
            />
          );
        }}
      />
    </div>
  );
}
