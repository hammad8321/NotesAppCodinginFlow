import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import styles from "./styles/NotesPage.module.css";
import styleUtils from "./styles/utils.module.css";
import * as NotesApi from "./network/notes_api";
import AddEditNoteDialog from "./components/AddEditNoteDialog";
import { FaPlus } from "react-icons/fa";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  //const [clickCount, setClickCount] = useState(0);

  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();

        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }

    loadNotes();
  }, []);

  async function deleteNote(note: NoteModel) {
    //  await NotesApi.deleteNote(note._id);
    //   console.log("ID: ", note._id);
    //   setNotes(notes.filter(existingNote => existingNote._id!== note._id));
    try {
      await NotesApi.deleteNote(note._id);
      console.log("ID: ", note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Container>
      <Button
        className={`mb-4  ${styleUtils.blockCenter} ${styleUtils.flexCenter} `}
        onClick={() => setShowAddNoteDialog(true)}
      >
        <FaPlus />
        Add new note
      </Button>
      <Row xs={1} md={3} xl={4} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note
              onNoteClicked={setNoteToEdit}
              note={note}
              className={styles.note}
              onDeleteNoteClicked={deleteNote}
            />
          </Col>
        ))}

        {/*<Button
          onClick={() => {
            setClickCount(clickCount + 1);
          }}
        >
     
          Clicked {clickCount} times
        </Button>  */}
      </Row>

      {showAddNoteDialog && (
        <AddEditNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNotes) => {
            setNotes([...notes, newNotes]);
            setShowAddNoteDialog(false);
          }}
        />
      )}

      {noteToEdit && (
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updateNote) => {
            setNotes(notes.map(existingNote=> existingNote._id === updateNote._id ? updateNote : existingNote))
            setNoteToEdit(null);
          }}
        />
      )}
    </Container>
  );
}

export default App;
