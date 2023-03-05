import React, {FunctionComponent, useRef, useState} from 'react';
import styles from "./TodoItem.module.scss"
import test from "../../styles/test.module.scss"
import {TodoItemModel} from "@/models/TodoItem";
import classNames from "classnames";

interface OwnProps {
    todoItem: TodoItemModel;
    onSubmit: (name: string) => void;
    onDelete: (todoItem: TodoItemModel) => void;
    onEdit: (todoItem: TodoItemModel) => void;
    onToggle: (todoItem: TodoItemModel) => void;
}

type Props = OwnProps;



const TodoItem: FunctionComponent<Props> = (props) => {

    const todoItem = props.todoItem;
    const [checked, setChecked] = useState<boolean>(props.todoItem.completed);
    const textClass = classNames( {
        [styles["todo-item__text"]]: true,
        [styles["todo-item__text--completed"]]: checked,

    });
    function toggleCompleted() {
        todoItem.completed = !todoItem.completed;
        setChecked(todoItem.completed)
    }

    return (<div className={styles["todo-item"]}>
        <input type="checkbox"
               defaultChecked={todoItem.completed}
               onChange={(event) => {
                   toggleCompleted();
                   props.onToggle(todoItem);
               }
               }
        />
        <label className={textClass}>{todoItem.name}</label>
        <div className={styles["todo-item__actions"]}>
            <button className={styles["todo-item__action"]}>Edit</button>
            <button className={styles["todo-item__action todo-item__action--delete"]}
                    onClick={() => props.onDelete(todoItem)}>✘
            </button>

        </div>
    </div>);
};

export default TodoItem;
