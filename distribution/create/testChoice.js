const configInfo = require('../../config/connectConfig')
const choice = require('./choice')

// get datasetId from SODAS+

async function main(){
    
    var sourceInfo = {
        defaultUrl: configInfo.defaultUrl,
        connectionConfiguration: configInfo.connectSource,
        workspaceId: configInfo.workspaceId,
        sourceDefinitionId: configInfo.sourceDefinitionId,
        name: "choiceSource1"
    }
    var destinationInfo = {
        defaultUrl: configInfo.defaultUrl,
        connectionConfiguration: configInfo.connectDestination,
        workspaceId: configInfo.workspaceId,
        destinationDefinitionId: configInfo.destinationDefinitionId,
        name: "choiceDestination1"
    }
    var connectionInfo = {
        defaultUrl: configInfo.defaultUrl,
        status: configInfo.status,
        operationId: configInfo.operationId,
        sync: true
    }
    
    /**
     * dstribution/create choice test
     * destination: api_destination_3
     */
    console.log("######### Create and Sync Connection with choice tables #########")

    // Airybte source create -> get -> discover
    var prepare = await choice.prepare(sourceInfo, destinationInfo)
    if(prepare != null){
        // User select drop tables
        var drop = ["covid_data", "_airbyte_raw_covid_data", "table1"]
        var cd = await choice.choice(prepare, drop)
        var create = await choice.create(destinationInfo, connectionInfo, cd)
        if(create == true){
            console.log(create)
            console.log("choice.create succeeded")
        } else{
            console.log("choice.create failed")
        }
    }else{
        console.log("choice.prepare failed")
    }
    console.log("test Choice end")

}

if (require.main == module){
    main()
}