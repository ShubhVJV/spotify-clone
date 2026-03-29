import React from "react";
import { UserData } from "../context/User";
import { SongData } from "../context/Song";
import { Link, Navigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import toast from "react-hot-toast";

const Admin = () => {
  const { user } = UserData();
  const {albums,songs,addAlbum,loading,addSong,addThumbnail,deleteSong}=SongData();

  // ⏳ Wait until user data is loaded
  if (loading) return null;

  // 🚫 If not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // 🚫 If logged in but NOT admin
  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }

  // ✅ If admin
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [singer, setSinger] = useState("");
  const [album, setAlbum] = useState("")

  const fileChangeHandler=(e)=>{
    const file=e.target.files[0];
    setFile(file);
  }

  const addAlbumHandler = (e) => {
  e.preventDefault();   // ✅ correct

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("file", file);

  addAlbum(formData, setTitle, setDescription, setFile);
};

const addSongHandler = (e) => {
  e.preventDefault();   // ✅ correct

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("singer", singer);
  formData.append("album", album);
  formData.append("file", file);

  addSong(formData, setTitle, setDescription, setFile,setSinger,setAlbum);
};


    const addThumbnailHandler = (id) => {
  if (!file) {
    toast.error("Please select a thumbnail first");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  addThumbnail(id, formData, setFile);
};

    const deleteHandler=(id)=>{
        if(confirm("delete this Song?"))
        {
            deleteSong(id);
        }
    }
  return (
    <>
    <div className="min-h-screen bg-[#212121] text-white p-8">
        <Link to="/" className="bg-green-500 text-white font-bold py-2 px-4 rounded-full">Go To Home Page</Link>
        <h2 className="text-2xl font-bold mb-6 mt-6">Add Album</h2>
        <form className="bg-[#181818] p-6 rounded-lg shadow-lg" onSubmit={addAlbumHandler}>
            <div className="mb-4">
                <label className='block text-sm font-medium mb-1'>
                    Title
                </label>
                <input type="text" placeholder='title' className='auth-input'
                required
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className='block text-sm font-medium mb-1'>
                    Description
                </label>
                <input type="text" placeholder='Description' className='auth-input'
                required
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className='block text-sm font-medium mb-1'>
                    Thumbnail
                </label>
                <input type="file" placeholder='' className='auth-input mask-type-luminance' 
                accept="image/*"
                onChange={fileChangeHandler}
                required
                
                />
            </div>
            <button disabled={loading} type="submit" className="auth-btn mt-3" style={{width:200}}>{loading?"please wait..":"Add"}</button>
        </form>
        <h2 className="text-2xl font-bold mb-6 mt-6">Add Songs</h2>
        <form onSubmit={addSongHandler} className="bg-[#181818] p-6 rounded-lg shadow-lg">
            <div className="mb-4">
                <label className='block text-sm font-medium mb-1'>
                    Title
                </label>
                <input type="text" placeholder='Title' className='auth-input'
                required
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className='block text-sm font-medium mb-1'>
                    Description
                </label>
                <input type="text" placeholder='Description' className='auth-input'
                required
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className='block text-sm font-medium mb-1'>
                    Singer
                </label>
                <input type="text" placeholder='Singer' className='auth-input'
                required
                value={singer}
                onChange={(e)=>setSinger(e.target.value)}
                />
            </div>
            <select className="auth-input" value={album} onChange={e=>setAlbum(e.target.value)}>
                <option value="">Choose Album</option>
                {albums && albums.map((e,i)=>(
                    <option value={e._id} key={i}>{e.title}</option>
                ))}
            </select>
            <div className="mb-4 mt-1">
                <label className='block text-sm font-medium mb-1'>
                    Audio
                </label>
                <input type="file" placeholder='' className='auth-input mask-type-luminance' 
                accept="audio/*"
                onChange={fileChangeHandler}
                required
                // value={password}
                // onChange={(e)=>setPassword(e.target.value)}
                />
            </div>
            <button type="submit" className="auth-btn mt-3" style={{width:200}}>Add</button>
        </form>
        <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Added Songs</h3>
           <div className="flex flex-wrap gap-6 mt-4 justify-start">

  {songs && songs.map((e, i) => {

    // console.log("Thumbnail data:", e.thumbnail);

    return (
      <div 
        key={i} 
        className="bg-[#181818] p-4 rounded-lg shadow-md w-60"
      >
        {
          e.thumbnail ? (
            <img
              src={e.thumbnail.url}
              alt="thumbnail"
              className="w-52 h-52 object-cover rounded-md mb-3"
            />
          ) : (
            <div className="flex flex-col justify-center items-center gap-2 mb-3">
              <input
                type="file"
                onChange={fileChangeHandler}
                className="text-sm"
              />
              <button
                type="button"
                onClick={() => addThumbnailHandler(e._id)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Add Thumbnail
              </button>
            </div>
          )
        }

        <h4 className="text-lg font-bold">{e.title}</h4>
        <h4 className="text-sm text-gray-400">{e.singer}</h4>
        <h4 className="text-sm text-gray-500">{e.description}</h4>

        <button onClick={()=>deleteHandler(e._id)} className="mt-2 px-3 py-1 bg-red-500 rounded hover:bg-red-600">
          <MdDelete />
        </button>
      </div>
    );
  })}

</div>
        </div>
    </div>

    </>
);
};

export default Admin;