import logo from './logo.svg';
import './App.css';
import React,{useRef} from'react';
function App() {
  const inputRef = useRef(null);
  const handleClick = () => {
    inputRef.current.click();
  };  
  const handleFileChange1 = (e) => {
    const files = e.target.files;
    console.log(files);
  };

  function handleDragEnter (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  function handleDragOver (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  function handleDrop (event) {
    event.preventDefault();
    event.stopPropagation();
    const items = event.dataTransfer.items;
    for (const  item of items) {
        console.log(item);
        const entry = item.webkitGetAsEntry()
        if (entry.isFile) {
          console.log('文件');
          entry.file(file => {
              console.log(file);
          });
      } else if (entry.isDirectory) {
          console.log(entry.fullPath);
          entry.createReader().readEntries(entry => {
              console.log(entry);
              console.log('文件', entry);
          });
      }
    }
  }
  return (
    <div className="container">
        <div 
           className="header"
           onDragEnter={handleDragEnter}
           onDragOver={handleDragOver}
           onDrop={handleDrop}
        >
           上传区域
        </div>
        <div>
            1.选择文件
            <input type="file" multiple onChange={handleFileChange1} ref={inputRef} />
        </div>
        <div>
           2.选择文件夹
            <input type="file"  webkitdirectory="true" onChange={handleFileChange1} />
        </div>
    </div>
  );
}

export default App;
