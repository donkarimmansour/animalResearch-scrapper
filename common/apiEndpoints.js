const Host = {
  ROOT: "http://localhost:3000",
  PREFIX: "/v1/api",
}
  
const ApiEndpoints = {  


  Reports: {
    route: `${Host.PREFIX}/reports`,
    getAllReportslinks: `/getAllReportslinks/:limit`,
    getReportslinks: `/getReportslinks/:index`,
    getAllReports: `/getAllReports/:limit`,
    getReport: `/getReport/:url(*)`,
    ReportsPageLink: `https://www.animal-research.be/fr/reports?page=`,
  },


};

module.exports = {ApiEndpoints , Host}