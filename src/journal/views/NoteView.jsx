import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import ImageGallery from "../components/ImageGallery";

const NoteView = () => {
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
          1 May, 2023
        </Typography>
      </Grid>
      <Grid item>
        <Button color="primary" sx={{ padding: 2 }}>
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
        />
        <TextField
          type="text"
          variant="filled"
          multiline
          fullWidth
          placeholder="What happen today?"
          minRows={5}
        />
      </Grid>
      <ImageGallery />
    </Grid>
  );
};

export default NoteView;
