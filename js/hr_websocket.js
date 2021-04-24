class HeartSocket {
  constructor(wsUri, connectedCallback, disconnectedCallback, dataCallback)
  {
    this.connectWs(wsUri, connectedCallback, disconnectedCallback, dataCallback)
  }
  connectWs(wsUri, connectedCallback, disconnectedCallback, dataCallback)
  {
    const vm = this
    var websocket = new WebSocket(wsUri);
    websocket.onopen = connectedCallback
    websocket.onclose = function(evt) {
      disconnectedCallback(evt)
      setTimeout(function(){
        vm.connectWs(wsUri, connectedCallback,disconnectedCallback, dataCallback)
      }, 5000)
    };
    websocket.onmessage = dataCallback;
    websocket.onerror = function(evt) { 
      disconnectedCallback(evt)
      setTimeout(function(){
        vm.connectWs(wsUri, connectedCallback,disconnectedCallback, dataCallback)
      }, 5000)
    };
  }
}