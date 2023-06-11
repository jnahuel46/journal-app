import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal/journalSlice";

const SideBarItem = ({ note }) => {
  
  const dispatch = useDispatch();
const { title, body, id, date, imageUrl= [] } = note;
  const handlerSetActive = () => {
    dispatch(setActiveNote({title, body, id, date, imageUrl}));
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handlerSetActive}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={title} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

export default SideBarItem;
