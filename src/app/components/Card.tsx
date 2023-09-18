'use client'
import React from 'react';
import Image from 'next/image';

interface LocalData {
    id: number;
    name: string;
    image: string;
    phone: string;
    email: string;
    address: string;
    lat: number;
    lng: number;
}
interface CardProps {
    local: LocalData;
    highlightedMark: number | null;
    createMarkerMouseOverHandler: (id: number) => void;
    createMarkerMouseOutHandler: () => void;
}
function Card({ local, highlightedMark, createMarkerMouseOverHandler, createMarkerMouseOutHandler }: CardProps) {
    console.log(highlightedMark);

    return (
        <div

        key={local.id}
        className={`w-full sm:w-2/2 lg:w-1/3 mr-9  p-1 sm:p-2  mt-6  my-14  ${highlightedMark === local.id ? 'image-hover-shadow' : ''
          } ${highlightedMark === local.id ? 'image-hover-pointer' : ''}`} style={{ width: '180px', height: '180px' }}
        onMouseEnter={()=>createMarkerMouseOverHandler(local.id)}
        onMouseLeave={createMarkerMouseOutHandler}
      >
        <div className={`square-image-wrapper ${highlightedMark === local.id ? 'img-hovered' : ''}`} style={{ width: '100%', height: '100%' }}>
          <div className="square-image-inner">
            <Image src={local.image} alt={local.name} layout="fill" objectFit="cover" className="rounded-md" />
          </div>
        </div>
        <div className="max-w-full">
          <h2 className="text-lg font-bold mt-1 mb-1">{local.name}</h2>
          <p className="text-black-600 text-xs text-justify">{local.phone}</p>
          <p className="text-black-600 text-xs text-justify">{local.email}</p>
        </div>
      </div>
    )
}

export default Card;