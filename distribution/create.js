const sourceLogic = require('../airbyte/source/sourceLogic')
const destinationLogic = require('../airbyte/destination/destinationLogic')
const connectionLogic = require('../airbyte/connection/connectionLogic')
const configInfo = require('../config/connectConfig')
// const uuidv1 = require('uuid/v1')

module.exports = {create}

async function create(sourceInfo, destinationInfo){
    
    var delDestination = false
    console.log("Start sourceLogic")
    var source = await sourceLogic.createLogic(sourceInfo)
    console.log("sourceLogic return: ", source)
    
    console.log("Start destinationLogic")
    var destination = await destinationLogic.destinationLogic(destinationInfo, delDestination)
    console.log("destinationLogic return: ", destination)
    
    var data = source
    data.destinationId = destination
    data.status = configInfo.status
    data.operationIds = [configInfo.operationId]
    var sync = true
    console.log("start connection logic (create and sync)")
    var connectionLogicReturn = await connectionLogic.connectionLogic(data, sync)
    if (connectionLogicReturn == true){
        console.log("create and sync conneciton succeeded")
    }
    
    // if (sync != true) {
    //     var connectionId = connectionLogicReturn
    //     console.log("connection create only, created connectionId: ", connectionId)
    // } else if (sync == true && connectionLogicReturn == true){
    //     console.log("connection create and sync succeeded")
    // } else {
    //     console.log("connection sync failed")
    // }

}