import React, {FunctionComponent, useEffect, useState} from 'react';
import {TodoItemModel} from "@/models/TodoItem";
import TodoItem from "@/components/Todo/TodoItem";
import styles from "./TodoList.module.scss"

interface OwnProps {
    todoList: TodoItemModel[];
    setTodoList: (todoList: TodoItemModel[]) => void;
}

type Props = OwnProps;

export const API_URL = "http://127.0.0.1:4455/api/";

const TodoList: FunctionComponent<Props> = (props) => {


    // const todoList: TodoItemModel[] = [{completed: false, id: 1, name: "Clean my room"}];
    const todoList = props.todoList;
    const onDelete = async (todoItem: TodoItemModel) => {

        const deleted = await deleteTodoItem(todoItem.id);
        props.setTodoList(todoList.filter((item) => item.id !== todoItem.id));
        console.log("Deleted");
    }

    const onSubmit = async (name: string) => {
        const created = await createTodoItem(name);
        if (created) {
            props.setTodoList([...todoList, created]);
        }
    }

    const onEdit = async (todoItem: TodoItemModel) => {


    }

    async function onToggle(todoItem: TodoItemModel) {
        const updated = await updateTodoItem(todoItem);
        if (updated) {
            props.setTodoList(todoList.map((item) => item.id === todoItem.id ? todoItem : item));
        }
    }

    return <div className={styles["todo-list"]}>
        <input type="text"
               placeholder={"What needs to be done?"}
               className={styles["todo-list__text-input"]}
               onKeyDown={(event) => {
                   if (event.key === "Enter") {
                       onSubmit(event.currentTarget.value);
                          event.currentTarget.value = "";
                   }
               }}
        />
        {todoList?.map((todoItem) => {
            return <TodoItem
                todoItem={todoItem}
                onDelete={onDelete}
                onEdit={onEdit}
                onSubmit={onSubmit}
                onToggle={onToggle}
            />
        })}
    </div>

};

async function deleteTodoItem(id: number): Promise<boolean> {
    const response = await fetch(`${API_URL}items/` + id, {
        method: "DELETE",
    });
    return response.ok;

}

async function updateTodoItem(todoItem: TodoItemModel): Promise<boolean> {
    const response = await fetch(`${API_URL}items/` + todoItem.id, {
        method: "PUT",
        body: JSON.stringify(todoItem),
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.ok;
}

async function createTodoItem(name: string): Promise<TodoItemModel | null> {
    const response = await fetch(`${API_URL}items`, {
        method: "POST",
        body: JSON.stringify({name: name}),
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (response.ok) {
        return await response.json();
    }
    return null;
}

export default TodoList;
