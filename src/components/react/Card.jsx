import React, { useState } from 'react';

export default function Card({ title, description, imageUrl }) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white transition-all duration-300 hover:shadow-xl">
      {imageUrl && (
        <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
      )}
      
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        
        <p className={`text-gray-700 text-base ${expanded ? '' : 'line-clamp-3'}`}>
          {description}
        </p>
        
        {description.length > 150 && (
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-blue-500 hover:text-blue-700 text-sm mt-2 focus:outline-none"
          >
            {expanded ? 'Leer menos' : 'Leer más'}
          </button>
        )}
      </div>
      
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #react
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #astro
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #tailwind
        </span>
      </div>
    </div>
  );
}