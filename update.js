const { tableName } = require("./config");
const moment = require("moment");
const { dbAction } = require("./action");

const update = () => {
    let providerAsgDetails = {
        "result": {
            "confirmed": [
                {
                    "assignmentId": "a0Cc000000QOU51EAH",
                    "worksiteId": "001c0000020vRKqAAM",
                    "name": "CHS Client Division",
                    "startDate": "01/01/2020",
                    "endDate": "02/17/2020",
                    "location": {
                        "state": "UT",
                        "city": "Midvale"
                    }
                },
                {
                    "assignmentId": "a0Cc000000QOU51EAH",
                    "worksiteId": "001c0000020vRL5AAM",
                    "name": "CHS Medical Center",
                    "startDate": "01/01/2020",
                    "endDate": "02/17/2020",
                    "location": {
                        "state": "UT",
                        "city": "Herriman"
                    }
                }
            ],
            "completed": [
                {
                    "assignmentId": "a0Cc000000QOUe0EAH",
                    "worksiteId": "001c0000020vRKqAAM",
                    "name": "CHS Client Division",
                    "startDate": "06/01/2019",
                    "endDate": "01/03/2020",
                    "location": {
                        "state": "UT",
                        "city": "Midvale"
                    }
                }
            ],
            "archived": [
                {
                    "assignmentId": "a0Cc000000QOUe0EAH",
                    "worksiteId": "001c0000020vRL5AAM",
                    "name": "CHS Medical Center",
                    "startDate": "2019-06-06T00:00:00.000Z",
                    "endDate": "2019-06-07T00:00:00.000Z",
                    "location": {
                        "state": "UT",
                        "city": "SLC"
                    }
                }
            ]
        }
    }

    let now = moment()

    let item = {
        Data: JSON.stringify(providerAsgDetails),
        UpdatedAt: now.format("MM/DD/YYYY")
    }
    updateItem(item).then(data => {
        console.log("Successfully Updated Record");
    }).catch(err => {
        console.log(err);
    })
}

const updateItem = item => {
    let params = {
        TableName: tableName,
        Key: {
            "HashKey": "12346",
            "RangeKey": "987654"
        },
        UpdateExpression: 'set UpdatedAt = :u, :data = :d',
        ExpressionAttributeValues: {
            ":u": item.UpdatedAt,
            ":d": item.Data,
            ":data": "Data"
        },
        ReturnValues: "UPDATED_NEW"
    }
    return dbAction(params, 'update')
}

update()