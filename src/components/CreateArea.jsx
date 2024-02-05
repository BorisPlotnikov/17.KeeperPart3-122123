import React, { useState } from "react";
import PropTypes from "prop-types";
import Zoom from "@mui/material/Zoom";
import IconButton from "@mui/material/IconButton";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";

function CreateArea({ onAdd }) {
  const [isFormInUse, setFormInUse] = useState(false);
  const openForm = () => setFormInUse(true);
  const closeForm = () => setFormInUse(false);

  const initialNoteState = { title: "", body: "" };
  const [note, setNote] = useState(initialNoteState);
  const handleInput = ({ target: { name, value } }) =>
    setNote((note) => ({ ...note, [name]: value }));

  const submitNote = (event) => {
    event.preventDefault();
    if (note.title !== "" || note.body !== "") {
      onAdd(note);
    }
    setNote(initialNoteState);
    closeForm();
  };

  return (
    <div>
      <form
        onClick={openForm}
        onKeyDown={(event) => event.key === "Enter" && submitNote(event)}
      >
        <input
          onChange={handleInput}
          value={note.title}
          name="title"
          placeholder={isFormInUse ? "New title..." : "Take a note..."}
        />
        {isFormInUse && (
          <textarea
            onChange={handleInput}
            value={note.body}
            name="body"
            placeholder="New content"
            rows="3"
          />
        )}
        <Zoom in={isFormInUse}>
          <IconButton
            className="form-button"
            size="large"
            type="submit"
            aria-label="add"
          >
            <NoteAddOutlinedIcon />
          </IconButton>
        </Zoom>
      </form>
    </div>
  );
}

CreateArea.propTypes = {
  onAdd: PropTypes.func.isRequired
};
export default CreateArea;
