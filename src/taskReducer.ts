import { v4 as uuidv4 } from 'uuid';
import { TaskType } from './components/Column';

export type ColumnType = {
    id: string;
    title: string;
    itemsList: TaskType[];
};

export enum BoardActions {
    BOARD_ADDED = 'board_added',
    BOARD_REMOVED = 'board_removed',
    TASK_ADDED = 'task_added',
    TASK_FINISHED = 'task_finished',
    TITLE_CHANGED = 'title_changed',
    DRAG_DROP = 'drag_start',
}

type AddBoardAction = {
    type: BoardActions.BOARD_ADDED;
};

type RemoveBoardAction = {
    type: BoardActions.BOARD_REMOVED;
};

type AddTaskAction = {
    type: BoardActions.TASK_ADDED;
    columnId: string;
    newTask: TaskType;
};

type FinishTaskAction = {
    type: BoardActions.TASK_FINISHED;
    columnId: string;
    taskId: string;
};

type ChangeTitleAction = {
    type: BoardActions.TITLE_CHANGED;
    title: string;
    columnId: string;
};

type DragStartAction = {
    type: BoardActions.DRAG_DROP;
    taskId: string;
    columnId: string;
    currentColumn: ColumnType;
    currentTask: TaskType;
    column: ColumnType;
    task: TaskType;
};

export type BoardActionTypes =
    | AddBoardAction
    | RemoveBoardAction
    | AddTaskAction
    | FinishTaskAction
    | ChangeTitleAction
    | DragStartAction;

export const initialTasks: ColumnType[] = [
    {
        id: uuidv4(),
        title: 'Доска № 1',
        itemsList: [
            { id: uuidv4(), value: 'Task 1', done: false },
            { id: uuidv4(), value: 'Task 2', done: false },
            { id: uuidv4(), value: 'Task 3', done: false },
            { id: uuidv4(), value: 'Task 4', done: false },
            { id: uuidv4(), value: 'Task 5', done: false },
            { id: uuidv4(), value: 'Task 6', done: false },
        ],
    },
    {
        id: uuidv4(),
        title: 'Доска № 2',
        itemsList: [
            { id: uuidv4(), value: 'Task 7', done: false },
            { id: uuidv4(), value: 'Task 8', done: false },
            { id: uuidv4(), value: 'Task 9', done: false },
        ],
    },
    // {
    //     id: uuidv4(),
    //     title: 'Доска № 3',
    //     itemsList: [
    //         { id: uuidv4(), value: 'Task 7', done: false },
    //         { id: uuidv4(), value: 'Task 8', done: false },
    //         { id: uuidv4(), value: 'Task 9', done: false },
    //     ],
    // },
];

export const taskReducer = (
    state: ColumnType[],
    action: BoardActionTypes
): ColumnType[] => {
    switch (action.type) {
        case BoardActions.BOARD_ADDED: {
            return [
                ...state,
                {
                    id: uuidv4(),
                    title: `Доска № ${state.length + 1}`,
                    itemsList: [
                        { id: uuidv4(), value: 'Task 7', done: false },
                        { id: uuidv4(), value: 'Task 8', done: false },
                        { id: uuidv4(), value: 'Task 9', done: false },
                    ],
                },
            ];
        }
        case BoardActions.BOARD_REMOVED: {
            return state.filter(
                (item) => state.indexOf(item) !== state.length - 1
            );
        }
        case BoardActions.TASK_ADDED: {
            return state.map((column) => {
                if (action.columnId === column.id) {
                    return {
                        ...column,
                        itemsList: [...column.itemsList, action.newTask],
                    };
                }
                return column;
            });
        }

        case BoardActions.TASK_FINISHED: {
            return state.map((column) => {
                if (column.id === action.columnId) {
                    return {
                        ...column,
                        itemsList: column.itemsList.map((task) => ({
                            ...task,
                            done:
                                task.id === action.taskId
                                    ? !task.done
                                    : task.done,
                        })),
                    };
                }
                return column;
            });
        }

        case BoardActions.TITLE_CHANGED:
            return state.map((column) => {
                if (column.id === action.columnId) {
                    return { ...column, title: action.title };
                }
                return column;
            });

        case BoardActions.DRAG_DROP: {
            const { currentTask, currentColumn, column, task } = action;
            // console.log('task', task);
            // console.log('curr task', currentTask);
            const currentIndex = currentColumn.itemsList.indexOf(currentTask);
            // console.log('curr index', currentIndex);
            currentColumn.itemsList.splice(currentIndex, 1);
            const dropIndex = column.itemsList.indexOf(task);
            // console.log('dropIndex:', dropIndex);
            column.itemsList.splice(dropIndex + 1, 0, currentTask);
            return state.map((c) => {
                if (c.id === column.id) {
                    return column;
                }
                if (c.id === currentColumn.id) {
                    return currentColumn;
                }
                return c;
            });
        }

        default: {
            return state;
        }
    }
};
