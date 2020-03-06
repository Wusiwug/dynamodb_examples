var AWS = require('aws-sdk')

AWS.config.update({
    region: 'us-west-2',
    endpoint: 'https://dynamodb.us-west-2.amazonaws.com'
    //endpoint: 'http://localhost:8000'
})

const docClient = new AWS.DynamoDB.DocumentClient()

const tableName = 'pde-dev-providers-service'

module.exports = {
    AWS,
    docClient,
    tableName
}