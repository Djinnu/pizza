import Button from './Button'

const buttonContainerStyles = {
    display: "flex",
    marginBottom: "20px"
}

const Filter = () => {
  return (
    <div>
        <div style={buttonContainerStyles}>
            <Button text="Pitsad"/>
            <Button text="Joogid"/>
            <Button text="Magus"/>
        </div>
        <div style={buttonContainerStyles}>
            <Button text="Kõik"/>
            <Button text="Sealiha"/>
            <Button text="Veiseliha"/>
            <Button text="Kanaliha"/>
            <Button text="Taimne"/>
            <Button text="Mereannid"/>
        </div>
    </div>
  )
}

export default Filter