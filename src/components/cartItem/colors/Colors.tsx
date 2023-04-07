import React, { FC } from "react";

interface ColorsProps {
    colors: string[];
    colorName: string;
}

export const Colors: FC<ColorsProps> = ({colors, colorName}) => { 
    
    return (
        <>
            {colors.map((color, index) => {
                if(color === colorName){
                    return (
                        <div
                            key={index}
                            className='color__item'
                            style={{ backgroundColor: `${color}` }}
                        ></div>  
                    )
                }
            })}
        </>
    )
}