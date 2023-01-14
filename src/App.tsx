import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { lstat } from 'fs';

function App() {
  const [list, setList] = useState<any[]>([]);
  const [undid, setUndid] = useState<any[]>([]);

  const handleClick = (event: any) => {
    const newDot = {
      clientX: event.clientX,
      clientY: event.clientY,

    };

    console.log(newDot);

    setList((prev: any[]) => [...prev, newDot]);
  }
  const handleUndo = (event: any) => {
    event.stopPropagation();
    console.log('undo');
    if(list.length === 0){
      return;
    }
    const lastItem = list[list.length -1];
    setUndid((prev: any[]) => [...prev, lastItem])
    setList((prev: any[]) => {
      const newArray = [...prev].slice(0, -1);
      return newArray;
    })
  }
  const handleRedo =(event: any) => {
    event.stopPropagation();
    console.log('redo');
    const lastItem = undid[undid.length -1];
    if(undid.length === 0){
      return;
    }
    setUndid((prev: any) => {
      const newArray= [...prev].slice(0, -1);
      return newArray;
    });
    setList((prev: any[]) => [...prev, lastItem]);
  }
  return (
    <div id='page' onClick={handleClick}>
      <button onClick={handleUndo}>Desfazer</button>
      <button onClick={handleRedo}>Refazer</button>
      {list.map(item => (<span className='dot' style={{ left: item.clientX, top: item.clientY }} />))}
    </div>
  );
}

export default App;
