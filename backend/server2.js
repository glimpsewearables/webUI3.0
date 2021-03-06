const WebSocket = require('ws');


const wss = new WebSocket.Server({ port: 3030 });
const { spawn } = require('child_process')

const logOutput = (name) => (data) => console.log(`[${name}] ${data.toString()}`)


function run(words) {
  const process = spawn('python', ['/Users/Dylan/test5/test.py', words]);

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
