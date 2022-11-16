## Websocket Market Data

### Webscoket URL

#### Websocket Market Feed (excluding MBP incremental channel & its REQ channel)

wss://api.huobi.pro/ws or wss://api-aws.huobi.pro/ws

#### MBP incremental channel & its REQ channel)

wss://api.huobi.pro/feed or wss://api-aws.huobi.pro/feed

#### Data Format

All return data of websocket Market APIs are compressed with GZIP so they need to be unzipped.

#### Heartbeat and Connection

```
$`\textcolor{red}{\text{After the server sent two consecutive heartbeat messages without receiving at least one matching "pong" response from a client, then right before server sends the next "ping" heartbeat, the server will be disconnected with the client server.}}`$ 

```


After connected to Huobi's Websocket server, the server will send heartbeat periodically (currently at 5s interval). The heartbeat message will have an integer in it, e.g.

```
 {
    "pong": 1492420473027
 } 
```

When client receives this heartbeat message, it should respond with a matching "pong" message which has the same integer in it, e.g.

#### Subscribe to Topic

To receive data you have to send a "sub" message first.

```
{ 
    "sub": "topic to sub", "id": "id generate by client" 
}
```

### Sub request

{
  "sub": "market.btcusdt.kline.1min",
  "id": "id1"
}

### Sub response:

{
  "id": "id1",
  "status": "ok",
  "subbed": "market.btcusdt.kline.1min",
  "ts": 1489474081631
}
After successfully subscribed, you will receive a response to confirm subscription

Then, you will received messages when there is any update in the subcribed topics.