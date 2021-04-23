import React from 'react';

const Song = (props) => {
    return(
        <tbody>
            <tr>
                <td>{props.song.title}</td>
                <td>{props.song.album}</td>
                <td>{props.song.artist}</td>
                <td>{props.song.genre}</td>
                <td>{props.song.release_date}</td>
                <td><button onClick={props.delete}>Delete</button></td>
            </tr>
        </tbody>
    );
}

export default Song;