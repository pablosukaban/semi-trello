import { v4 as uuidv4 } from 'uuid';
import { TaskType } from './components/Column';

export type BoardType = {
    id: string;
    title: string;
    itemsList: TaskType[];
};

export enum BoardActions {
    BOARD_ADDED = 'board_added',
    BOARD_REMOVED = 'board_removed',
    TASK_ADDED = 'task_added',
    TASK_FINISHED = 'task_finished',
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

export type BoardActionTypes =
    | AddBoardAction
    | RemoveBoardAction
    | AddTaskAction
    | FinishTaskAction;

export const initialTasks: BoardType[] = [
    {
        id: uuidv4(),
        title: 'Доска № 1',
        itemsList: [
            { id: uuidv4(), value: 'Task 1', done: false },
            { id: uuidv4(), value: 'Task 2', done: false },
            { id: uuidv4(), value: 'Task 3', done: false },
        ],
    },
    {
        id: uuidv4(),
        title: 'Доска № 2',
        itemsList: [
            { id: uuidv4(), value: 'Task 4', done: false },
            { id: uuidv4(), value: 'Task 5', done: false },
            { id: uuidv4(), value: 'Task 6', done: false },
        ],
    },
    {
        id: uuidv4(),
        title: 'Доска № 3',
        itemsList: [
            { id: uuidv4(), value: 'Task 7', done: false },
            { id: uuidv4(), value: 'Task 8', done: false },
            { id: uuidv4(), value: 'Task 9', done: false },
        ],
    },
];

export const taskReducer = (
    state: BoardType[],
    action: BoardActionTypes
): BoardType[] => {
    switch (action.type) {
        case BoardActions.BOARD_ADDED: {
            return [
                ...state,

                {
                    id: uuidv4(),
                    title: `Доска № ${state.length}`,
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

        default: {
            return state;
        }
    }
};
