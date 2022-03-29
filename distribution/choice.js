const sourceLogic = require('../airbyte/source/sourceLogic')
const destinationLogic = require('../airbyte/destination/destinationLogic')
const connectionLogic = require('../airbyte/connection/connectionLogic')

module.exports = {prepare, choice, create}

async function prepare(sourceInfo){

    // console.log("Start sourceLogic")
    var source = await sourceLogic.createLogic(sourceInfo)
    // console.log("sourceLogic return: ", source)
    if (source == null){
        console.log("source/createLogic failed")
        return false
    }
    
    // console.log(source)
    console.log("prepare returns: ", source)
    console.log(JSON.stringify(source, null, 4))

    return source
}

async function choice(data, drop){

    // var connection = data
    var source = data
    var choiceData = source.syncCatalog

    // get object count
    const count = Object.keys(choiceData.streams).length;

    console.log("Number of Tables: ", count)
    console.log("drop tables list: ", drop)

    var i = 0
    while(i<count){
        console.log(choiceData.streams[i].stream.name)
        var temp = choiceData.streams[i]
        if(drop.includes(temp.stream.name) == true){
            // delete choiceData.streams[i]
            choiceData.streams[i] = null
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
        var temp = choiceData.streams[j]
        if(temp != null){
            newData.streams[a] = temp
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