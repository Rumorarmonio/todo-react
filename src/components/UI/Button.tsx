import React from 'react'
import styles from './Button.module.scss'

function Button(props: any) {
    const {children, disabled = false} = props
    return (
        <button
            {...props}
            className={styles.button}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button
