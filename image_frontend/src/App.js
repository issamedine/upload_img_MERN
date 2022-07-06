import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000')
      .then((res) => setData(res.data))
      .catch((err) => console.log(err, 'it has an error'));
  }, []);

  const onChangeFile = (e) => {
    setImage(e.target.files[0]);
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('testImage', image);
    formData.append('name', name);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    axios
      .post('http://localhost:5000/addimage', formData, config)
      .then((res) => console.log('success'))
      .catch((err) => console.log('err', err));
  };

  return (
    <div className="App">
      <h1>Image uploading react</h1>
      {data?.map((singleData) => {
        const base64String = btoa(
          String.fromCharCode(...new Uint8Array(singleData.img.data.data))
        );
        return (
          <img src={`data:image/png;base64,${base64String}`} width="300" />
        );
      })}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" name="testImage" onChange={onChangeFile} />
        <input type="text" name="name" onChange={onChangeName} />
        <input type="submit" value="add image" />
      </form>
    </div>
  );
}

export default App;
