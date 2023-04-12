import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import { Dialog, TextField, DialogTitle } from "@mui/material";
import React from "react";

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

const TitleInputFile = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const TaskCreator = () => {
  const [isOpened, setIsOpened] = React.useState(false);

  const handleClose = () => {
    setIsOpened(false);
  };

  const handleOnCliked = () => {
    setIsOpened(true);
  };

  return (
    <React.Fragment>
      <CreateButton
        onClick={handleOnCliked}
      >
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
            width: "80vw",
            height: "80vh",
            maxWidth: "644px",
            maxHeight: "672px",
          },
        }}
      >
        <TitleInputFile>
          <TextField id="standard-basic" label="Title" variant="standard" />
        </TitleInputFile>
      </Dialog>
    </React.Fragment>
  );
};

export default TaskCreator;
