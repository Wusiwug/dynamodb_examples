const { tableName } = require("./config");
const { dbAction } = require("./action");

const deleteMe = () => {
    let item = {
        "HashKey": "12346",
        "RangeKey": "987654"
    }

    delItem(item).then(data => {
        console.log("Successfully Deleted Record");
    }).catch(err => {
        console.log(err);
    })
}

const delItem = item => {
    let params = {
        TableName: tableName,
        Key: item
    }

    return dbAction(params, 'delete')
}

deleteMe()