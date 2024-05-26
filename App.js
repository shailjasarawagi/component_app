import React from 'react';
import MyComponent from './src/component/MyComponent/MyComponent';

const App = () => {
  const sampleData = [
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
    { id: '3', name: 'Item 3' },
  ];

  return (
    <MyComponent data={sampleData} />
  );
}
export default App

