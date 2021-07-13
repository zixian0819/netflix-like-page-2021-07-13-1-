import React, { useState, useEffect } from 'react';
import { db } from './services/firebase';
import './App.css';
import RowItem from './components/rowItem';
import NLogo from './components/nLogo';

function App() {
  const [NetflixMock, setNetflixMock] = useState([]);
  const [Recommendations, setRecommendations] = useState([]);
  const [Mylist, setMylist] = useState([]);

  useEffect(() => {
    function setMyList() {
      db.collection('NetflixMock')
        .get()
        .then((snapshot) => {
          const Netflixmock = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            Netflixmock.push({ ...data, isRec: false });
          });
          setNetflixMock(Netflixmock);
          setMylist(Netflixmock);
        })
        .catch((error) => console.log(error));
    }
    setMyList();
  }, []);

  useEffect(() => {
    function setRe() {
      db.collection('Recommendations')
        .get()
        .then((snapshot) => {
          const Recommendation = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            Recommendation.push({ ...data, isRec: true });
          });
          setRecommendations(Recommendation);
        })
        .catch((error) => console.log(error));
    }
    setRe();
  }, []);

  const saveNominationsToLocalStorage = (item) => {
    const newValue = [...Mylist];
    newValue.push(item);

    setMylist(newValue);

    window.localStorage.setItem('Mylist', JSON.stringify(newValue));
  };

  const removeNomination = (item, index) => {
    const newValue = [...Mylist];
    newValue.splice(index, 1);
    setMylist(newValue);
    window.localStorage.setItem('Mylist', JSON.stringify(newValue));
  };

  const getNominations = () => {
    const str = window.localStorage.getItem('Mylist');
    if (!str) {
      return;
    }
    try {
      const val = JSON.parse(str);
      setMylist(val);
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    getNominations();
  }, []);

  return (
    <div>
      <NLogo />
      <div className="App">
        <h1>My List </h1>
        <div className="myList">
          {NetflixMock &&
            NetflixMock.length > 0 &&
            Mylist.map((netflix, index) => {
              return (
                <div key={index} className="Mylists">
                  <RowItem key={index} {...netflix} type="remove" onRemove={() => removeNomination(netflix, index)} />
                </div>
              );
            })}
        </div>
        <h1>Recommendations </h1>
        <div className="myList">
          {Recommendations &&
            Recommendations.length > 0 &&
            Recommendations.map((row, index) => {
              const obj = Mylist.find((p) => !!p.isRec && p.id === row.id);
              row.type = !obj ? 'Nominate' : '';
              return (
                <div key={index} className="Mylists">
                  <RowItem {...row} onNominate={() => saveNominationsToLocalStorage(row, index)} />{' '}
                </div>
              );
            })}
        </div>
        <div style={{ marginTop: '20px', fontWeight: 'bold' }}>{Mylist && Mylist.map((p) => p.title).join(',')}</div>
      </div>
    </div>
  );
}

export default App;
