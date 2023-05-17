const request = require('request');
const cheerio = require('cheerio');
const { ApiEndpoints } = require("../common/apiEndpoints");
const {insertReport, downloadImage, insertCategory } = require('./shared');

// get Reports links
const getReportslinks = (index) => {

//${ApiEndpoints.Reports.ReportsPageLink}${index}
    return new Promise((resolve, reject) => {

        const repeater = () => {
            request(`${ApiEndpoints.Reports.ReportsPageLink}${index}`, async (err, res, body) => {

                if (err) reject(err)

                else if (res.statusCode === 200) {
                    console.log(`Get Reports links => ${index}`);

                    const $ = cheerio.load(body)

                    const data = $('.container > div > a').map(function () {
                        return {
                            url: $(this).attr('href'),
                        }
                    }).get()

                    resolve(data)

                } else {

                        reject({ message: "getReportslinks", status: res.statusCode })

                }


            });

        }

        repeater()

    })
}

// get All Reports links
const getAllReportslinks = (limit) => {

    return new Promise(async (resolve, reject) => {

        let step = limit
        const Links = []

        const repeater = async () => {

            await getReportslinks(step).then(res => {

                res.map(link => {
                    Links.push(link)
                })

            }).catch(err => {
                reject({ message: err.message, status: err.status })
            })

            step--

            if (step <= 0) {
                resolve(Links)
            } else {
                await repeater()
            }



        }

        await repeater()

    })
}

function getRandom(length) {

    return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));

}


let index = 1

// get Report
const getReport = (url) => {

    return new Promise((resolve, reject) => {


        const repeater = async () => {
            //url
            request(encodeURI(url), async (err, res, body) => {
                if (err) reject(err)

                else if (res.statusCode === 200) {

                    console.log(`Get Report : ${index} => Start`);

                    const $ = cheerio.load(body);

                    const json = {
                        link: "",
                        title: "",
                        description: "",
                        phone: "",
                        address: "",
                        gender: "",
                        image: "",
                        category: "",
                        user: "",
                        status: true,
                        visible: true,
                        localisation: {
                            longitude: "",
                            latitude: ""
                        },
                        price: 0,
                        lostDate: new Date()
                    }


                    await new Promise((resolve) => {
                        setTimeout(() => {
                            resolve()
                        }, 1000)
                    })



                    json.link = url;
                    json.user = "645b7f85b41162e6fd73dc04";
                    
                    json.title = `cat ${index}`

                    json.gender = Math.floor(Math.random() * 2) == 1 ? "female" : "male"
                    json.price = getRandom(3)

                    $('.bg-white > .container > .mx-auto + .flex-wrap-reverse .w-full > .divide-y > tr').each(function () {
                        const type = $(this).find('th').text().trim()

                        if (type === "Adresse") {
                            json.address = $(this).find('td').text().trim()
                        } else if (type === "Coordonnées") {

                            const localisation = $(this).find('td').text().trim().split(",")
                            console.log({localisation})
                            
                            json.localisation.longitude = localisation[0]
                            json.localisation.latitude = localisation[1].trim()

                        }
                    })

                    json.localisation.latitude = json.localisation.latitude || `4.32161150`
                    json.localisation.longitude = json.localisation.longitude || `50.60343530`
                    json.address = json.address || `Rue Van Eyck 52, Brussels, Belgium`

                    // document.querySelectorAll(".bg-white > .container + .container.mb-6 + .container .text-left .w-full > .divide-y > tr")
                    // document.querySelectorAll(".bg-white > .container > .mx-auto + .flex-wrap-reverse .w-full > .divide-y > tr")


                    // document.querySelectorAll(".bg-white > .container + .container.mb-6 + .container .text-left .w-full > .divide-y > tr").forEach(e => {
                    //     const type = e.querySelector('th').textContent.trim()

                    //     if (type === "Auteur") {
                    //           console.log(e.querySelectorAll('td ul li.inline-block')[1].querySelector('div div a').textContent.trim())
                    //     }
                    // })


                    $('.bg-white > .container + .container.mb-6 + .container .text-left .w-full > .divide-y > tr').each(function () {
                        const type = $(this).find('th').text().trim()

                        if (type === "Date") {

                            json.lostDate = new Date($(this).find('td').text().trim().split(' ')[0].split('/').reverse().join('-'))
                        } else if (type === "Commentaire") {
                            json.description = $(this).find('td').text().trim()
                        } else if (type === "Espèce") {
                            json.category = $(this).find('td').text().trim()
                        }else if (type === "Auteur") {
                            json.phone = $(this).find('td ul li.inline-block').eq(1).find('div div a').text().trim()
                        }
                    })

                    json.phone = json.phone || `+33${getRandom(6)}`
                    
                    const Image = $('.container img').attr("src");

                    await insertCategory(json.category).then(res => {
                        json.category = res
                    }).catch(err => {
                        reject({ message: err.message, status: err.status })
                    })


                    await downloadImage(Image, json.title).then(res => {
                        json.image = res
                    }).catch(err => {
                        reject({ message: err.message, status: err.status })
                    })

                    
                    console.log({json})

                    await new Promise((resolve) => {
                        setTimeout(() => {
                            resolve()
                        }, 2000)
                    })


                    await insertReport(json).then(_res => {
                        resolve("")
                    }).catch(err => {
                        reject({ message: err.message, status: err.status })
                    })


                    index++
                } else {


                    reject({ message: "getReport", status: res.statusCode })

                }

            })
        }


        repeater()

    })
}

// get All Reports
const getAllReports = (limit) => {

    return new Promise(async (resolve, reject) => {

        const Links = []

        await getAllReportslinks(limit).then(async res => {

            res.map(link => {
                Links.push(link)
            })


            let step = 0, url = Links[0].url
            //const Reports = []

            const repeater = async () => {

                await getReport(url).then(report => {
                    // Reports.push(Report)
                    console.log(`Get Report : ${url} => Finished (${Links.length}/${(step + 1)})`);
                }).catch(err => {
                    reject(err)
                })



                if (step >= (Links.length - 1)) {
                    resolve("done")
                } else {
                    step++
                    url = Links[step].url

                    await repeater()
                }

            }

            await repeater()

        }).catch(err => {
            reject(err)
        })
    })
}


module.exports = { getReportslinks, getAllReportslinks, getReport, getAllReports }