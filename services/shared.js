const request = require('request');
const fs = require('fs');
const ReportsModal = require("../models/reports")
const mediaModal = require("../models/media")
const categoriesModel = require("../models/categories")

// insert Report
const insertReport = (data) => {

    return new Promise(async (resolve, reject) => {

        const { 
            title, description, phone, address, gender, image, category, user, status, visible, localisation, price, lostDate
        } = data

        //insert
        ReportsModal.create({
            title, description, phone, address, gender, image, category, user, status, visible, localisation, price, lostDate
        }).then(doc => {
            resolve(doc._id)

        }).catch(_err => {
            console.log(_err);
            reject({ message: "insertReport", status: 400 })
        })

    })

}

// insert Category
const insertCategory = (name) => {

    return new Promise((resolve, reject) => { // check category

        categoriesModel.findOne({}).where("name").equals(name).then(category => {

            if (category) {
                resolve(category._id)
            } else {


                const newCategory = new categoriesModel({ name, visible: true, description: name + "..." })

                newCategory.save()
                    .then(doc => { resolve(doc["_id"]) })
                    .catch(err => { reject(err) })

            }
        }).catch(err => { reject(err) })


    })
}

 
// insert File
const insertFile = (fileName) => {

    return new Promise(async (resolve, reject) => {

        //insert
        mediaModal.create({
            url: fileName
        }, (errCreate, doc) => {
            if (errCreate) {
                reject({ message: "insertFile", status: 400 })
            } else {
                resolve(doc._id)
            }

        })

    })

}



const downloadImage = (url, title) => {

    return new Promise(async (resolve, reject) => {

        const fileName = `${title.replace(/[ /\\]/g, "-")}.jpg`
        const dest = `./images`
        const path = `${dest}/${fileName}`
        let counter = 0

        const repeater = () => {

            console.log(`Download Image => (${counter}) : ${title} =>(${fileName})`);

            if (counter >= 50) {
                reject({ message: "downloadImage", status: 400 })
            } else {

                //file exists
                if (fs.existsSync(path)) {
                    fs.unlink(path, err => {
                        if (err) reject({ message: "downloadImage => unlink", status: 400 })
                    });
                } 


                const file = fs.createWriteStream(path);
                const sendReq = request.get(url);

                sendReq.on('response', async (res) => {
                    if (res.statusCode === 200) {
                        console.log(`Download Image => ${title}`);

                        // resolve(res.statusCode)
                        await insertFile(fileName).then(id => {
                            console.log(`Insert Image => ${title}`);
                            resolve(id) 
                        }).catch(err => {
                            reject({ message: err.message, status: err.status })
                        })

                    } else if (res.statusCode === 503) {
                        repeater()
                    }
                    counter++
                });

                sendReq.pipe(file);

                file.on('finish', () => {
                    file.close()
                });

                sendReq.on('error', (err) => {
                    fs.unlink(path, () => {
                        counter++
                        console.log(`Req : Image => Title : ${title}`);
                        // // repeater()
                        resolve(null)
                    }); 
                });

                file.on('error', (err) => {
                    fs.unlink(path, () => {
                        //counter++
                        console.log(`File : Image => Title : ${title}`);
                        //  repeater()
                        resolve(null)
                    });
                });

            }


        }

        repeater()

    })
};


module.exports = { insertReport, downloadImage, insertCategory }