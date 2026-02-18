import React from 'react';
import ReactDOM from 'react-dom/client';
import HelloWorld from './HelloWorld';
import PrintMessage from './PrintMessage';
import Contador from './Contador';
import Arreglos from './Arreglos';

ReactDOM.createRoot(document.getElementById('root')!)
.render(
    <React.StrictMode>
        < HelloWorld  />
        <PrintMessage message="Como te va?" message2={123} />
        <PrintMessage message="Soy un mensaje" message2={456} />
        <Contador inicial={10} />
        <Arreglos />
    </React.StrictMode>
)
