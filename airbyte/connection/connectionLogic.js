// const rp = require('request-promise-native')
// const configInfo = require('../../config/connectConfig.js')
const axios = require('axios').default
// const sourceLogic = require('./sourceLogic.js')

module.exports = {createLogic, connectionSync}

function createConnection(defaultUrl, data) {
    var url = defaultUrl + "connections/create"
    var result = axios.post(url, data)
    .then(function (response){
        var data = response.data
        return data

    }).catch(function (error){
        console.log(error)
    })
    return result
}

function connectionSync(defaultUrl, connectionId) {
    var url = defaultUrl + "connections/sync"
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

async function createLogic(url, data, sync){
    try{
        var defaultUrl = url
        // console.time('connectionLogic api call during time')
        
        var connection = await createConnection(defaultUrl, data)
        var connectionId = connection.connectionId
        if (connectionId != null && sync == true){
            var syncResult = await connectionSync(defaultUrl, connectionId)
            if (syncResult != null){
                console.log('connection sync succeeded')
                console.log(syncResult)
                return true
            } else {
                console.log("connectionLogic failed")
                return false
            }
            // console.log(connection)
        }
        // console.timeEnd('connectionLogic api call during time')
        // return connectionId
    } catch (error) {
        console.log('connectionLogic failed')
        console.log(error.response)
    }   
}