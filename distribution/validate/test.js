const configInfo = require('../../config/connectConfig')
const validate = require('./validate')


async function main(){
    
    var sourceInfo = {
        defaultUrl: configInfo.defaultUrl,
        connectionConfiguration: configInfo.connectSource,
        workspaceId: configInfo.workspaceId,
        sourceDefinitionId: configInfo.sourceDefinitionId,
        name: "create_test_db_source"
    }
    var csvSourceInfo = {
        defaultUrl: configInfo.defaultUrl,
        connectionConfiguration: configInfo.csvConnectSource,
        workspaceId: configInfo.workspaceId,
        sourceDefinitionId: configInfo.csvSourceDefinitnionId,
        name: "create_test_csv_source"
    }
    var destinationInfo = {
        defaultUrl: configInfo.defaultUrl,
        connectionConfiguration: configInfo.connectDestination,
        workspaceId: configInfo.workspaceId,
        destinationDefinitionId: configInfo.destinationDefinitionId,
        name: "create_test_destination"
    }

    /**
     * distribution/validate test (CSV source)
     */
    console.log("######### Validate #########")
    var source = await validate.validate(csvSourceInfo)
    if (source == true){
        console.log("CSV file migration is possible, distribution/validate succedeed")
    } else {
        console.log("distribution/validate failed")
    }

    /**
     * distribution/validate test (DB source)
     */
    console.log("######### Validate #########")
    var source = await validate.validate(sourceInfo)
    if (source == true){
        console.log("DB migration is possible, distribution/validate succedeed")
    } else {
        console.log("distribution/validate failed")
    }
 

    /**
     * source and destination validate logic test
     */
    console.log("######### Validate Source Using delete option #########")
    var delSource = true
    var source = await validate.validateSource(sourceInfo, delSource)
    if (source == true){
        console.log("validateSource succeeded")
    }
    else {
        console.log("validateSource failed")
    }

    console.log("######### Validate Destination Using delete option #########")
    var delDestination = true
    var destination = await validate.validateDestination(destinationInfo, delDestination)
    if (destination == true){
        console.log("validateDestination succeeded")
    }
    else {
        console.log("validateDestination failed")
    }
}

if (require.main == module){
    main()
}