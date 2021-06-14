import React from 'react';

const SearchBar = ({keyword, setKeyword}) => {
    const Styling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
    return (
        <input
        style={Styling}
        key='song'
        value={keyword}
        placeholder={'Search for a song'}
        onChange={() => setKeyword(keyword)}
        />
    );
}

export default SearchBar;