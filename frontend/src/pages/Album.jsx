import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { SongData } from '../context/Song'
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import { UserData } from '../context/User';
import { FaBookmark, FaRegBookmark, FaPlay } from 'react-icons/fa';

const Album = () => {

  const { fetchAlbumSong, albumData, albumSong, setSelectedSong, setIsPlaying } = SongData();
  const { user, addToPlaylist } = UserData();
  const params = useParams();

  useEffect(() => {
    fetchAlbumSong(params.id);
  }, [params.id]);

  const onclickHandler = (id) => {
    setSelectedSong(id);
    setIsPlaying(true);
  };

  const savePlayListHandler = (id) => {
    addToPlaylist(id);
  };

  return (
    <Layout>
      {albumData && (
        <>
          {/* Album Info */}
          <div className='mt-10 gap-8 flex flex-col md:flex-row md:items-center'>
            {albumData?.thumbnail?.url && (
              <img
                src={albumData.thumbnail.url}
                alt="album"
                className='w-48 rounded'
              />
            )}

            <div className='flex flex-col m-7'>
              <p>Album</p>
              <h2 className='text-3xl font-bold mb-4 md:text-5xl'>
                {albumData.title}
              </h2>
              <h4>{albumData.description}</h4>

              <p className='mt-1'>
                <img
                  src={assets.spotify_logo}
                  alt=""
                  className='inline-block w-6'
                />
              </p>
            </div>
          </div>

          {/* Header */}
          <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
            <p><b className='mr-4'>#</b></p>
            <p>Artist</p>
            <p className='hidden sm:block'>Description</p>
            <p className='text-center'>Actions</p>
          </div>

          <hr />

          {/* Songs */}
          {albumSong?.map((e, i) => {
            const isSaved = user?.playlist?.some(
              (song) => song === e._id || song._id === e._id
            );

            return (
              <div
                key={i}
                className='grid grid-cols-3 sm:grid-cols-4 mt-6 mb-4 pl-2 text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'
              >
                <p className='text-white flex items-center'>
                  <b className='mr-4 text-[#a7a7a7]'>{i + 1}</b>
                  <img
                    src={e?.thumbnail?.url}
                    className='inline w-10 mr-5'
                    alt=""
                  />
                  {e.title}
                </p>

                <p className='text-[15px]'>{e.singer}</p>

                <p className='text-[15px] hidden sm:block'>
                  {e.description?.slice(0, 20)}...
                </p>

                {/* Actions */}
                <div className='flex justify-center items-center gap-5'>
                  
                  {/* Bookmark Toggle */}
                  <span
                    className='text-[15px] cursor-pointer'
                    onClick={() => savePlayListHandler(e._id)}
                  >
                    {isSaved ? (
                      <FaBookmark className='text-green-500' />
                    ) : (
                      <FaRegBookmark />
                    )}
                  </span>

                  {/* Play */}
                  <span
                    className='text-[15px] cursor-pointer'
                    onClick={() => onclickHandler(e._id)}
                  >
                    <FaPlay />
                  </span>

                </div>
              </div>
            );
          })}
        </>
      )}
    </Layout>
  );
};

export default Album;