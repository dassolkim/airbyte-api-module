const sourceLogic = require('../../airbyte/source/sourceLogic')
const destinationLogic = require('../../airbyte/destination/destinationLogic')
const connectionLogic = require('../../airbyte/connection/connectionLogic')
// const configInfo = require('../config/connectConfig')
// const uuidv1 = require('uuid/v1')

module.exports = {create}

async function create(sourceInfo, destinationInfo, connectionInfo){
    // console.log("Start sourceLogic")
    console.time("distribution/create api call during time")
    var source = await sourceLogic.createLogic(sourceInfo)
    // console.log("sourceLogic return: ", source)
    if (source == null){
        console.log("source/createLogic failed")
        return false
    }
    // console.log("Start destinationLogic")
    var destination = await destinationLogic.createLogic(destinationInfo)
    // console.log("destinationLogic return: ", destination)
    if (destination == null){
        console.log("destination/createLogic failed")
        return false
    }
    var connection = source
    connection.destinationId = destination
    connection.status = connectionInfo.status
    connection.operationIds = [connectionInfo.operationId]
    var sync = connectionInfo.sync
    var url = connectionInfo.defaultUrl
    console.log("start connection logic (create and sync)")
    var connectionLogicReturn = await connectionLogic.createLogic(url, connection, sync)
    console.timeEnd("distribution/create api call during time")
    if (connectionLogicReturn == true){
        console.log("connection/createLogic succeeded")
        return true
    } else {
        console.log("connection/createLogic failed")
        return false
    }
}