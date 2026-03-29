import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';
const AlbumItem = ({image,name,desc,id}) => {
    const navigate=useNavigate();
  return (
    <div onClick={()=>navigate("/album/"+id)} className='min-w-45 p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
        <img
                  src={image}
                  className='rounded w-40'
                  onError={(e) => {
                    e.target.src = assets.alternate   // ✅ fallback image
                  }}
                />
        <p className='font-bold mt-2 mb-1'>{name.slice(0,12)}..</p>
        <p className="text-sm text-slate-200">{desc.slice(0,18)}..</p>
    </div>
  )
}

export default AlbumItem