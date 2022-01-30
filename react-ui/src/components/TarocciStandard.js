// eslint-disable-next-line
import '../css/TarocciStandard.css';
import React, { useState } from 'react';
import TarocciCardFront from './TarocciCardFront';
import TarocciCardCover from './TarocciCardCover'
import Button from '@material-ui/core/Button'
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

function TarocciStandard(props) {

    const language = props.language;

    const [playing, setPlaying] = useState(true);
    const [isSelectingCards, setIsSelectingCards] = useState(true);
    const [cardToShow, setCardToShow] = useState();
    const [cardsPlaying, setCardsPlaying] = useState(props.cards.slice());

    const cardResult ={
        id: Number,
        image: String,
        title: String,
        description: String,
        type: String
    };

    function selectedCard(cardIndex) {
        setCardsPlaying(props.cards.slice());
        let newRandomCard = 0;
        for(let i = 0; i <= cardIndex; i++){
            newRandomCard = Math.floor(Math.random() * cardsPlaying.length);
            cardsPlaying.splice(newRandomCard, 1);
        }
        setCardToShow(newRandomCard);
        setIsSelectingCards(false);
        setPlaying(false);
    }
    
    function renderCard() {

        props.cards.map(el => {
            if(cardToShow === el.index) {
                cardResult.id = el.index;
                cardResult.image = el.image;
                if(language === 'english') {
                    cardResult.title = el.name;
                    if(props.gameChoice === "career") {
                        cardResult.description = el.en_career;
                    }
                    else if(props.gameChoice === "relationship") {
                        cardResult.description = el.en_relationship;
                    }
                    else {
                        cardResult.description = el.en_decision;
                    }
                } else {
                    cardResult.title = el.ch_name;
                    if(props.gameChoice === "career") {
                        cardResult.description = el.ch_career;
                    }
                    else if(props.gameChoice === "relationship") {
                        cardResult.description = el.ch_relationship;
                    }
                    else {
                        cardResult.description = el.ch_decision;
                    }
                }
            }
            return null;
        })

        return (
            <div className='cardStandard cardFront'>
                <TarocciCardFront title={cardResult.title} description={cardResult.description} cardImage={cardResult.image} input={props.input} type={props.gameChoice} game='standard' language={language}/>
            </div>
        )
    }

    function startOver(playing){
        props.onSwitchStandardGame(playing);
    }
    return (
        <div>
            {props.content && isSelectingCards === true && 
                <div className='boardOfCards'>
                    <div className='cardStandard cardLeft'>
                        <TarocciCardCover index={0} onHandleSelect={selectedCard} cardImage='https://www.lenormandia.net/wp-content/uploads/2020/06/raider-waite-tarotkarte.png'></TarocciCardCover>
                    </div>
                    <div className='cardStandard cardMiddle'>
                        <TarocciCardCover index={1} onHandleSelect={selectedCard} cardImage='https://www.lenormandia.net/wp-content/uploads/2020/06/raider-waite-tarotkarte.png'></TarocciCardCover>
                    </div>
                    <div className='cardStandard cardRight'>
                        <TarocciCardCover index={2} onHandleSelect={selectedCard} cardImage='https://www.lenormandia.net/wp-content/uploads/2020/06/raider-waite-tarotkarte.png'></TarocciCardCover>
                    </div>
                </div>
            }
            {isSelectingCards === false && renderCard()}
            {playing === false && 
                <div className='buttonContainer'>
                    <ThemeProvider theme={theme}>
                        {
                            language === 'english' ?
                            <Button size='small' variant='outlined' color='primary' onClick={startOver}>
                                {props.content.en_text1}
                            </Button> :
                            <Button size='small' variant='outlined' color='primary' onClick={startOver}>
                                {props.content.ch_text1}
                            </Button>

                        }
                    </ThemeProvider>
                </div>
            }
        </div>
    )

}

export default TarocciStandard;