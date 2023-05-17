const { ApiEndpoints } = require("../common/apiEndpoints")
const { app  } = require("../server")

const Reports = require("../routers/reports")

app.use(ApiEndpoints.Reports.route, Reports)

app.use((req, res, next) => {
    res.status(404).json("Api not found") 
})

app.listen(process.env.PORT || 3000 , () => {
    console.log("server start")
})







