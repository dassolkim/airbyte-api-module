const sourceLogic = require('../airbyte/source/sourceLogic')
const destinationLogic = require('../airbyte/destination/destinationLogic')
const connectionLogic = require('../airbyte/connection/connectionLogic')
const configInfo = require('../config/connectConfig')
const uuidv1 = require('uuid/v1')

// get datasetId from SODAS+

// const datasetId = uuidv1()
// console.log("datasetId: ", datasetId)
// const testCatalog = {}
async function main(){
    
    var delDestination = false
    
    console.log("Start sourceLogic")
    var createLogicReturn = await sourceLogic.createLogic()
    console.log("sourceLogic return: ", createLogicReturn)
    
    console.log("Start destinationLogic")
    var destinationLogicReturn = await destinationLogic.destinationLogic(delDestination)
    console.log("destinationLogic return: ", destinationLogicReturn)
    
    var data = createLogicReturn
    data.destinationId = destinationLogicReturn
    data.status = configInfo.status
    data.operationIds = [configInfo.operationId]
    var sync = true
    // console.log("This is connectionCreate input data: ", data)
    // console.log(data)
    console.log("start connectionLogic")
    var connectionLogicReturn = await connectionLogic.connectionLogic(data, sync)
    console.log("Connection Logic Return:  ", connectionLogicReturn)
    
    
}
if (require.main == module){
    main()
    // console.log(testCatalog)
}