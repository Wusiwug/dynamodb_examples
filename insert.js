const { tableName } = require("./config");
const moment = require("moment");
const { dbAction } = require("./action");

const insert = () => {
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
                        "city": "WVC"
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
                        "city": "WVC"
                    }
                }
            ]
        }
    }

    let now = moment()

    let item = {
        HashKey: "12346",
        RangeKey: "987654",
        Timestamp: now.format("HH:mm"),
        Data: JSON.stringify(providerAsgDetails),
        CreatedAt: now.format("MM/DD/YYYY"),
        UpdatedAt: now.format("MM/DD/YYYY")
    }
    putItem(item).then(data => {
        console.log("Successfully Created Record");
    }).catch(err => {
        console.log(err);
    })
}

const putItem = item => {
    let params = {
        TableName: tableName,
        Item: item
    }
    return dbAction(params, 'put')
}

insert()