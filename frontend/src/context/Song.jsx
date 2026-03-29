import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
// import { set } from "mongoose";
import { UserData } from "./User";

const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [songLoading, setSongLoading] = useState(true);
  const { isAuth } = UserData();

  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false)

  // 🔥 Fetch All Songs
  async function fetchSongs() {
    try {
      const { data } = await axios.get("/api/songs/all", {
        withCredentials: true,
      });
      setSongs(data);
      setSelectedSong(data[0]._id);
      setIsPlaying(false);
    } catch (error) {
      console.log(error);
    } finally {
      setSongLoading(false);
    }
  }
  
  const [song, setSong] = useState([]);
  async function fetchSingleSong() {
    try {
      const{data}=await axios.get("/api/songs/"+selectedSong);
      setSong(data);
    } catch (error) {
      console.log(error);
    }
    
  }
  // 🔥 Fetch All Albums
  async function fetchAlbums() {
    try {
      const { data } = await axios.get("/api/songs/album/all", {
        withCredentials: true,
      });
      setAlbums(data);
    } catch (error) {
      console.log(error);
    }
  }


  async function deleteSong(id) {
  try {
    const { data } = await axios.delete(
      `/api/songs/${id}`,   // ✅ correct route
      { withCredentials: true }   // ✅ important
    );

    toast.success(data.message);
    fetchSongs();

  } catch (error) {
    toast.error(error?.response?.data?.message || "Error deleting");
  }
}
  // 🔥 Add Album
  async function addAlbum(formData, setTitle, setDescription, setFile) {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "/api/songs/album/new",   // ✅ FIXED (songs not song)
        formData,
        { withCredentials: true }
      );

      toast.success(data.message);

      fetchAlbums(); // refresh album list

      setTitle("");
      setDescription("");
      setFile(null);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  async function addSong(formData, setTitle, setDescription, setFile,setSinger,setAlbum) {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "/api/songs/new",   // ✅ FIXED (songs not song)
        formData,
        { withCredentials: true }
      );

      toast.success(data.message);

      fetchSongs(); // refresh album list

      setTitle("");
      setDescription("");
      setSinger("");
      setAlbum("");
      setFile(null);

    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  async function addThumbnail(id,formData, setFile) {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "/api/songs/"+id,   // ✅ FIXED (songs not song)
        formData,
        { withCredentials: true }
      );

      toast.success(data.message);

      fetchSongs(); // refresh album list
      setFile(null);

    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
  if (isAuth) {
    fetchSongs();
    fetchAlbums();
  }
}, [isAuth]);

  useEffect(() => {
  if (selectedSong) {
    fetchSingleSong();
  }
}, [selectedSong]);

const [index, setIndex] = useState(0);

function nextMusic(){
  if(index===songs.length-1)
  {
    setIndex(0);
    setSelectedSong(songs[0]._id);
  }
  else
  {
    setIndex(index+1);
    setSelectedSong(songs[index+1]._id)
  }
}
function PrevMusic(){
  if(index===0)
  {
    setIndex(songs.length-1);
    setSelectedSong(songs[songs.length-1]._id);
  }
  else
  {
    setIndex(index-1);
    setSelectedSong(songs[index-1]._id)
  }
}
const [albumSong, setAlbumSong] = useState([])
const [albumData, setAlbumData] = useState([])
async function fetchAlbumSong(id) {
  try {
    const {data}=await axios.get("/api/songs/album/"+id);
    setAlbumSong(data.songs);
    setAlbumData(data.album)
  } catch (error) {
    console.log(error)
  }
  
}

  return (
    <SongContext.Provider
      value={{
        songs,
        albums,
        loading,
        songLoading,
        addAlbum,
        fetchAlbums,
        fetchSongs,
        addSong,
        addThumbnail,
        deleteSong,
        fetchSingleSong,
        song,
        selectedSong,
        setSelectedSong,
        isPlaying,
        setIsPlaying,
        PrevMusic,
        nextMusic,
        fetchAlbumSong,
        albumData,
        albumSong,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const SongData = () => useContext(SongContext);