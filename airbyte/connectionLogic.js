const rp = require('request-promise-native')
const configInfo = require('../config/connectConfig.js')
const sourceLogic = require('./sourceLogic.js')


function createConnection(data) {
    var sourceId = data.sourceId
    var destinationId = data.destinationId
    var url = configInfo.defaultUrl + "connections/create"
    var catalog = data.catalog
    var connectionName = "nodeCreateConnection"
    const options = {
        uri: url,
        method: 'POST',
        json: true,
        body: {
            name: connectionName,
            syncCatalog: catalog

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