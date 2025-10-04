import {app} from './App.js'
import dotenv from 'dotenv';
dotenv.config();
import connectToDatabase from './db/index.js';


// Connect to the database and configure the server
connectToDatabase()
.then(()=>{
    console.log("Database connected successfully");

    app.listen(process.env.PORT || 3000,()=>{
        console.log(`server is running ${process.env.PORT }`);
    })

    app.on("error",(error)=>{
        throw new Error(`Express server error in server : ${error.message}`);
    })
})
.catch((error)=>{
    console.log("Express server error in server : ",error.message);
    process.exit(1);
})


app.get('/',(req,res)=>{

    res.send('Hello World');
})

