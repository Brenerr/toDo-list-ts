import { PlusCircle } from 'phosphor-react';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { Task } from './Task';
import styles from './TaskList.module.css';
import { v4 as uuidv4 } from 'uuid';
import emptyImg from '../assets/Clipboard.svg';

export interface TaskProps {
    id: string;
    title: string;
    isComplete: boolean;
    publishedAt: Date;
}

export function TaskList() {

    const [tasks, setTasks] = useState(Array<TaskProps>);

    const [newTaskText, setNewTaskText] = useState('');

    const isNewTaskEmpty = newTaskText.length === 0;

    const tasksCompleted = tasks.filter(task => task.isComplete === true).length;

    function handleCreateNewTask(event: FormEvent) {
        event.preventDefault();
        const newTask =
        {
            id: uuidv4(),
            title: newTaskText,
            isComplete: false,
            publishedAt: new Date()
        }

        let newList = [...tasks];
        newList.unshift(newTask);
        sortTasks(newList);
        setNewTaskText('');
    }

    function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório!');
    }

    function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity('');
        setNewTaskText(event.target.value);
    }

    function deleteTask(taskToDelete: string) {
        const tasksWithoutDeleteOne = tasks.filter(task => task.id !== taskToDelete);
        setTasks(tasksWithoutDeleteOne);
    }

    function toggleTask(taskToChange: string) {
        let newList = [...tasks];
        const fromIndex = newList.findIndex(task => task.id === taskToChange);
        const task = newList.splice(fromIndex, 1)[0];
        task.isComplete = !task.isComplete;
        task.publishedAt = new Date();
        newList.splice(0, 0, task);
        sortTasks(newList);
    }

    function sortTasks(newTasks: TaskProps[]) {
        newTasks.sort((a, b) => a.isComplete < b.isComplete ? -1 : 0);
        setTasks(newTasks);
    }

    return (
        <div>
            <form onSubmit={handleCreateNewTask} className={styles.taskForm}>
                <input
                    type="text"
                    placeholder='Adicione uma nova tarefa'
                    name='task'
                    value={newTaskText}
                    onChange={handleNewTaskChange}
                    onInvalid={handleNewTaskInvalid}
                    required
                />
                <button type='submit' disabled={isNewTaskEmpty}>
                    Criar
                    <PlusCircle fontSize="1.25em" />
                </button>
            </form>

            <header className={styles.taskHeader}>
                <strong>Tarefas criadas
                    <span>{tasks.length}</span>
                </strong>
                <strong>Concluidas
                    <span>
                        {tasksCompleted}
                        {tasks.length > 0 && ` de ${tasks.length}`}
                    </span>
                </strong>
            </header>

            <div className={styles.taskList}>
                {
                    tasks.length > 0
                        ? tasks.map(task => {
                            return (
                                <Task
                                    key={task.id}
                                    id={task.id}
                                    title={task.title}
                                    isComplete={task.isComplete}
                                    publishedAt={task.publishedAt}
                                    onDeleteTask={deleteTask}
                                    onToggleTask={toggleTask}
                                />
                            )
                        })

                        : <div className={styles.taskEmpty}>
                            <img src={emptyImg} alt="Icon Clipboard" />
                            <strong>Você ainda não tem tarefas cadastradas</strong>
                            <p>Crie tarefas e organize seus itens a fazer</p>
                        </div>
                }
            </div>
        </div>
    );
}