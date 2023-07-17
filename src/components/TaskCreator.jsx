import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import {
  Dialog,
  TextField,
  Box,
  Button,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/todoSlice";

const CreateButton = styled.div`
  padding: 8px;
  margin: 8px;
  border-radius: 10px;
  color: #5e6c84;
  &:hover {
    background-color: #f1f1f1;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
  &:active {
    background-color: #e1e1e1;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  }
  align-items: center;

  display: flex;
`;

const StyledIconContainer = styled.div`
  padding-right: 10px;
  display: flex;
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const TaskCreator = (props) => {
  const { columnId } = props;
  const [isOpened, setIsOpened] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [deadline, setDeadline] = useState(dayjs());
  const [desciption, setDesciption] = useState("");
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const handleClose = () => {
    setIsOpened(false);
  };

  const handleOnCliked = () => {
    setIsOpened(true);
  };

  const handleSubmit = () => {
    if (title === "") {
      setError(true);
      return;
    }

    dispatch(
      addTask({
        title: title,
        description: desciption,
        deadline: deadline.valueOf(),
        columnId: columnId,
      })
    );

    handleClose();
    handleReset();
  };

  const handleReset = () => {
    setTitle("");
    setDeadline(dayjs());
    setDesciption("");
    setError(false);
  };

  return (
    <React.Fragment>
      <CreateButton onClick={handleOnCliked}>
        <StyledIconContainer>
          <AddIcon />
        </StyledIconContainer>
        create task
      </CreateButton>

      <Dialog
        open={isOpened}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="simple-dialog-title"
        sx={{
          "& .MuiPaper-root": {
            display: "flex",
            color: "#2C82C1",
            width: "40vw",
            height: "50vh",
            maxWidth: "644px",
            maxHeight: "452px",
            minHeight: "200px",
          },
        }}
      >
        <DialogContent dividers={true}>
          <TextField
            error={error && title === ""}
            id="title-input"
            label="Title"
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
            value={desciption}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReset}>Reset</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default TaskCreator;
