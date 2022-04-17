// block requests to certain domains (list in constants.js)
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        console.log(`blocking: ${details.url}`)
        return { cancel: true }
    },
    { urls: blockedDomains },
    ["blocking"]
);


// listen for data sent from the port
chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(handleMessage);
});


// send the message (key, page) to the server
function handleMessage(message) {
	console.log(message.key);
    console.log(message.page);

    data = {
        key: message.key,
        page: message.page
    }

    fetch(url, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(resp => {
        if (!resp.ok) {
            return Promise.reject(resp);
        } 
    })
    .catch(error => {
        // do nothing
    });
}
