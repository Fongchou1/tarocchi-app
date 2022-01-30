// eslint-disable-next-line
import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board';
import Footer from './components/Footer'
import Welcome from './components/Welcome';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import SlideSnackbar from './components/SlideSnackbar'



const cards = [];

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#fff',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

function App() {
  // let cards = [];
  // const [message, setMessage] = useState(null);

  const [language, setLanguage] = useState('english');
  const [isFetching, setIsFetching] = useState(false);
  // const [url, setUrl] = useState('https://api.airtable.com/v0/appoly8fibJ9qgCzX/cards?api_key=keyUVmbar6wiZjmrx');
  const [url, setUrl] = useState('/api');

  const fetchData = useCallback(() => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        json.map(el => cards.push(el.fields));
        setIsFetching(false);
      }).catch(e => {
        // setMessage(`API call failed: ${e}`);
        setIsFetching(false);
      })
  }, [url]);

  useEffect(() => {
    setIsFetching(true);
    fetchData();
  }, [fetchData]);

  //start
  const [start, setStart] = useState(false);
  const changeStatus = () => {
    setStart(true);
  }

  const switchLanguage = () => {
    if(language === 'english') {
      setLanguage('chinese');
    } else {
      setLanguage('english');
    }
  }

  return (
    <div className="App">
        <ThemeProvider theme={theme}>
          <div className='languageSwitch'>
            {
              language === 'english' ? 
              <Button variatn='text' color='primary' onClick={() => {switchLanguage()}}>中</Button> :
              <Button variant='text' color='primary' onClick={() => {switchLanguage()}}>Eng</Button>
            }
          </div>
        </ThemeProvider>
        <header className="App-header">
        {
          start === true ?
          <Board cardList={cards} language={language}></Board>
          :  
          <Welcome onChangeStatus={() => {changeStatus()}} />
        }
        {/* { process.env.NODE_ENV === 'production' ?
            <p>
              This is a production build from create-react-app.
            </p>
          : <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
        } */}
        {/* <p>{'« '}<strong>
          {isFetching
            ? 'Fetching message from API'
            : message}
        </strong>{' »'}</p> */}
        </header>
        <Footer />
        <SlideSnackbar language={language} />
    </div>
  );

}

export default App;
