'use client';

import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

const Home = () => {
  const [input, setInput] = useState('');
  const [inputImg, setInputImg] = useState('');
  const [data, setData] = useState('');
  const [dataImg, setDataImg] = useState('');

  const submit = () => {
    setData('');
    axios
      .post('/api/text-completion', { prompt: input })
      .then((resolve) => {
        setData(resolve.data.data.choices[0].text);
      })
      .catch((reject) => {
        console.log(reject);
      });
  };

  const submitImg = () => {
    setDataImg('');
    axios
      .post('/api/image-generation', { prompt: inputImg })
      .then((resolve) => {
        console.log(resolve.data.data.data[0].url);
        setDataImg(resolve.data.data.data[0].url);
      })
      .catch((reject) => {
        console.log(reject);
      });
  };

  return (
    <div>
      <div>
        <h5>Text</h5>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={submit}>submit</button>

        <div>{data}</div>
      </div>
      <div>
        <h5>Image</h5>
        <input value={inputImg} onChange={(e) => setInputImg(e.target.value)} />
        <button onClick={submitImg}>submit</button>

        {/* <div>{data}</div> */}
        {dataImg && (
          <Image src={dataImg} alt={inputImg} width={512} height={512} />
        )}
      </div>
    </div>
  );
};

export default Home;
