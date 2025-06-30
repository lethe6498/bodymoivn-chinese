import csInterface from './CSInterfaceHelper'
import extensionLoader from './ExtensionLoader'
import errorCodes from './enums/errorCodes'

var pendingPromises = []

csInterface.addEventListener('bm:file:uri', function (ev) {
	if (pendingPromises.length > 0) {
		var promise = pendingPromises.shift()
		promise.resolve(ev.data)
	}
})

csInterface.addEventListener('bm:file:cancel', function (ev) {
	if (pendingPromises.length > 0) {
		var promise = pendingPromises.shift()
		promise.reject({errorCode: errorCodes.FILE_CANCELLED})
	}
})

function browseFile(path) {
    var promise = new Promise(function(_resolve, _reject) {
    	pendingPromises.push({
    		resolve: _resolve,
    		reject: _reject
    	})
    })
    
    extensionLoader.then(function(){
        path = path ? path.replace(/\\/g,"\\\\") : ''
        var eScript = '$.__bodymovin.bm_main.browseFile("' + path + '")';
        csInterface.evalScript(eScript);
    })
    return promise
}

export default browseFile