import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './App.css';

function App() {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const headers = json[0];
    const dataRows = json.slice(1);

    setColumns(headers);
    setData(dataRows);
  };

  return (
    <div className="App">
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
