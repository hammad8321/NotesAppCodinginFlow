import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    // throw Error("Bazinga!");
   // throw createHttpError(401);
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "invalid noteeeeeeeeeeee");
    }
    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, "Note not ha ");
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

interface CreateNoteBody {
  title?: string;
  text?: string;
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;
  try {
    if (!title) {
      throw createHttpError(400, "Note mush have a tiliel ");
    }
    const newNote = await NoteModel.create({
      title: title,
      text: text,
    });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};
interface UpdateNotePrams {
  noteId: string;
}

interface UpdateNoteBody {
  title?: string;
  text?: string;
}

export const updateNote: RequestHandler<
  UpdateNotePrams,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  const noteId = req.params.noteId;
  const newTitle = req.body.title;
  const newText = req.body.text;

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "invalid noteeeeeeeeeeee update");
    }
    if (!newTitle) {
      throw createHttpError(400, "Note mush have a tiliel update ");
    }

    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, "Note not ha update");
    }

    note.title= newTitle;
    note.text = newText;

    const updatedNote = await note.save();

   // NoteModel.findOneAndUpdate

   res.status(200).json(updatedNote);

  } catch (error) {
    next(error);
  }
};

export const deleteNote : RequestHandler = async (req, res, next )=>{
  const noteId = req.params.noteId;

  try {

    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "invalid noteeeeeeeeeeee update");
    }

    const note = await NoteModel.findById(noteId).exec();

    if(!note){
      throw createHttpError(404, "note no found del ")
    }
    //await.note.remove();
    await note.deleteOne();
    //NoteModel.findById
  
    res.sendStatus(200);

  }catch(error){
    next(error)
  }

}
