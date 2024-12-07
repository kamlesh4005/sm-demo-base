/* 
** Script to create mongo Indexes
** cmd to run the scrpit : mongo "connectionString" path_of_script.js
** Ex : mongo "mongodb+srv://<USERNAME>:<PASSWORD>@<HOST>" Models/scripts/createIndex.js 
*/

const databaseName = process.env.DBNAME;
const collection = "events";
const databaseInst = db.getSiblingDB(databaseName);

var indexes = [
    {
        "collection": "events",
        "indexes": [
            {
                "key": {
                    "startTime": -1,
                    "endTime": -1
                },
                "name": "_startTime_endTime"
            }
        ]
    },
    {
        "collection": "events",
        "indexes": [
            {
                "key": {
                    "startTime": -1
                },
                "name": "_startTime"
            }
        ]
    }
]

indexes.forEach((obj) => {
    let collection = obj.collection;
    obj.indexes.forEach((index) => {
        let keys = JSON.parse(JSON.stringify(index.key));
        index.key = undefined;
        let opts = JSON.parse(JSON.stringify(index));
        opts.background = true;
        let result = databaseInst[collection].createIndex(keys, opts)
        print("Creating index for : " + opts.name + " : " + JSON.stringify(result.ok));
    })
})