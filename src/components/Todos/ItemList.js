import Item from './Item'
import styles from './ItemList.module.scss'

function ItemList({todos, deleteTodo, toggleTodo}) {
    return (
        <div className={styles.todoListContainer}>
            {!todos.length && <h2>Todo list is empty</h2>}
            {todos.map((todo) => (
                <Item
                    key={todo.id}
                    todo={todo}
                    deleteTodo={deleteTodo}
                    toggleTodo={toggleTodo}
                />
            ))}
        </div>
    )
}

export default ItemList
