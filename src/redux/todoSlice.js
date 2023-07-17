import { createSlice, isAnyOf, nanoid } from "@reduxjs/toolkit";
import { createListenerMiddleware } from "@reduxjs/toolkit";

const template = {
  tasks: {
    "task-1": {
      id: "task-1",
      title: "task 1",
      description: "Content for task 1",
      deadline: 1508330494000,
    },
    "task-2": {
      id: "task-2",
      title: "task-2",
      description: "Content for task 2",
      deadline: 1508330494000,
    },
    "task-3": {
      id: "task-3",
      title: "task-3",
      description: "Content for task 3",
      deadline: 1508330494000,
    },
    "task-4": {
      id: "task-4",
      title: "task-4",
      description: "Content for task 4",
      deadline: 1508330494000,
    },
  },
  columns: {
    "column-1": { id: "column-1", title: "Todo", taskIds: ["task-1"] },
    "column-2": {
      id: "column-2",
      title: "In progress",
      taskIds: ["task-2", "task-3"],
    },
    "column-3": { id: "column-3", title: "Review", taskIds: [] },
    "column-4": { id: "column-4", title: "Completed", taskIds: ["task-4"] },
  },
  columnOrder: ["column-1", "column-2", "column-3", "column-4"],
};

const initialState = JSON.parse(localStorage.getItem("todo")) || template;

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: {
      prepare: ({ title, description, deadline, columnId }) => {
        return {
          payload: {
            id: nanoid(),
            title,
            description,
            deadline,
            columnId,
          },
        };
      },
      reducer: (state, action) => {
        const { id, title, description, deadline, columnId } = action.payload;
        state.tasks[id] = {
          id,
          title,
          description,
          deadline,
        };

        state.columns[columnId].taskIds.push(id);
      },
    },
    editTask: {
      prepare: ({ taskId, title, description, deadline }) => {
        return {
          payload: {
            taskId,
            title,
            description,
            deadline,
          },
        };
      },
      reducer: (state, action) => {
        const { taskId, title, description, deadline } = action.payload;
        state.tasks[taskId] = {
          id: taskId,
          title,
          description,
          deadline,
        };
      },
    },
    deleteTask: {
      prepare: ({ taskId, columnId }) => {
        return {
          payload: {
            taskId,
            columnId,
          },
        };
      },
      reducer: (state, action) => {
        const { taskId, columnId } = action.payload;
        delete state.tasks[taskId];

        const column = state.columns[columnId];
        column.taskIds = column.taskIds.filter((_taskId) => _taskId !== taskId);
      },
    },
    moveTask: {
      prepare: ({
        sourceColumnId,
        destinationColumnId,
        sourceIndex,
        destinationIndex,
        taskId,
      }) => {
        return {
          payload: {
            sourceColumnId,
            destinationColumnId,
            sourceIndex,
            destinationIndex,
            taskId,
          },
        };
      },
      reducer: (state, action) => {
        const {
          sourceColumnId,
          destinationColumnId,
          sourceIndex,
          destinationIndex,
          taskId,
        } = action.payload;

        if (sourceColumnId === destinationColumnId) {
          const column = state.columns[sourceColumnId];
          const taskIds = [...column.taskIds];
          taskIds.splice(sourceIndex, 1);
          taskIds.splice(destinationIndex, 0, taskId);
          column.taskIds = taskIds;
        } else {
          const sourceColumn = state.columns[sourceColumnId];
          const destinationColumn = state.columns[destinationColumnId];
          const sourceTaskIds = [...sourceColumn.taskIds];
          sourceTaskIds.splice(sourceIndex, 1);
          sourceColumn.taskIds = sourceTaskIds;

          const destinationTaskIds = [...destinationColumn.taskIds];
          destinationTaskIds.splice(destinationIndex, 0, taskId);
          destinationColumn.taskIds = destinationTaskIds;
        }
      },
    },
  },
});

export const { addTask, editTask, deleteTask, moveTask } = todoSlice.actions;

export default todoSlice.reducer;

export const toDoListenerMiddleware = createListenerMiddleware();

toDoListenerMiddleware.startListening({
  matcher: isAnyOf(addTask, editTask, deleteTask, moveTask),
  effect: async (action, listenerApi) => {
    localStorage.setItem("todo", JSON.stringify(listenerApi.getState().todo));
  },
});

export const selectColumnOrder = (state) => state.todo.columnOrder;
export const selectColumnById = (state, columnId) =>
  state.todo.columns[columnId];
export const selectTaskById = (state, taskId) => state.todo.tasks[taskId];
