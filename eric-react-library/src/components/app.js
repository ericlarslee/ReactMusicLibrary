import React, { useState, useEffect } from 'react';
import './app.css';
import Song from './Song/song.js';
import SongTable from './Table/songTable.js';
// import SongCreator from './SongCreator/songCreator';
import SongForm from './SongForm';
import { deleteSong, getAllSongs } from './services';

// let styling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};

const App = () => {
    const [songs, setSongs] = useState([]);
    const [filterTerm, setFilterTerm] = useState("");
    const [songForm, setSongForm] = SongForm({title: '', album: '', artist: '', genre: '', release_date: ''});
    

    function mapSongs(songs){
        let tempSongs = songs.filter(song => song.title.includes(filterTerm) || song.album.includes(filterTerm) || song.artist.includes(filterTerm) || song.genre.includes(filterTerm) || song.release_date.includes(filterTerm));
            return tempSongs.map(song =>
                <Song
                    key={song.id}
                    song={song}
                    delete = {() => deleteSong(song.id)}
                />
            )
    }

    useEffect(() =>{
        getAllSongs();
    },[])

    return (
        <div>
            <div className="row row-spacer">
                <div className="col-md-12" style={{padding: 0}}>
                    <div className='titlebar-nav'>
                        <h1>React Music Library</h1>
                    </div>
                </div>
            </div>
            <div>
            <input
                // style={styling}
                value={filterTerm}
                placeholder='Search for a song'
                onChange={setFilterTerm(filterTerm)}
            />
            </div>
            <div>
                <SongTable mapSongs={() => mapSongs(songs)}/>
            </div>
            <div>
                
            </div>
        </div>
    );
}


export default App;