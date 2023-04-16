import React, { FC, useEffect, useState } from "react";
import './CancelDelete.scss';
import { cartItemProps, changeCartItemQuantity, setCancelDelete } from '../../../store/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';

export const CancelDelete: FC<cartItemProps> = (props) => { 
	const dispatch = useDispatch<AppDispatch>();
	const [timerCounterNumber, setTimerCounterNumber] = useState(4);

	useEffect(()=>{
	
		if(props.cancelDelete){
			let counterNumber = 4;
			const setIntervalID = setInterval(() => {
				counterNumber--;
				setTimerCounterNumber(counterNumber)

				if(counterNumber === 0){
					dispatch(changeCartItemQuantity({productVarietyId: props.productVariety.id, quantity: 0})) 
					clearInterval(setIntervalID);
				}

			}, 1000);
		  
			return () => {
				setTimerCounterNumber(4)
				clearInterval(setIntervalID);
			};
		}	
	}, [props.cancelDelete])
    
    return (
        <div className="product-deleted">
			<div className="product-deleted__left">
	            <div className="product-deleted__counter">
	    			<span className="product-deleted__number">{timerCounterNumber}</span>
	    			<svg className="product-deleted__circle circle"><circle className="circle__element" r="10" cx="12" cy="12"></circle></svg>
    			</div>
				<p className="product-deleted__title">Вы удалили "{props.productVariety.nameProduct}"</p>
	        </div>
	    	<div className="product-deleted__return">
				<button className="product-deleted__button" 
					onClick={() => dispatch(setCancelDelete({id: props.productVariety.id, cancelDelete: false}))}
				>
					Вернуть
				</button>
			</div>
	    </div>
    )
}