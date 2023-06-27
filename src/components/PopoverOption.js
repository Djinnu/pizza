import React from 'react'

const popoverStyles = {
    display: "flex",
    borderTop: "1px solid #c2c2c2",
    padding: "10px",
    width: "250px"
}

const PopoverOption = ({language, src}) => {
  return (
    <div style={popoverStyles}>
        <div>
          <img src={src} alt={language} style={{boxShadow: "0px 0px 5px #888888"}}/>
        </div>
        <span style={{marginLeft: '10px'}}>{language}</span>
    </div>
  )
}

export default PopoverOption