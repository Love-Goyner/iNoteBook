const express = require("express");
const routes = express.Router();
const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

//this is the endpoint for the user to fetch all notes in the app
routes.get("/fetchallnotes", fetchuser, async (req, res) => {
  //try will and if error occured cathc will run
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some Error aquired");
  }
});

//this is the endpoint for the user to add notes in the database
routes.post(
  "/addnote",
  fetchuser,
  body("title", "Enter a valid title").isLength({ min: 3 }),
  body("description", "Enter a valid description").isLength({ min: 5 }),
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    //try will and if error occured cathc will run
    try {
      const { title, description, tag } = req.body;

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some Error aquired");
    }
  }
);

//this is the endpoint for the user to update the notes in the app
routes.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    //Get the title , description, tag from the notes;
    const { title, description, tag } = req.body;

    //create a new node with the updated value
    const newNode = {};

    if (title) newNode.title = title;
    if (description) newNode.description = description;
    if (tag) newNode.tag = tag;

    //find the note
    let note = await Note.findById(req.params.id);

    //check if the node exist
    if (!note) {
      return res.status(404).send("Not Found");
    }

    //check if the person changing is the logined person
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("UnAutherised");
    }

    //update the note with the new updated value
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNode },
      { new: true }
    );

    res.send(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some Error aquired");
  }
});

//this is the endpoint for the user to delete the notes in the app
routes.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {  
      //find the note
      let note = await Note.findById(req.params.id);
  
      //check if the node exist
      if (!note) {
        return res.status(404).send("Not Found");
      }
  
      //check if the person changing is the logined person
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("UnAutherised");
      }
  
      //update the note with the new updated value
      note = await Note.findByIdAndDelete(req.params.id,);
      res.json({"success": "note has been deletes",note: note});
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some Error aquired");
    }
  });
  

module.exports = routes;
