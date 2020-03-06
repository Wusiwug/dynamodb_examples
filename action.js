const { docClient } = require("./config");
const dbAction = (payLoad, action = "get") => {
    return new Promise((resolve, reject) => {
        docClient[action](payLoad, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

module.exports = { dbAction }