const { dynamodb, tableName } = require("./config");

var params = {
    TableName: tableName,
    KeySchema: [
        {
            AttributeName: 'TeamID',
            KeyType: 'HASH'
        },
        {
            AttributeName: 'SK',
            KeyType: 'RANGE'
        }
    ],
    AttributeDefinitions: [
        {
            AttributeName: 'TeamID',
            AttributeType: 'S'
        },
        {
            AttributeName: 'SK',
            AttributeType: 'S'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
}

dynamodb.createTable(params, (err, data) => {
    if(err) {
        console.log('Unable to create table', JSON.stringify(err));
    } else {
        console.log('Table created')
    }
})