'use client';

import { useState } from 'react';
import axios from 'axios';

const ChatGPT = () => {
  const [inputSentiment, setInputSentiment] = useState('');
  const [inputClustering, setInputClustering] = useState('');
  const [dataSentiment, setDataSentiment] = useState('');
  const [dataClustering, setDataClustering] = useState('');

  const submitSentiment = () => {
    setDataSentiment('');

    const input = inputSentiment
      .split(/\r?\n/)
      .filter((element: string) => element)
      .map((element: string, index: number) => `\n${index + 1}. ${element}`);
    const inputFormatted = input.join('');
    const inputResult = `Classify the sentiment in these sentences: ${inputFormatted} \nSentence sentiment ratings (positif/negatif/netral):`;

    axios
      .post('/api/text-completion', { prompt: inputResult })
      .then((resolve) => {
        setDataSentiment(resolve.data.data.choices[0].text);
      })
      .catch((reject) => {
        console.log(reject);
      });
  };

  const submitClustering = () => {
    setDataClustering('');

    const input = inputClustering
      .split(/\r?\n/)
      .filter((element: string) => element)
      .map((element: string, index: number) => `\n${index + 1}. ${element}`);
    const inputFormatted = input.join('');
    const inputResult = `Di antara kelompok ini: aplikasi, masalah gangguan internet, masalah langganan, masalah lain, bertanya, ketidakpuasan, pendaftaran dan pemasangan \nKlasifikasikan kalimat berikut dari kelompok sebelumnya tanpa penjelasan: ${inputFormatted}`;

    axios
      .post('/api/text-completion', { prompt: inputResult })
      .then((resolve) => {
        setDataClustering(resolve.data.data.choices[0].text);
      })
      .catch((reject) => {
        console.log(reject);
      });
  };

  const handleClear = () => {
    setInputSentiment('');
    setInputClustering('');
    setDataSentiment('');
    setDataClustering('');
  };

  return (
    <div className="flex h-full flex-col gap-8 bg-slate-200 px-4 py-12">
      <button
        onClick={handleClear}
        className="w-fit self-end rounded-lg bg-red-600 p-2 text-lg text-white"
      >
        Clear
      </button>
      <div className="flex w-full flex-col gap-2 rounded-lg p-4 shadow-lg">
        <h3 className="font-bold">Input Sentiment Feedback</h3>
        <h5>Klasifikasi sentiment di antara positif, negatif & netral</h5>
        <textarea
          value={inputSentiment}
          onChange={(e) => setInputSentiment(e.target.value)}
          className="w-full rounded-lg border-2 p-4"
          rows={5}
        />
        <button
          onClick={submitSentiment}
          className="w-fit self-end rounded-lg bg-blue-600 p-2 text-lg text-white"
        >
          Submit
        </button>
        {dataSentiment && (
          <div className="flex w-full flex-col gap-2">
            <h3 className="font-bold">Output Sentiment Feedback</h3>
            <div style={{ whiteSpace: 'pre-wrap' }}>{dataSentiment}</div>
          </div>
        )}
      </div>
      <div className="flex w-full flex-col gap-2 rounded-lg p-4 shadow-lg">
        <h3 className="font-bold">Input Summarize</h3>
        <h5>
          Clustering kalimat di antara kategori tertentu (contoh: aplikasi,
          masalah gangguan internet, masalah langganan, masalah lain, bertanya,
          ketidakpuasan & pendaftaran dan pemasangan)
        </h5>
        <textarea
          value={inputClustering}
          onChange={(e) => setInputClustering(e.target.value)}
          className="w-full rounded-lg border-2 p-4"
          rows={5}
        />
        <button
          onClick={submitClustering}
          className="w-fit self-end rounded-lg bg-blue-600 p-2 text-lg text-white"
        >
          Submit
        </button>
        {dataClustering && (
          <div className="flex w-full flex-col gap-2">
            <h3 className="font-bold">Output Summarize</h3>
            <div style={{ whiteSpace: 'pre-wrap' }}>{dataClustering}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatGPT;
