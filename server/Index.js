const express = require('express')
const mongoose = require('mongoose')
const router = require('./Router/route')

mongoose.set('strictQuery',false)
const app = express()
app.use(express.json())

mongoose.connect("mongodb+srv://Pal25:Pallavi2552@cluster0.hihf8kq.mongodb.net/Company-Assignment-7")
.then(() => console.log("MongoDb is connected"))
.catch((err) => console.error(err.message))

app.use('/', router)

app.listen(3000, () => {
      console.log("Express app running on port " + 3000);
})