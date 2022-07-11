const express = require('express');
const Model = require('../models/model');
const router = express.Router()

module.exports = router;

//Post method
router.post('/post', async (req, res) =>{
  const data = new Model({
    name: req.body.name,
    age: req.body.age
  })
  try{
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
  }
  catch(error){
    res.status(400).json({message: error.message})  
  }
})

//get all
router.get('/getAll', async (req, res) => {
  try{
    const data = await Model.find();
    res.json(data)
  }
  catch(error){
    res.status(500).json({message: error.message})
  }
})

//get one
router.get('/getOne/:id', async (req, res) => {
  try{
    const data = await Model.findById(req.params.id);
    res.json(data)
  }
  catch(error){
    res.status(500).json({message: error.message})
  }
})

//update one
router.patch('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(
        id, updatedData, options
    )

    res.send(result)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//delete by id
router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id)
    res.send(`Document with ${data.name} has been deleted..`)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})