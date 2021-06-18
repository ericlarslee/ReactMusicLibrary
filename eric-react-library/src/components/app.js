import React, { useState, useEffect } from 'react';
// import TitleBar from './TitleBar/titleBar';
import './app.css';
import axios from 'axios';
import Song from './Song/song.js';
import SongTable from './Table/songTable.js';
import SongCreator from './SongCreator/songCreator.js';
import SearchBar from './SearchBar/searchBar';
import { useState } from 'react';

let styling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};

const App = () => {
    const [songs, setSongs] = useState([]);
    const [filterTerm, setFilterTerm] = useState("");
    
    
    const getAllSongs= async() => {
        let response = await axios.get('http://127.0.0.1:8000/music/')
        console.log(response.data)
        this.setState({
            songs: response.data,
            currentSongs: this.state.songs
            
        });
    }

    runApp(){
        if(this.state.songs.length === 0){
            this.getAllSongs();
        }
        // this.filteredSearch();
    }

    // mapSongs(){
    //    let temp entry.filter()
    //     return entry.map(song =>
    //         <Song
    //             key={song.id}
    //             song={song}
    //             delete = {() => this.deleteSong(song.id)}
    //         />
    //     )
    // }

    mapSongs(songs){
        let tempSongs = songs.filter(song => song.title.includes(this.state.filterTerm) || song.album.includes(this.state.filterTerm) || song.artist.includes(this.state.filterTerm) || song.genre.includes(this.state.filterTerm) || song.release_date.includes(this.state.filterTerm));
            return tempSongs.map(song =>
                    <Song
                        key={song.id}
                        song={song}
                        delete = {() => this.deleteSong(song.id)}
                    />
                )
    }

    async addNewSong(song){
        let response = await axios.post('http://127.0.0.1:8000/music/', song) 
        console.log(response.data)
        alert('song has been added')
        this.getAllSongs();
    }
    
    async function deleteSong(songID) {
        let response = await axios.delete(`http://127.0.0.1:8000/music/${songID}/`)
        console.log(response.data)
        alert('song has been deleted')
        this.getAllSongs();
    }


        render () {
            this.runApp();
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
                    value={this.state.filterTerm}
                    placeholder={'Search for a song'}
                    onChange={this.setState(this.state.filterTerm)}
                />
                </div>
                <div>
                    <SongTable mapSongs={() => this.mapSongs(this.state.currentSongs)}/>
                </div>
                <div>
                    <SongCreator addNewSong={this.addNewSong.bind(this)} />
                </div>
            </div>
        );
    }
}

export default App;