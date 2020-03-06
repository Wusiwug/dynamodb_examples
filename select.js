const { dynamodb, tableName } = require("./config");

const params = {
    TableName: tableName
}

dynamodb.scan(params, (err, data) => {
    if(err) {
        console.log(err);
    } else {
        console.log(data);
    }
})