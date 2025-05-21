const Table = () => { 

    
    const ws = new WebSocket(`ws://localhost:3001`);


    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      console.log(event.data);
      
      console.log("Front : Message reçu " + event.data)  
      const messageList = document.getElementById('messages');
      const newItem = document.createElement('li');
      newItem.textContent = event.data;
      messageList.appendChild(newItem);
    };
}

export default Table