class HeartSocket {
  websocket = ''
  constructor(wsUri, connectedCallback, disconnectedCallback, dataCallback)
  {
    this.websocket = new WebSocket(wsUri);
    this.connectWs(connectedCallback, disconnectedCallback, dataCallback)
  }
  connectWs(connectedCallback, disconnectedCallback, dataCallback)
  {
    const vm = this
    const websocket = this.websocket
    websocket.onopen = connectedCallback
    websocket.onclose = function(evt) {
      disconnectedCallback(evt)
      setTimeout(function(){
        vm.connectWs(connectedCallback,disconnectedCallback, dataCallback)
      }, 5000)
    };
    websocket.onmessage = dataCallback;
    websocket.onerror = function(evt) { 
      disconnectedCallback(evt)
      setTimeout(function(){
        vm.connectWs(connectedCallback,disconnectedCallback, dataCallback)
      }, 5000)
    };
  }
}