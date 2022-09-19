import React from 'react';
import cn from 'classnames';
import {CardProps} from './Card.props'
import styles from './Card.module.css'
export const Card = ({children,color="white",className, ...props}:CardProps) : JSX.Element => {
    return (
           <div className={cn(styles.card, {
               [styles.blue]: color=="blue"
           })} {...props}>
               {children}
           </div>
    );
};

