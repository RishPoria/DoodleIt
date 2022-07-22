let marker;
let markerState;
let clear;
const params = {
    active: true,
    currentWindow: true
}
console.log('Doodle It Extension Console');

const s = (sketch) => {
    sketch.setup = () => {
        sketch.noCanvas();
        marker = sketch.select('#marker').elt;
        let exists = localStorage.getItem('marker');
        marker.checked = (exists === 'true');
        marker.addEventListener('click', changeState);
        markerState = exists ? exists : 'false';
        chrome.tabs.query(params, gotTabs1);
        clearButton = sketch.select('#clear-button').elt;
        clearButton.addEventListener('click', clearCanvas);
    }

    const changeState = () => {
        markerState = marker.checked ? 'true' : 'false';
        console.log('Marker ' + markerState === 'true' ? 'checked' : 'unchecked');
        localStorage.setItem('marker', markerState);
        chrome.tabs.query(params, gotTabs1);
    }

    const gotTabs1 = (tabs) => {
        let message = {
            txt: markerState
        }
        tabs.length > 0 && chrome.tabs.sendMessage(tabs[0].id, message);
    }

    const clearCanvas = () => {
        console.log("Clear called");
        chrome.tabs.query(params, gotTabs2);
    }

    const gotTabs2 = (tabs) => {
        let message = {
            erase: true
        }
        tabs.length > 0 && chrome.tabs.sendMessage(tabs[0].id, message);
    }
}

const p5Obj = new p5(s);