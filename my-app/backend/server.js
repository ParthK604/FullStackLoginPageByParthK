import express from "express"
import cors from "cors"
const app=express()
const port=3000 || process.env.PORT

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Server is running fine");
});

app.post('/',(req,res)=>{
    console.log("The form is ",req.body);
    res.send("Data recieved successfully ");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});