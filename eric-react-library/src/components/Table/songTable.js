import React from 'react';

const SongTable = (props) => {
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Song</th>
                    <th>Album</th>
                    <th>Artist</th>
                    <th>Genre</th>
                    <th>Release Date</th>
                </tr>
            </thead>
            {props.mapSongs()}
        </table>
    );
}

export default SongTable;