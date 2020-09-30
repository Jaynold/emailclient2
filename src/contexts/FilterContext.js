import React, { useState } from 'react';

export const FilterContext = React.createContext();

const FilterProvider = (props) => {
    const [state, setstate] = useState(false)

    return (
        <FilterContext.Provider value={{state, setstate}}>
          {props.children}
        </FilterContext.Provider>
      );
}

export default FilterProvider;