const { dynamodb, tableName } = require("./config");

let startTime = new Date().getTime();
getGame('LAA', '20190420').then(game => {
    let endTime = new Date().getTime();
    console.log(game)
    console.log("\tTotal time: ", (endTime - startTime), "ms")
}).catch(err => {
    console.log(err)
})

function getGame(teamID, dateStr) {
    return new Promise((resolve, reject) => {
        let params = {
            TableName: tableName,
            KeyConditionExpression: 'TeamID = :t AND SK = :sk',
            ExpressionAttributeValues: {
                ':t': { S: 'GAMES_' + teamID },
                ':sk': { S: dateStr }
            }
        }

        dynamodb.query(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}