import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useMemo, useRef } from "react";
import ImageGallery from "../components/ImageGallery";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { setActiveNote } from "../../store/journal/journalSlice";
import { startDeleteNote, startSaveNote, startUploadingFiles } from "../../store/journal/thunks";
import Swal from "sweetalert2";

const NoteView = () => {
  const dispatch = useDispatch();
  const {
    active: note,
    messageSaved,
    isSaving,
  } = useSelector((state) => state.journal);
  const { body, title, date, onInputChange, formState } = useForm(note);

  const fileInputRef = useRef();
  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  useEffect(() => {
    //update active note with updated information
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Note Updated", messageSaved, "success");
    }
  }, [messageSaved]);

  const handlerUpdateNote = () => {
    dispatch(startSaveNote());
  };

  const onFileInputChange = ({target}) => {
    if (target.files === 0)  return;
    dispatch(startUploadingFiles( target.files ));
  };

  const onDelete = () => {
    dispatch(startDeleteNote());
  };

  return (
    <Grid
      container
      direction={"row"}
      justifyContent={"space-between"}
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontWeight={"light"} fontSize={39}>
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <input 
          type="file"
          multiple
          onChange={ onFileInputChange }  
          style={{display: "none"}}
          ref={ fileInputRef }
        />
        <IconButton
          color="primary"
          disabled={ isSaving }
          onClick={ () => fileInputRef.current.click() }  
        >
          <UploadOutlined />
        </IconButton>
        <Button
          onClick={handlerUpdateNote}
          disabled={isSaving}
          color="primary"
          sx={{ padding: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Title here"
          label="Title"
          sx={{ border: "none", mb: 1 }}
          value={title}
          name="title"
          onChange={onInputChange}
        />
        <TextField
          type="text"
          variant="filled"
          multiline
          fullWidth
          placeholder="What happen today?"
          minRows={5}
          value={body}
          name="body"
          onChange={onInputChange}
        />
      </Grid>
      <Grid container justifyContent={'end'}>
        <Button
          onClick={ onDelete }
          sx={{ mt: 2}}
          color="error"
        >
          <DeleteOutline />
          Borrar
        </Button>

      </Grid>
      <ImageGallery images={ note.imageUrl } />
    </Grid>
  );
};

export default NoteView;
