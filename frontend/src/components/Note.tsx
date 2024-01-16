import React from "react";
import stylesUtils from "../styles/utils.module.css";
import { Note as NoteModel } from "../models/note";
import { Card } from "react-bootstrap";
import styles from "../styles/Note.module.css";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";

interface NoteProps {
  note: NoteModel;
  onNoteClicked:(note : NoteModel)=>void,
  onDeleteNoteClicked: (note: NoteModel) => void;
  className?: string;
}

const Note = ({ note, onDeleteNoteClicked,className, onNoteClicked  }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdatedText: string;

  if (updatedAt > createdAt) {
    createdUpdatedText = "Updated: " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created: " + formatDate(createdAt);
  }
  return (
    <div>
      <Card className={`${styles.noteCard}  ${className}`}
      onClick={()=>onNoteClicked(note)}>
        <Card.Body className={styles.cardBody}>
          <Card.Title className={stylesUtils.flexCenter}>
            {title}
            <MdDelete
              className="text-muted ms-auto"
              onClick={(error) => {
                onDeleteNoteClicked(note);
                error.stopPropagation();
              }}
            />
          </Card.Title>
          <Card.Text className={styles.noteText}>{text}</Card.Text>
        </Card.Body>

        <Card.Footer className="text-muted">{createdUpdatedText} </Card.Footer>
      </Card>
    </div>
  );
};

export default Note;
