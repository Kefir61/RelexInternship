import React, { FC, useState } from 'react';
import { InputNumber } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './CartItem.scss';
import { Colors, Sizes } from '@components';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { cartItemProps, cartProductProps, countTotalPrice } from '../../store/slices/cartSlice';

export const CartItem: FC<cartItemProps> = (props) => {
    const [quantityValue, setQuantityValue] = useState(1);
    const [totalPrice, setTotalPrice] = useState(props.productVariety.price);
    const [error, setError] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const onChangeQuantityField = (quantity: number) => {
        if(quantity > props.productVariety.quantity){
            setError(true); 
            setTimeout(() => setError(false), 3000)  
        } else {
            setQuantityValue(quantity);
            setTotalPrice(quantity*props.productVariety.price);
            setError(false);

            const id = props.productVariety.id;            
            dispatch(countTotalPrice({id, quantity}))
        }

        // if(quantity === 0 || quantity === null){
        //     removeCartItem(id);
        // }
    }
    
    return (
        <section className='cart-item'>
            
            <div className='cart-item__image'>
                <img src='' alt=''/>
            </div>  
                
            <div className='cart-item__right'>                           

                <div className='cart-item__info info'>

                    <h2 className='info__title'>{props.productVariety.nameProduct}</h2>

                    <div className='info__size'>
                        {props.productVariety.size && <p className='info__size'>Размер: {props.productVariety.size}</p>} 
                        {/* <Sizes sizes={sizes} sizeName='S'/> */}
                    </div>

                    <div className='info__color color'>
                        <p className='color__title'>Цвет: </p>
                        <div className='color__item' 
                            style={{ backgroundColor: `${props.productVariety.color}` }}></div> 
                        {/* <Colors colors={colors} colorName='blue'/> */}
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
                                max={props.productVariety.quantity}
                            />
                        </div>
                        <p  className='quantity__text'>шт.</p>

                        <p  className='quantity__in-stock'>В наличии {props.productVariety.quantity} шт.</p>
                    </div>
                </div>

                <div className='cart-item__price price'>
                    <p className='price__total-price'>{totalPrice}</p>

                    <div className='price__item-price item-price'>
                        <p className='item-price__title'>Цена за единицу: </p>
                        <p className='item-price__price'>{props.productVariety.price}</p>
                    </div>
                
                    <div className='cart-item__bin'>
                        <DeleteOutlined /> {/*  onClick={() => removeCartItem(id)}*/}
                    </div>
                    
                </div>
            </div>
        </section>
    )
}