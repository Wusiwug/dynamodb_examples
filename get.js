const { tableName } = require("./config");
const { dbAction } = require("./action");

const get = () => {
    let item = {
        "HashKey": "12346",
        "RangeKey": "987654"
    }

    getItem(item).then(data => {
        console.log(data);
    }).catch(err => {
        console.error(err);
    })
}

const getItem = item => {
    let params = {
        TableName: tableName,
        Key: item
    }
    return dbAction(params, 'get')
}

get()