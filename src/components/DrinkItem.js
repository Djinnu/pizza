const DrinkItem = ({id, name, price, imgUrl}) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', width: 285, heigth: 338}}>
        <img style={{width: 220, height: 220}} />
        <h3>{name}</h3>
        <p>{price}</p>
    </div>
  )
}

export default DrinkItem