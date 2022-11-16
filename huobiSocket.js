
// Yeni bir socket bağlantısı oluşturduk.
var socket = new WebSocket("wss://api.huobi.pro/ws")
//Huobi websocket gelen dataları gzip ile sıkıştırdığı için decode edeceğiz bundan dolayı socket tipini arraybuffer yaptık.
socket.binaryType="arraybuffer";
//Sockete bağlandık.
socket.onopen=function(){
    console.log("Connected")
    socket.send(market_depth());

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
function market_ticker (){
    let data= JSON.stringify({
        sub: "market.btcusdt.ticker",
      })
      return data

      /*
      
      Topic

      market.$symbol.ticker

      Request Parameters

      Parameter 	Data Type	Required	    Default 	        Description	                    Value Range
      symbol	     string	      true	          NA	      The trading symbol to query	        All supported trading symbol, e.g. btcusdt, bccbtc.Refer to /v1/common/symbols

      */
}
function market_depth(){
    let data= JSON.stringify({
        sub: "market.btcusdt.depth.step0",
        id:"id1"
      })
      return data

         /*
      
      Topic

      market.$symbol.depth.$type

      Request Parameters

      Parameter       Data Type	      Required	    Default        Description	                                    Value Range

      symbol	       string	       true	          NA	       Trading symbol	                                Refer to GET /v1/common/symbols

      type	           string	       true	         step0	       Market depth aggregation level, details below	step0, step1, step2, step3, step4, step5

      */
}
