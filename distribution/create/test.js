const configInfo = require('../../config/connectConfig')
const create = require('./create')

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
     * dstribution/create test
     */
    console.log("######### Create and Sync Connection #########")
    var connection = await create.create(sourceInfo, destinationInfo, connectionInfo)
    if (connection == true){
        console.log("distribution/create succeeded")
    } else {
        console.log("distribution/create failed")
    }
}

if (require.main == module){
    main()
}