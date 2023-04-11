import React, { FC, useState } from 'react';
import { InputNumber } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './CartItem.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { cartItemProps, countTotalPrice, changeCartItemQuantity } from '../../store/slices/cartSlice';

export const CartItem: FC<cartItemProps> = (props) => {
    const [quantityValue, setQuantityValue] = useState(1);
    const [totalPrice, setTotalPrice] = useState(props.productVariety.price);
    const dispatch = useDispatch<AppDispatch>();
    const imgUrl = props.productVariety.mainImageId 
    ? `http://relex-coin.relex.ru:9102/api/shop/images?id=${props.productVariety.mainImageId}`
    : "http://relex-coin.relex.ru:9102/api/shop/images";
    const id = props.productVariety.id; 

    const onChangeQuantityField = (quantity: number) => {
        setQuantityValue(quantity);
        setTotalPrice(quantity*props.productVariety.price);
        dispatch(countTotalPrice({id, quantity}))

        if(quantity === 0 || quantity === null){
            deleteItem();
        } 
    }

    const deleteItem = () => {
        const quantity = 2;
        const productVarietyId = id
        dispatch(changeCartItemQuantity({productVarietyId, quantity}))   
    }
    
    return (
        <section className='cart-item'>
            
            <div className='cart-item__image'>
                <img className='cart-item__img' src={imgUrl} alt=''/>
            </div>  
                
            <div className='cart-item__right'>                           

                <div className='cart-item__info info'>

                    <h2 className='info__title'>{props.productVariety.nameProduct}</h2>

                    <div className='info__size'>
                        {props.productVariety.size && <p className='info__size'>Размер: {props.productVariety.size}</p>} 
                    </div>

                    <div className='info__color color'>
                        <p className='color__title'>Цвет: </p>
                        <div className='color__item' 
                            style={{ backgroundColor: `${props.productVariety.color}` }}
                        ></div>
                    </div>

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

                        <p className='quantity__in-stock'>В наличии {props.productVariety.quantity} шт.</p>
                        
                    </div>
                </div>

                <div className='cart-item__price price'>
                    <p className='price__total-price'>{totalPrice}</p>

                    <div className='price__item-price item-price'>
                        <p className='item-price__title'>Цена за единицу: </p>
                        <p className='item-price__price'>{props.productVariety.price}</p>
                    </div>
                
                    <div className='cart-item__bin'>
                        <DeleteOutlined onClick={deleteItem} /> 
                    </div>
                    
                </div>
            </div>
        </section>
    )
}