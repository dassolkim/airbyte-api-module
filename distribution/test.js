// const sourceLogic = require('../airbyte/source/sourceLogic')
// const destinationLogic = require('../airbyte/destination/destinationLogic')
const configInfo = require('../config/connectConfig')
const validate = require('./validate')
const create = require('./create')
const remove = require('./remove')
// const uuidv1 = require('uuid/v1')

// get datasetId from SODAS+
// const datasetId = uuidv1()
// console.log("datasetId: ", datasetId)

async function main(){
    
    var sourceInfo = {
        defaultUrl: configInfo.defaultUrl,
        connectionConfiguration: configInfo.connectSource,
        workspaceId: configInfo.workspaceId,
        sourceDefinitionId: configInfo.sourceDefinitionId,
        name: "create_test_source"
    }
    var destinationInfo = {
        defaultUrl: configInfo.defaultUrl,
        connectionConfiguration: configInfo.connectDestination,
        workspaceId: configInfo.workspaceId,
        destinationDefinitionId: configInfo.destinationDefinitionId,
        name: "create_test_destination"
    }
    var connectionInfo = {
        defaultUrl: configInfo.defaultUrl,
        status: configInfo.status,
        operationId: configInfo.operationId,
        sync: true
    }
    var removeDestination = "f9115d2b-6ec3-428c-a815-40b9b785b680"
    /**
     * distribution/validate test (source, destination)
     */
    // console.log("######### Validate Source #########")
    // var source = await validate.validateSource(sourceInfo)
    // if (source == true){
    //     console.log("migration is possible")
    // } else {
    //     console.log("validateSource failed")
    // }

    // console.log("######### Validate Destination #########")
    // var destination = await validate.validateDestination(destinationInfo)
    // if (destination == true){
    //     console.log("validateDestination succeeded")
    // }
    // else {
    //     console.log("validateDestination failed")
    // }

    /**
     * dstribution/create test
     */
    // console.log("######### Create and Sync Connection #########")
    // var connection = await create.create(sourceInfo, destinationInfo, connectionInfo)
    // if (connection == true){
    //     console.log("distribution/create succeeded")
    // } else {
    //     console.log("distribution/create failed")
    // }

    /**
     * distribution/remove test
     * remove two lines: delDestination and removeDestination
     */
    var delDestination = false
    var removeDestination = await validate.validateDestination(destinationInfo, delDestination)
    console.log("######### Remove Destination #########")
    var connection = await remove.remove(destinationInfo, removeDestination)
    if (connection == true){
        console.log("distribution/remove succeeded")
    } else {
        console.log("distribution/remove failed")
    }


}
if (require.main == module){
    main()
}