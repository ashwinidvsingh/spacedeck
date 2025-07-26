import React from 'react'
import './Card.css';
function Card({url, children, cardName, isLoading, onClick}) {
  return (
    <div className='card-container'>
      <div className='space-card' onClick={onClick}>
          <div className="space-card-content">
              <h3>{cardName}</h3>

              {isLoading ? (
              <>
                <div className="skeleton-img" />
                <div className="skeleton-title" />
                <div className="skeleton-text" />
                <div className="skeleton-text short" />
              </>
              ) : (
                <>
                  <img className="space-card-image" src={url}/>
                  {children}
                </>
              )}
          </div>
      </div>
    </div>
  )
}

export default Card