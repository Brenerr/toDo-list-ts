import { Trash } from 'phosphor-react';
import styles from './Task.module.css';
import { TaskProps } from './TaskList';
import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

interface TaskPropsActions extends TaskProps {
    onDeleteTask: (id: string) => void;
    onToggleTask: (id: string) => void;
}

export function Task({ id, title, isComplete, publishedAt, onDeleteTask, onToggleTask }: TaskPropsActions) {

    function handleDeleteTask() {
        onDeleteTask(id);
    }

    function handleToggleTask() {
        onToggleTask(id);
    }

    const publishedDateFormatted = format(publishedAt, "dd 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR,
    });

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true,
    });

    return (
        <div className={`${styles.taskBox} ${isComplete && styles.boxCompleted}`}>
            <input
                type="checkbox"
                checked={isComplete}
                onChange={handleToggleTask}
            />
            <span>
                <p>
                    {title}
                </p>
                <time
                    title={publishedDateFormatted}
                    dateTime={publishedAt.toISOString()}
                    className={styles.pub}>
                    {publishedDateRelativeToNow}
                </time>
            </span>


            <button onClick={handleDeleteTask} title='Deletar tarefa'>
                <Trash fontSize="1.25em" />
            </button>
        </div>
    );
}