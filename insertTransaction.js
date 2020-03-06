const { dynamodb, tableName } = require("./config")

let teams = require('./data/teams.json')
let players = require('./data/players.json')
let games = require('./data/games.json')

const insert = async () => {
    await putItems(teams)
    await putItems(players)
    await putItems(games)
}

const putItems = (items) => {
    return new Promise((resolve, reject) => {
        let params = {
            TransactItems: []
        };

        items.forEach(item => {
            params.TransactItems.push({
                Put: {
                    TableName: tableName,
                    Item: item
                }
            })
        })

        dynamodb.transactWriteItems(params, (err, data) => {
            if(err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

insert()