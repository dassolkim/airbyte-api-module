// const rp = require('request-promise-native')

const configInfo = require('../../config/connectConfig.js')
const axios = require('axios').default
// const sourceLogic = require('./sourceLogic.js')

module.exports = {createConnection, connectionLogic}

function createConnection(data) {
    var url = configInfo.defaultUrl + "connections/create"
    var connectionName = "nodeCreateConnection"
    // var operationId = configInfo.operationId
    console.log("This is createConneciton input data: ", data)
    var result = axios.post(url, data)
    .then(function (response){
        var data = response.data
        return data

    }).catch(function (error){
        console.log(error)
    })
    return result
}

function connectionSync(connectionId) {
    var url = configInfo.defaultUrl + "connections/sync"
    var data = {
        connectionId: connectionId
    }
    var result = axios.post(url, data)
    .then(function (response){
        var data = response.data
        return data

    }).catch(function (error){
        console.log(error)
    })
    return result

}
/**
 * 
 * @param {*} connectionId 
 * @returns
 * 
function fetchConnection(connectionId){
    var url = configInfo.defaultUrl + "state/get"
    var data = {
        connectionId: connectionId
    }
    var result = axios.post(url, data)
    .then(function (response){
        var data = response.data
        return data

    }).catch(function (error){
        console.log(error)
    })
    return result
}

 */

// const data = {
//     sourceId: "614e3799-a0b1-4018-9ab9-44b425b13153",
//     destinationId: "f9115d2b-6ec3-428c-a815-40b9b785b680",
//     operationIds: [configInfo.operationId],
//     status: configInfo.status
// }

async function connectionLogic(data, sync){
    try{
        console.time('connectionLogic api call during time')
        // var sourceCatalog = await sourceLogic.discoverSchema(data.sourceId)
        // var catalog = sourceCatalog.catalog
        // data.syncCatalog = catalog
        var connection = await createConnection(data)
        var connectionId = connection.connectionId
        if (connectionId != null && sync == true){
            var syncResult = await connectionSync(connectionId)
            if (syncResult != null){
                console.log('sync is complete')
                console.log(syncResult)
            }
            // console.log(connection)
        } else {
            console.log("connectionLogic is failed")
        }
        console.timeEnd('connectionLogic api call during time')
    } catch (error) {
        console.log('this test occurs an error')
        console.log(error.response)
    }   
}
// connectionLogic(data, true)