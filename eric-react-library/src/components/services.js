import axios from "axios";


export async function getAllSongs(){
    try{
        const response = await axios.get('http://127.0.0.1:8000/music/')
        console.log(response.data)

        if(response.status === 200){
            return response.data;
        }
        return null;
    }
    catch(error){
        console.log("error:", error);
    }
}


export async function addNewSong(song){
    try{
        const response = await axios.post('http://127.0.0.1:8000/music/', song);
        console.log(response.data)
        if(response.status === 201){
        alert('song has been added')
        }
    }
    catch(error){
        console.log("error:", error);
    }
}

export async function deleteSong(songID) {
    let response = await axios.delete(`http://127.0.0.1:8000/music/${songID}/`)
    console.log(response.data)
    alert('song has been deleted')
}