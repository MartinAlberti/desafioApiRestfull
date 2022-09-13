const path = require("path")
const express = require("express");
const apiRoutes = require("./routers/app.routers")

const app = express()
const PORT = process.env.PORT || 8080


// Middlewares
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("public"));


//Routes

app.use("/api", apiRoutes)




const conectedServer = app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
})

conectedServer.on("error", (error) => {
    console.log(error.message);
})