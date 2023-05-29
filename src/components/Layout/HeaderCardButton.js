import { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCardButton.module.css';
import CartContext from '../../store/cart-context';

const HeaderCardButton = (props) => {

    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

    const cartCtx = useContext(CartContext);
    
    const { items } = cartCtx;

    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    // useHook para animación de button
    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);

        // El estado que condiciona el button lo devolvemos a false.
        // Con un settimer de 300 milisegundos porque es lo que dura la animación:
        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);
        // Se considera una buena práctica limpiar el temporizador:
        return () => clearTimeout(timer);
        
    }, [items]);
    
    return (
        <button className={btnClasses} onClick={ props.onClick }>
            <span className={ classes.icon }>
                <CartIcon />
            </span>
            <span>
                Your Cart
            </span>
            <span className={ classes.badge }>
                { numberOfCartItems }
            </span>
        </button>
    )

}

export default HeaderCardButton;


