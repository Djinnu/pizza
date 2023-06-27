const buttonStyles = {
    backgroundColor: "#f1f1f1",
    borderRadius: "5px",
    border: "none",
    padding: "6px 30px",
    fontWeight: "bold",
    marginRight: "15px"

}


const Button = ({text, onClick, activeName, orderSize, active}) => {
  const newActiveName = activeName ? activeName[0].toUpperCase() + activeName.slice(1, activeName.length) : 'default'
  const size = orderSize ? text.split(" ")[0] : false

  return (
    active ? <button style={{...buttonStyles, backgroundColor: "#cc0000", color: "white"}}>{text}</button> :
    size ? <button style={orderSize === size ? {...buttonStyles, backgroundColor: "#cc0000", color: "white"} : buttonStyles} onClick={onClick}>{text}</button> :
           <button style={newActiveName === text ? {...buttonStyles, backgroundColor: "#cc0000", color: "white"} : buttonStyles} onClick={onClick}>{text}</button>
  )
}

export default Button