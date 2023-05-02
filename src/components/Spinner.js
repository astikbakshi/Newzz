import React, { Component } from 'react'
import loading from '../loading.gif'

const Spinner=() => {
  
    return (
      <div className="text-center align-middle">
        <img className="my-3" src={loading} alt="Loading..."/>
      </div>
    )
  
}

export default Spinner
