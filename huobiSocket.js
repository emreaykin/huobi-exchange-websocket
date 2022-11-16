var socket = new WebSocket("wss://api.huobi.pro/ws")

socket.binaryType="arraybuffer";

socket.onopen=function(){
    console.log("Connected")
}


/*socket.onopen(function (){
    console.log("Connected")
})
*/
