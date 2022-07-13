let c;

const s = (sketch) => {
    sketch.setup = () => {
        document.body.style['userSelect'] = localStorage.getItem('marker') === 'true' ? 'none' : 'text';
        let h = document.body.clientHeight;
        c = sketch.createCanvas(sketch.windowWidth - 20, h - 20);
        c.position(0, 0);
        c.style('pointer-events', 'none');
        sketch.clear();
    }
    
    sketch.draw = () => {
        sketch.stroke(255, 0, 0);
        sketch.strokeWeight(3);
        if(localStorage.getItem('marker') === 'true' && sketch.mouseIsPressed)
            sketch.line(sketch.mouseX, sketch.mouseY, sketch.pmouseX, sketch.pmouseY);
    }

    const gotMessage = (message, _sender, _sendResponse) => {
        console.log(`Message received: ${message}`)
        if (message.txt){
            localStorage.setItem('marker', message.txt);
            c.style('pointer-events', 'none');
            document.body.style['userSelect'] = localStorage.getItem('marker') === 'true' ? 'none' : 'text';
        } else {
            c.clear();
        }
    }
    
    chrome.runtime.onMessage.addListener(gotMessage);
    
}

const myp5 = new p5(s);