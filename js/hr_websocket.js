class HeartSocket {
  constructor(wsUri, connectedCallback, disconnectedCallback, dataCallback)
  {
    this.connectWs(wsUri, connectedCallback, disconnectedCallback, dataCallback)
  }
  connectWs(wsUri, connectedCallback, disconnectedCallback, dataCallback)
  {
    const vm = this
    var reconnectionTimeout = 0
    var websocket = new WebSocket(wsUri);
    websocket.onopen = connectedCallback
    websocket.onclose = function(evt) {
      disconnectedCallback(evt)
      console.log('Connection Closed')
      clearTimeout(reconnectionTimeout)
      reconnectionTimeout = setTimeout(function(){
        websocket.close()
        vm.connectWs(wsUri, connectedCallback,disconnectedCallback, dataCallback)
      }, 5000)
    };
    websocket.onmessage = dataCallback;
    websocket.onerror = function(evt) { 
      disconnectedCallback(evt)
      console.log('Connection Error')
      clearTimeout(reconnectionTimeout)
      reconnectionTimeout = setTimeout(function(){
        websocket.close()
        vm.connectWs(wsUri, connectedCallback,disconnectedCallback, dataCallback)
      }, 5000)
    };
  }
}