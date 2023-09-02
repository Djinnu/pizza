import '../style/popoverOptions.css';
import { useShoppingCart } from '../context/ShoppingCartContext';

const PopoverOption = ({language, src, lang, handleClose, handleFlag}) => {
  const { handleChangeLanguage, setMainActive, mainActive } = useShoppingCart()

  return (
    <div className='popover' onClick={(e)=> {
      handleFlag(src)
      handleChangeLanguage(lang)
      handleClose()
      setMainActive(mainActive === "Pitsad" ? "Pizza" : "Pitsad")
      }}>
        <div>
          <img src={src} alt={language} style={{boxShadow: "0px 0px 5px #888888", display: 'block'}}/>
        </div>
        <span>{language}</span>
    </div>
  )
}

export default PopoverOption