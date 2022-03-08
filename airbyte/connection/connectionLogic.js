// const rp = require('request-promise-native')

const configInfo = require('../../config/connectConfig.js')
const axios = require('axios').default
// const sourceLogic = require('./sourceLogic.js')

module.exports = {createConnection, connectionLogic, connectionSync}

function createConnection(data) {
    var url = configInfo.defaultUrl + "connections/create"
    // var connectionName = "nodeCreateConnection"
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
        return null
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
                console.log('connection sync succeeded')
                console.log(syncResult)
                return true
            } else {
                console.log("connectionLogic failed")
                return null
            }
            // console.log(connection)
        }
        console.timeEnd('connectionLogic api call during time')
        // return connectionId
    } catch (error) {
        console.log('this test occurs an error')
        console.log(error.response)
    }   
}
// connectionLogic(data, true)