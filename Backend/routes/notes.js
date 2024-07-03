const express = require("express");

const routerNotes = express.Router();
const fetchuser = require("../middlewares/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route:1 - get all the notes , login required
routerNotes.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

//Route:2 - add a note , login required
routerNotes.post(
  "/addnote",

  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "description must be atleast 5 char").isLength({
      min: 5,
    }),
  ],

  fetchuser,

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(), //sare errors ko print karwadiya
      });
    }

    try {
      const { title, description, tag } = req.body;

      const note = new Notes({
        title,
        description,
        tag: (tag==="")?"General":tag,
        user: req.user.id,
      });

      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  }
);

// Route-3: Update an existing note , login required
routerNotes.put(
  "/updatenote/:id",
  fetchuser,

 async (req, res) => {

  try {
    const {title, description, tag} = req.body;

    // create a newNote obj
    const newNote = {};

    if(title) {
      newNote.title = title
    }

    if(description) {
      newNote.description = description
    }

    if(tag) {
      newNote.tag = tag
    }

    // find the note to be updated 
    let note =await Notes.findById(req.params.id);

    if(!note) {
      return res.status(404).send('not found')  // error anepar return jarue kro 
    }

    if(note.user.toString() !== req.user.id){
      return res.status(401).send('not allowed')
    }

    note= await Notes.findByIdAndUpdate(req.params.id , {$set: newNote}, {new: true})
    res.json({
      note  // here the note is updated note 
    })

  } catch (error) {
    console.log(error);
        res.status(500).send("Internal server error");
  }

   
    
 }
);



// Route-4: Delete an existing note , login required


routerNotes.delete(
  "/deletenote/:id",
  fetchuser,

 async (req, res) => {


   
      try {
        
    // find the note to be deleted
    let note =await Notes.findById(req.params.id);

    if(!note) {
      return res.status(404).send('not found')  // error anepar return jarue kro 
    }

    // allow deletion only if the loggeduser owns this note
    if(note.user.toString() !== req.user.id){
      return res.status(401).send('not allowed')
    }

     await Notes.findByIdAndDelete(req.params.id )
      res.json({
        message: "success , note has been deleted"
      })
      } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
      }
    
 }
);
module.exports = routerNotes;
