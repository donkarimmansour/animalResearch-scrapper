const mongoose = require("mongoose")


const DB_URL = "mongodb://127.0.0.1:27017/zaki"

function DB() {
    return mongoose.connect(DB_URL, (err) => {
        if (err) throw new Error("db error")
        console.log("db start")
    })

}


module.exports = DB