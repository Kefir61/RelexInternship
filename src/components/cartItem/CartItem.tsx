import React, { FC, useState } from 'react';
import { InputNumber } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './CartItem.scss';
import { Colors, Sizes } from '@components';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { countTotalPrice } from '../../store/slices/cartSlice';

interface CartItemProps{
    removeCartItem: (item: any) => void;
    id: number;
    imgUrl: string;
    price: number;
    amount: number;
    title: string;
    colors: string[];
    sizes: string[];
}

export const CartItem: FC<CartItemProps> = ({
    id,
    imgUrl,
    price,
    amount,
    title,
    colors,
    sizes,
    removeCartItem
}) => {
    const [quantityValue, setQuantityValue] = useState(1);
    const [totalPrice, setTotalPrice] = useState(price);
    const [error, setError] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const onChangeQuantityField = (quantity: number) => {
        if(quantity > amount){
            setError(true); 
            setTimeout(() => setError(false), 3000)  
        } else {
            setQuantityValue(quantity);
            setTotalPrice(quantity*price);
            setError(false);
            
            dispatch(countTotalPrice({id, quantity}))
        }

        if(quantity === 0 || quantity === null){
            removeCartItem(id);
        }
    }
    
    return (
        <section className='cart-item'>
            
            <div className='cart-item__image'>
                <img src={imgUrl} alt=''/>
            </div>  
                
            <div className='cart-item__right'>                           

                <div className='cart-item__info info'>

                    <h2 className='info__title'>{title}</h2>

                    <div className='info__size'>
                        <Sizes sizes={sizes} sizeName='S'/>
                    </div>

                    <div className='info__color color'>
                        <p className='color__title'>Цвет: </p>
                        <Colors colors={colors} colorName='blue'/>
                    </div>

                    {error && 
                        <p className='info__error'>Вы не можете заказать больше, чем есть в наличии</p>
                    }

                    <div className='info__quantity quantity'>
                        <div className='quantity__input-wrapper'>
                            <InputNumber 
                                value={quantityValue}
                                className='quantity__input'
                                placeholder='1'
                                onChange={onChangeQuantityField}
                                type='number'
                                min={0}
                                max={amount}
                            />
                        </div>
                        <p  className='quantity__text'>шт.</p>

                        <p  className='quantity__in-stock'>В наличии {amount} шт.</p>
                    </div>
                </div>

                <div className='cart-item__price price'>
                    <p className='price__total-price'>{totalPrice}</p>

                    <div className='price__item-price item-price'>
                        <p className='item-price__title'>Цена за единицу: </p>
                        <p className='item-price__price'>{price}</p>
                    </div>
                
                    <div className='cart-item__bin'>
                        <DeleteOutlined onClick={() => removeCartItem(id)}/>
                    </div>
                </div>
            </div>
        </section>
    )
}