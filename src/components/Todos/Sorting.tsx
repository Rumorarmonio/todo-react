import React from 'react'
import styles from './Sorting.module.scss'
import Button from '../UI/Button'

function Sorting({filterNames, setFilter}: any) {
    return (
        <div className={styles.container}>
            {filterNames.map((name: string) => {
                return (
                    <Button
                        title={name + ' tasks'}
                        key={name}
                        name={name}
                        onClick={() => setFilter(name)}
                    >
                        {name}
                    </Button>)
            })}
        </div>
    )
}

export default Sorting
