
// Yeni bir socket bağlantısı oluşturduk.
var socket = new WebSocket("wss://api.huobi.pro/ws")
//Huobi websocket gelen dataları gzip ile sıkıştırdığı için decode edeceğiz bundan dolayı socket tipini arraybuffer yaptık.
socket.binaryType="arraybuffer";
//Sockete bağlandık.
socket.onopen=function(){

    console.log("Connected")
    
    socket.send(market_candlestick());

}

//Socket'den veri geldiğinde onmessage içerisinde yakalayacağız.
socket.onmessage=function(e){
    var binData = new Uint8Array(e.data);
    var data = pako.inflate(binData);
    var strData = String.fromCharCode.apply(null, new Uint16Array(data));
    var json=JSON.parse(strData);
    if(json.tick!=undefined || json.tick!=null){
      console.log(json);
    } 
}

function market_candlestick(){
      let data= JSON.stringify({
        sub: "market.ethbtc.kline.1min",
        id: "id1",
      })

      /*
      Topic

      market.$symbol$.kline.$period$

      Topic Parameter

      symbol	string	true	Trading symbol	        All supported trading symbol, e.g. btcusdt, bccbtc. (to retrieve candlesticks for ETP NAV, symbol = ETP trading symbol + suffix 'nav'，for example: btc3lusdtnav)

      period	string	true	Candlestick interval	1min, 5min, 15min, 30min, 60min, 4hour, 1day, 1mon, 1week, 1year
       
      */
      return data;
}
