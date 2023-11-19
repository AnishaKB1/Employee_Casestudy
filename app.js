// Task1: initiate app and run server at 3000
const express = require('express');
const mongoose=require('mongoose');
const path=require('path');
const app=new express();
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
const empdata=require('./model/employee');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Task2: create mongoDB connection 

//mongoose.connect('mongodb://127.0.0.1:27017/EmployeeDB')
mongoose.connect('mongodb+srv://anishakb4:7736199279@cluster0.aj0wsfj.mongodb.net/EmployeeDB?retryWrites=true&w=majority')

.then(() => {
    console.log("Connected to EmployeeDB");
  })
  .catch((error) => {
    console.error("Error connecting to EmployeeDB:", error);
  });






//Task 2 : write api with error handling and appropriate api mentioned in the TODO below







//TODO: get data from db  using api '/api/employeelist'

app.get("/api/employeelist", async (req, res) => {
  try {
    const getemp = await empdata.find();
    res.json(getemp);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
});





//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id', async (req, res) => {
  try{
      const data = await empdata.findById(req.params.id);
      res.json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})








//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist', async (req, res) => {
  const data = new empdata({
       name: req.body.name,
      position: req.body.position,
      location :req.body.location,
      salary :req.body.salary
  })

  try {
      const dataToSave = await data.save();
      res.status(200).json(dataToSave)
  }
  catch (error) {
      res.status(400).json({message: error.message})
  }
})




//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const data = await empdata.findByIdAndDelete(id);
      res.json(`Document with ${data.name} has been deleted..`);
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})


//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}


app.put("/api/employeelist", async (req, res) => {
  try {
 
  const updateddata = req.body;
  const result = await empdata.findOneAndUpdate({_id:updateddata._id},updateddata);
   
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});



     





//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
})