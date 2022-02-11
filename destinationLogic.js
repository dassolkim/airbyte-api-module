const rp = require('request-promise-native')
const configInfo = require('./connectConfig.js')

module.exports = destinationLogic

function createDestination() {
    var url = configInfo.defaultUrl + "destinations/create"
    var connectionConfiguration = configInfo.connectDestination
    var destinationName = "nodeCreateDestination"
    const options = {
        uri: url,
        method: 'POST',
        json: true,
        body: {
            workspaceId: configInfo.workspaceId,
            destinationDefinitionId: configInfo.destinationDefinitionId,
            connectionConfiguration: connectionConfiguration,
            name: destinationName
        },
    };
    return rp(options, function (error, respose, body) {
        if (error) {
            console.log(error);
        } else {
            var result = body;
            return result;
        }
    })
}

function getDestinatin(destinationId){
    var url = configInfo.defaultUrl + "destinations/get"
    const options = {
        uri: url,
        method: 'POST',
        body: {
            destinationId: destinationId
        },
        json: true
    };
    return rp(options, function (error, respose, body) {
        if (error) {
            console.log(error);
        } else {
            var result = body;
            return result;
        }
    })
}

function deleteDestination(destinationId) {
    var url = configInfo.defaultUrl + "destinations/delete"
    const options = {
        uri: url,
        method: 'POST',
        body: {
            destinationId: destinationId
        },
        json: true
    };
    return rp(options, function (error, respose, body) {
        if (error) {
            console.log(error);
        } else {
            var result = body;
            return result;
        }
    })
}

async function destinationLogic(delDestination) {
    try{
        console.time('api call during time')
        var destination = await createDestination()
        if (destination != null){
            var destinationId = destination.destinationId
            console.log("destinationId: ", destinationId)
            var getDestinationResult = await getDestinatin(destinationId)
            console.log(getDestinationResult)
            console.log("destination lookup is done")
        } else { console.log("get destination api does not work")}
        if (getDestinationResult != null && delDestination == true){    
            var deleteDestinationResult = await deleteDestination(destinationId)
            console.log(deleteDestinationResult)
            console.log("destination deletion is done")
        } else { console.log("delete destination api does not work")}
        console.timeEnd('api call during time')
    } catch (error) {
        console.log(error)
    }
    return getDestinationResult
}
// destinationLogic()