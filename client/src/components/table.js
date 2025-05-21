import React, { useEffect, useState } from 'react';

const Table = () => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
      const ws = new WebSocket('ws://localhost:3001');

      ws.onopen = () => {
        console.log('WebSocket connection established');
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setRows(prev => [...prev, data]);
        } catch (e) {
          console.error('Invalid JSON received:', event.data);
        }
      };

      return () => {
        ws.close();
      };
    }, []);

    return (
      <div className="table-container">
        <h2 className="table-title">Résultats des Calculs</h2>
        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre 1</th>
                <th>Nombre 2</th>
                <th>Opération</th>
                <th>Résultat</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-message">
                    En attente de données...
                  </td>
                </tr>
              ) : (
                rows.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.n1}</td>
                    <td>{row.n2}</td>
                    <td>{renderOperator(row.op)}</td>
                    <td>{row.result}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  function renderOperator(op) {
    switch (op) {
      case 'add': return '+';
      case 'sub': return '−';
      case 'mul': return '×';
      case 'div': return '÷';
      default: return op;
    }
}

export default Table;
