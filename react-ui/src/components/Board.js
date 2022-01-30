// eslint-disable-next-line
import React, { useCallback, useEffect, useState } from 'react'
import '../css/Board.css'
import GameSelector from './GameSelector'
import TarocciStandard from './TarocciStandard'
import TarocciSet from './TarocciSet'
import PersonalDataForm from './PersonalDataForm'
import ReviewForm from './ReviewForm'
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

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

function Board(props) {

    const [url, setUrl] = useState('/content');
    const [isFetching, setIsFetching] = useState(false);
    const [contentPlayAgainButton, setContentPlayAgainButton] = useState();
    const [contentGameSelector, setContentGameSelector] = useState();
    const [contentForm, setContentForm] = useState();
    const [contentReview, setContentReview] = useState();
    const [content, setContent] = useState([]);

    const fetchData = useCallback(() => {
        fetch(url)
        .then(response => {
            if (!response.ok) {
            throw new Error(`status ${response.status}`);
            }                      
            return response.json();
        })
        .then(json => {
            json.map(el => {
                if(el.fields.Name === 'PlayAgainButton') {
                    setContentPlayAgainButton(el.fields);
                }
                if(el.fields.Name === 'GameSelector') {
                    setContentGameSelector(el.fields)
                }
                if(el.fields.Name === 'ContentForm') {
                    setContentForm(el.fields);
                }
                if(el.fields.Name === 'ContentReview') {
                    setContentReview(el.fields);
                }
                setContent((prevValue) => [...prevValue, el.fields]);
            });
            setIsFetching(false);
        }).catch(e => {
            // setMessage(`API call failed: ${e}`);
            setIsFetching(false);
            console.log('warning');
        })
    }, [url]);

    useEffect(() => {
        setIsFetching(true);
        fetchData();
    }, [fetchData]);

    const language = props.language;

    const [isChoosing, setIsChoosing] = useState(true);
    const [choice, setChoice] = useState('');
    const [gameType, setGameType] = useState('');
    const [fillForm, setFillForm] = useState(false);
    const [userInput, setUserInput] = useState();
    const [standardGamePlaying, setStandardGamePlaying] = useState(false);
    const [tarocciSetGamePlaying, setTarocciSetGamePlaying] = useState(false);
    const [cardSet, setCardSet] = useState();
    const [reverseList, setReverseList] = useState();
    const [playing, setPlaying] = useState(true);

    function chosen(choiceInput, gameInput) {
        setChoice(choiceInput);
        if(gameInput === 'standard') {
            setGameType('Standard')
            setStandardGamePlaying(true);
        } else if(gameInput === 'set') {
            setGameType('Set')
            prepareSet();
            setTarocciSetGamePlaying(true);
        }

        setIsChoosing(false);

        return;
    }

    function handleSubmitForm(input) {
        setUserInput(input);
        setFillForm(true);
        if(gameType === 'Set') {
            prepareSet();
        }
    }

    function handleSkipForm() {
        setFillForm(true);
    }

    function handleCloseReview(){
        setPlaying(true);
    }

    function switchStandardGame(playingInput) {
        setStandardGamePlaying(playingInput);
        setIsChoosing(true);
        setFillForm(false);
        setUserInput();
        setPlaying(false);
    }

    function switchSetGame(playingInput) {
        setTarocciSetGamePlaying(playingInput);
        setIsChoosing(true);
        setFillForm(false);
        setUserInput(null);
        setPlaying(false);
    }

    function defineReverse(inputCards) {
        let reverseArray = [];
        let random = null;
        for(let i =0; i < inputCards.length; i++) {
            random = Math.floor(Math.random() * 2);
            if(random === 0) {
                reverseArray.push(false);
            } else if(random === 1) {
                reverseArray.push(true);
            }
        }
        setReverseList(reverseArray);
    }

    function prepareSet() {
        let newRandomCard = 0;
        let newCard = null;
        let newCards = [];
        let cards = props.cardList.slice();
        for(let i = 0; i <= 7; i++){
            newRandomCard = Math.floor(Math.random() * cards.length);
            newCard = cards.splice(newRandomCard, 1);
            newCards.push(newCard);
        }
        setCardSet(newCards);
        defineReverse(newCards);

        return;
    }

    function handleLastStep() {
        if(isChoosing === false && fillForm === false) {
            setIsChoosing(true);
            setTarocciSetGamePlaying(false);
            setStandardGamePlaying(false);
        } else if(standardGamePlaying === true){
            setFillForm(false);
            setTarocciSetGamePlaying(false);
        } else if(tarocciSetGamePlaying === true) {
            setFillForm(false);
            setStandardGamePlaying(false);
        } 
    }

    return (
        <div className="board">
            {
                isChoosing === true ?
                <></>
                :
                <ThemeProvider theme={theme}>
                    <Stack className='lastStep' direction="row" spacing={1}>
                        <IconButton color="neutral" aria-label="Last step" onClick={() => {handleLastStep()}}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </IconButton>
                    </Stack>
                </ThemeProvider>
            }
            { playing === true && isChoosing === true &&
                <GameSelector onHandleChoice={chosen} language={language} content={contentGameSelector}/>
            }

            { playing === true && isChoosing === false && fillForm === false &&
                <PersonalDataForm onSubmitForm={handleSubmitForm} onSkipForm={handleSkipForm} type={`${choice}` + `${gameType}`} language={language} content={contentForm} />
            }
            { playing === true && contentPlayAgainButton && fillForm === true && standardGamePlaying === true && 
                <TarocciStandard onSwitchStandardGame={switchStandardGame} gameChoice={choice} cards={props.cardList} input={userInput} language={language} content={contentPlayAgainButton}/>
            }
            { playing === true && contentPlayAgainButton && fillForm === true && tarocciSetGamePlaying === true &&
                <TarocciSet onSwitchSetGame={switchSetGame} gameChoice={choice} cards={props.cardList} cardSet={cardSet} reverse={reverseList} input={userInput} language={language} content={content}/>
            }
            { playing === false &&
                <ReviewForm onCloseReview={handleCloseReview} language={language} content={contentReview} />
            }
        </div>
    )
}

export default Board;