
import React from "react";
import { useState, useCallback} from "react";
import {
    TextField,
  } from "@shopify/polaris";
  
function SearchBar({username, setUsername}){
  
   const handleChange = useCallback((newValue) => setValue(newValue), []);
   
   const [value, setValue] = useState('');
   setUsername(value)

    return(
        <div className="searchbar">
        <p>
        <TextField
          label="Search Customer"
          value={value}
          onChange={(handleChange)}
          onPaste={(handleChange)}
          onKeyUp={(handleChange)}
          autoComplete="off"
          />
        </p>
        </div>
        
    );
}
  
export default SearchBar;