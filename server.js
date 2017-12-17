var app = express();
app.use(bodyParser.json());

app.get('/blocks', (req, res) => res.send(JSON.stringify(blockchain)));
app.post('/mineBlock', (req, res) => {
  var newBlock =  generateNextBlock(req.body.data);
  addBlokc(newBlock);
  broadcast(responseLatestMsg());
  console.log('block added: ' + JSON.stringify(newBlock));
  res.send();
});

app.get('/peers', (req, res) => {
  res.send(sockets.map(s => s._sockets.remoteAddress + ':' + s._socket.remotePort));
});

app.post('/addPeer', (req, res) => {
  connectToPeers([req.body.peer]);
  res.send();
});

app.listen(http_port, () => console.log('Listening on port: ' + http_port))
