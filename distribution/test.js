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
    
    /**
     * distribution/validate test (source)
     */
    // console.log("######### Validate #########")
    // var source = await validate.validate(sourceInfo)
    // if (source == true){
    //     console.log("migration is possible, distribution/validate succedeed")
    // } else {
    //     console.log("distribution/validate failed")
    // }

    /**
     * source and destination validate logic test
     */
    // console.log("######### Validate Source Using delete option #########")
    // var delSource = true
    // var source = await validate.validateSource(sourceInfo, delSource)
    // if (source == true){
    //     console.log("validateSource succeeded")
    // }
    // else {
    //     console.log("validateSource failed")
    // }

    // console.log("######### Validate Destination Using delete option #########")
    // var delDestination = true
    // var destination = await validate.validateDestination(destinationInfo, delDestination)
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
    var delSource = false
    var removeSource = await validate.validateSource(sourceInfo, delSource)
    console.log("######### Remove #########")
    var connection = await remove.remove(sourceInfo, removeSource, destinationInfo, removeDestination)
    if (connection == true){
        console.log("distribution/remove succeeded")
    } else {
        console.log("distribution/remove failed")
    }
}

if (require.main == module){
    main()
}