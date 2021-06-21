import React, { useState, useEffect } from 'react';
import './app.css';
import axios from 'axios';
import Song from './Song/song.js';
import SongTable from './Table/songTable.js';
import SongCreator from './SongCreator/songCreator';
// import SongForm from './SongForm';

let styling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};

const App = () => {
    const [songs, setSongs] = useState([]);
    const [filterTerm, setFilterTerm] = useState("");
    // const [songForm, setSongForm] = SongForm({title: '', album: '', artist: '', genre: '', release_date: ''});
    
    
    async function getAllSongs(){
        let response = await axios.get('http://127.0.0.1:8000/music/')
        console.log(response.data)
        setSongs(response.data);
    }


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

    async function addNewSong(song){
        let response = await axios.post('http://127.0.0.1:8000/music/', song) 
        console.log(response.data)
        alert('song has been added')
        // this.getAllSongs();
    }
    
    async function deleteSong(songID) {
        let response = await axios.delete(`http://127.0.0.1:8000/music/${songID}/`)
        console.log(response.data)
        alert('song has been deleted')
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
                style={styling}
                value={filterTerm}
                placeholder='Search for a song'
                onChange={setFilterTerm(filterTerm)}
            />
            </div>
            <div>
                <SongTable mapSongs={() => mapSongs(songs)}/>
            </div>
            <div>
                <SongCreator addNewSong={addNewSong.bind(this)} />
            </div>
        </div>
    );
}


export default App;