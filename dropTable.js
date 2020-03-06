const { dynamodb, tableName } = require("./config");

let params = {
    TableName: tableName
}

dynamodb.deleteTable(params, (err, data) => {
    if(err) {
        console.log("Could not delete table", err);
    } else {
        console.log('Successfully deleted table: ' + tableName);
    }
})