import React, { FC } from "react";

interface SizesProps {
    sizes: string[];
    sizeName: string;
}

export const Sizes: FC<SizesProps> = ({sizes, sizeName}) => { 
    
    return (
        <>
            {sizes.map((size, index) => {
                if(size === sizeName){
                    return (
                        <p 
                            key={index}
                            className='info__size'
                        >Размер: {size}</p> 
                    )
                }
            })}
        </>
    )
}