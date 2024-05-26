import { connect } from "mongoose";
connect("mongodb://localhost:27017/contactMe").then(()=>{
    console.log("connection succesful hue");
}).catch((e) => {
    console.log("no connection");
});

