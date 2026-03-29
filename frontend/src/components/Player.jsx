import React from 'react'
import {useState, useEffect,useRef } from 'react';
import { SongData } from '../context/Song'
import { GrChapterNext } from "react-icons/gr";
import { GrChapterPrevious } from "react-icons/gr";
import { FaPause, FaPlay } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';



const Player = () => {
    const { song,fetchSingleSong,selectedSong,isPlaying,setIsPlaying,PrevMusic,nextMusic} = SongData();

    console.log(song);
    useEffect(() => {
        fetchSingleSong();
    }, [selectedSong])

    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(()=>{
        const audio=audioRef.current

        if(!audio) return;

        const handleLoadedMetaData=()=>{
            setDuration(audio.duration);

        }
        const handleTimeUpdate=()=>{
            setProgress(audio.currentTime)
        }

        audio.addEventListener("loadedmetadata",handleLoadedMetaData)
        audio.addEventListener("timeupdate",handleTimeUpdate)

        return()=>{
        audio.removeEventListener("loadedmetadata",handleLoadedMetaData)
        audio.removeEventListener("timeupdate",handleTimeUpdate)
        }
    },[song])

    const handleProgressChange=(e)=>{
        const newTime =(e.target.value/100)*duration;
        audioRef.current.currentTime=newTime;
        setProgress(newTime);
    }

    const audioRef=useRef(null);

    const handlePlayPause=()=>{
        if(isPlaying)
        {
            audioRef.current.pause();
        }
        else{
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }

    const [volume, setVolume] = useState(0.5)
    const handleVolumeChange=e=>{
        const newVolume=e.target.value;
        setVolume(newVolume);
        audioRef.current.volume=newVolume;
    }
    
    return (
        <div>
            {
                song&&<div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
                    <div className="lg:flex items-center gap-4">
                        <img src={song.thumbnail?song.thumbnail.url :"https://via.placeholder.com/50"} alt=""  className='w-20'/>
                        <div className='hidden md:block'>
                            <p className="">{song.title}</p>
                            <p className="">{song.description && song.description.slice(0,20)}...</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-1 m-auto">
                        {
                            song && song.audio&&(<>
                            {isPlaying ?(<audio ref={audioRef} src={song.audio.url} autoPlay/>):(<audio ref={audioRef} src={song.audio.url}/>)}
                            </>
                        )}
                        <div className="w-full items-center font-thin text-green-400">
                            <input  defaultValue={"0"} type="range" min={"0"} max={"100"} value={(progress/duration)*100} onChange={handleProgressChange} className='progress-bar w-30 md:w-75 bg-green-400 text-green-400 ' />
                        </div>
                        <div className='flex justify-center items-center gap-4'>
                            <span className="cursor-pointer" onClick={PrevMusic}>
                                <GrChapterPrevious />
                                
                            </span>
                            <button onClick={handlePlayPause} className='bg-white text-black rounded-full p-2'>{isPlaying?<FaPause/>:<FaPlay/>}</button>
                            <span className="cursor-pointer" onClick={nextMusic}>
                                <GrChapterNext />
                                
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={handleVolumeChange}
                        className=' w-16 md:w-32'
                        />
                    </div>
                </div>
            }
        </div>
    );
};

export default Player;