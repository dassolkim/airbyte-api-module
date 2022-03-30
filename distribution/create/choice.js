const sourceLogic = require('../../airbyte/source/sourceLogic')
const destinationLogic = require('../../airbyte/destination/destinationLogic')
const connectionLogic = require('../../airbyte/connection/connectionLogic')

module.exports = {prepare, choice, create}

async function prepare(sourceInfo){

    // console.log("Start sourceLogic")
    var source = await sourceLogic.createLogic(sourceInfo)
    // console.log("sourceLogic return: ", source)
    if (source == null){
        console.log("source/createLogic failed")
        return null
    }
    console.log("prepare returns: ", source)
    console.log("Table list: ", JSON.stringify(source.syncCatalog, null, 2))

    return source
}

async function choice(data, drop){

    var source = data
    var choiceData = source.syncCatalog

    const count = Object.keys(choiceData.streams).length;

    console.log("Number of Tables: ", count)
    console.log("drop table list: ", drop)

    var i = 0
    while(i<count){
        console.log(choiceData.streams[i].stream.name)
        if(drop.includes(choiceData.streams[i].stream.name) == true){
            choiceData.streams[i] = null
            // delete choiceData.streams[i]
            // Object.keys(temp).forEach(function(key){
            //     delete temp[key];
            // })
            console.log("drop table!")
        }
        i++
    }
    /**
     * reassign object
     */
    var j = 0
    var a = 0
    var newData = {
        streams: []
    }
    while(j<count){
        // var temp = choiceData.streams[j]
        if(choiceData.streams[j] != null){
            newData.streams[a] = choiceData.streams[j]
            a++
        }
        j++
    }
    console.log(newData)
    source.syncCatalog = newData

    return source
}

async function create(destinationInfo, connectionInfo, data){

    console.log("Start destinationLogic in choice.create")
    var destination = await destinationLogic.createLogic(destinationInfo)
    // console.log("destinationLogic return: ", destination)
    if (destination == null){
        console.log("destination/createLogic failed")
        return false
    }
    data.destinationId = destination

    var connection = data
    connection.status = connectionInfo.status
    connection.operationIds = [connectionInfo.operationId]
    var sync = connectionInfo.sync
    var url = connectionInfo.defaultUrl
    console.log("start connection logic (create and sync)")
    console.log("createConnection Input: ", connection)
    var connectionLogicReturn = await connectionLogic.createLogic(url, connection, sync)
    
    if (connectionLogicReturn == true){
        console.log("connection/createLogic succeeded")
        return true
    } else {
        console.log("connection/createLogic failed")
        return false
    }
}