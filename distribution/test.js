// const sourceLogic = require('../airbyte/source/sourceLogic')
// const destinationLogic = require('../airbyte/destination/destinationLogic')
const configInfo = require('../config/connectConfig')
const validate = require('./validate')
const create = require('./create')
const uuidv1 = require('uuid/v1')

// get datasetId from SODAS+
const datasetId = uuidv1()
console.log("datasetId: ", datasetId)

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

    console.log("######### Validate Source #########")
    var source = await validate.validateSource(sourceInfo)
    if (source == true){
        console.log("migration is possible")
    }

    console.log("######### Validate Destination #########")
    var destination = await validate.validateDestination(destinationInfo)
    if (destination == true){
        console.log("validateDestination succeeded")
    }
    else {console.log("validateDestination failed")}
    
    console.log("######### Create and Sync Connection #########")
    var connection = await create.create(sourceInfo, destinationInfo)
    if (connection == true){
        console.log("createConnection and syncConnection succeeded")
    }

}
if (require.main == module){
    main()
}