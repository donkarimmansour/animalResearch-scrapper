const ReportsControlles = require("../controlles/reports")
const router = require("express").Router()
const { ApiEndpoints } = require("../common/apiEndpoints"); 

// get Reports links
router.get(ApiEndpoints.Reports.getReportslinks , ReportsControlles.getReportslinks)

// get Report
router.get(ApiEndpoints.Reports.getAllReportslinks , ReportsControlles.getAllReportslinks)

// get All Reports links
router.get(ApiEndpoints.Reports.getReport , ReportsControlles.getReport)

// get All Reports
router.get(ApiEndpoints.Reports.getAllReports , ReportsControlles.getAllReports)

module.exports = router