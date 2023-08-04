import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Button,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import styled from "styled-components";
import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editTask } from "../redux/todoSlice";

import ClearIcon from "@mui/icons-material/Clear";

const StyledDialogHeader = styled.div`
  display: flex;
  margin-bottom: 16px;
  justify-content: space-between;
  color: #1c1c1c;
`;

const StyledDialog = styled(Dialog)`
  & .MuiPaper-root {
    display: flex;
    color: #2c82c1;
    width: 40vw;
    height: 50vh;
    max-width: 644px;
    max-height: 452px;
    min-height: 360px;
    border-radius: 20px;
  }
`;

const StyledDialogActions = styled(DialogActions)`
  button {
    color: #1C1C1C;
  }
`;

const TaskEditor = (props) => {
  const { task, isOpened, handleCloseTaskEditor } = props;
  const [title, setTitle] = useState(task.title);
  const [deadline, setDeadline] = useState(dayjs(task.deadline));
  const [description, setDesciption] = useState(task.description);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const handleReset = () => {
    setTitle(task.title);
    setDeadline(dayjs(task.deadline));
    setDesciption(task.description);
  };

  const handleSubmit = () => {
    if (title === "") {
      setError(true);
      return;
    }

    // check the deadline cannot be earlier than today
    if (deadline.startOf("day").valueOf() < dayjs().startOf("day").valueOf()) {
      setError(true);
      return;
    }

    dispatch(
      editTask({
        taskId: task.id,
        title: title,
        description: description,
        deadline: deadline.valueOf(),
      })
    );

    handleCloseTaskEditor();
  };

  return (
    <StyledDialog
      open={isOpened}
      onClose={handleCloseTaskEditor}
      scroll={"paper"}
      aria-labelledby="simple-dialog-title"
    >
      <DialogContent dividers={true}>
        <StyledDialogHeader>
          <h2>Edit Task</h2>
          <ClearIcon
            onClick={handleCloseTaskEditor}
            sx={{ cursor: "pointer" }}
          />
        </StyledDialogHeader>
        <TextField
          error={error && title === ""}
          id="title-input"
          label="Title*"
          variant="standard"
          fullWidth
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          sx={{ marginBottom: "16px" }}
          value={title}
        />
        <Box sx={{ marginBottom: "16px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                error={error && deadline.day() <= dayjs().day()}
                label="Deadline"
                value={deadline}
                minDate={dayjs()}
                onChange={(newValue) => setDeadline(newValue)}
                format="MM-DD-YYYY"
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <TextField
          id="outlined-multiline-static"
          label="Desciption"
          fullWidth
          multiline
          onChange={(e) => setDesciption(e.target.value)}
          value={description}
        />
      </DialogContent>
      <StyledDialogActions>
        <Button onClick={handleReset}>Reset</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </StyledDialogActions>
    </StyledDialog>
  );
};

export default TaskEditor;
