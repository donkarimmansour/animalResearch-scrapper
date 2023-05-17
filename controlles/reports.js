const ReportsServices = require("../services/reports")
const codes = require("../common/codes")


// get Reports links
const getReportslinks = (req, res) => {
    const {index} = req.params ;

    ReportsServices.getReportslinks(index).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(err => {
        res.status(codes.badRequest).json({err: true, msg : err})
    })
}

// get All Reports links
const getAllReportslinks = (req, res) => {
    const {limit} = req.params ;

    ReportsServices.getAllReportslinks(limit).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(err => {
        res.status(codes.badRequest).json({err: true, msg : err})
    })
}



// get Report
const getReport = (req, res) => {
    const {url} = req.params ;

    ReportsServices.getReport(url).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(err => {
        res.status(codes.badRequest).json({err: true, msg : err})
    })
}



// get All Reports
const getAllReports = (req, res) => {
    const {limit} = req.params ;

    ReportsServices.getAllReports(limit).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(err => {
        res.status(codes.badRequest).json({err: true, msg : err})
    })
}


module.exports = { getReportslinks , getAllReportslinks , getReport ,  getAllReports }