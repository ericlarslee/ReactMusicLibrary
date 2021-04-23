import React, { Component } from 'react';
import TitleBar from './TitleBar/titleBar';
import './app.css';
import axios from 'axios';
import Song from './Song/song.js';
import SongTable from './Table/songTable.js';
import SongCreator from './SongCreator/songCreator.js';

class App extends Component {
    state = {
        songs: []
    }

    componentDidMount(){
        console.log('did mount');
        this.getAllSongs();
        console.log(this.getAllSongs());
    }

    async getAllSongs(){
        let response = await axios.get('http://127.0.0.1:8000/music/')
        console.log(response.data)
        this.setState({
            songs: response.data
        })
    }

    mapSongs(){
        return this.state.songs.map(song =>
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
    
    async deleteSong(songID){
        let response = await axios.delete(`http://127.0.0.1:8000/music/${songID}/`)
        console.log(response.data)
        alert('song has been deleted')
        this.getAllSongs();
    }

        render () {
        return (
            <div>
                <div className="container-fluid">
                    <TitleBar />
                </div>
                <div>
                    <SongTable mapSongs={() => this.mapSongs()}/>
                </div>
                <div>
                    <SongCreator addNewSong={this.addNewSong.bind(this)} />
                </div>
            </div>
        );
    }
}

export default App;