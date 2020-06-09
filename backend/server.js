const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3030 });
const wsFour = new WebSocket.Server({ port: 4050 });

const { spawn } = require('child_process')

const logOutput = (name) => (data) => console.log(`[${name}] ${data.toString()}`)


function run(words) {
  const process = spawn('python', ['/home/pi/webUI2.0/test.py', words]);

  process.stdout.on(
    'data',
    logOutput('stdout')
  );

  process.stderr.on(
    'data',
    logOutput('stderr')
  );

}

function startGlimpse() {
  const process = spawn('python', ['/home/pi/glimpse-cam/GlimpseCam.py', '--console-log']);

  process.stdout.on(
    'data',
    logOutput('stdout')
  );

  process.stderr.on(
    'data',
    logOutput('stderr')
  );
}

function takeStill() {
  const process = spawn('python', ['/home/pi/glimpse-cam/GlimpseCam.py', '--still']);

  process.stdout.on(
    'data',
    logOutput('stdout')
  );

  process.stderr.on(
    'data',
    logOutput('stderr')
  );
}

function startRecord() {
  const process = spawn('python', ['/home/pi/glimpse-cam/GlimpseCam.py', --record-reg]);

  process.stdout.on(
    'data',
    logOutput('stdout')
  );

  process.stderr.on(
    'data',
    logOutput('stderr')
  );
}

function startUpload() {
  const process = spawn('python', ['/home/pi/glimpse-cam/uploadFile.py', '--console-log']);

  process.stdout.on(
    'data',
    logOutput('stdout')
  );

  process.stderr.on(
    'data',
    logOutput('stderr')
  );
}

function sendEmail() {
  const process = spawn('python', ['/home/pi/glimpse-cam/sendEmail.py']);

  process.stdout.on(
    'data',
    logOutput('stdout')
  );

  process.stderr.on(
    'data',
    logOutput('stderr')
  );
}

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    console.log(data);
    run(data);
      wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

});

wsFour.on('connection', function connection(ws) {
  ws.on('message', function incoming(rawData) {
    const {action, command} = JSON.parse(rawData)

    console.log(command);
    
    switch (action) {
      case "start-record":
        startRecord();
        break;
      case "start-upload":
        startUpload();
        break;
      case "stop-record":
        stopRecord();
        break;
      case "start-glimpse":
        startGlimpse();
        break;
      case "take-still":
        takeStill();
        break;
      case "send-email":
        sendEmail();
        break;
          
      default:
        break;
    }
  });
});




