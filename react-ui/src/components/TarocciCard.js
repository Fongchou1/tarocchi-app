// eslint-disable-next-line
import React, {useState} from 'react'
// eslint-disable-next-line
import '../css/TarocciCard.css'
import TarocciCardFront from './TarocciCardFront'
import TarocciCardCover from './TarocciCardCover'

function TarocciCard(props) {

    const language = props.language;

    const [frontState, setFrontState] = useState(false);
    const [coverState, setCoverState] = useState(true);
    const [displayCard, setDisplayCard] = useState(false);
    const [turnableFront, setTurnableFront] = useState(false);
    const [turnableCover, setTurnableCover] = useState(true);
    const cardIndex = props.cardIndex;
    const cardsPlaying = props.cardsPlaying;
    const choice = props.choice;

    const cardResult ={
        id: Number,
        image: String,
        title: String,
        description: String
    };

    function renderCard() {
        cardsPlaying.map(el => {
            if(cardIndex === el.index) {
                cardResult.id = el.index;
                cardResult.image = el.image;
                if(language === 'english') {
                    cardResult.title = el.name;
                    if(choice === "career") {
                            cardResult.description = el.en_career;
                    }
                    else if(choice === "relationship") {
                        if(props.reverse === false) {
                            cardResult.description = el.en_relationship;
                        } else if(props.reverse === true) {
                            cardResult.description = el.en_relationship_R;
                        }
                    }
                    else {
                        cardResult.description = el.en_decision;
                    }
                } else {
                    cardResult.title = el.ch_name;
                    if(choice === "career") {
                        cardResult.description = el.ch_career;
                    }
                    else if(choice === "relationship") {
                        if(props.reverse === false) {
                            cardResult.description = el.ch_relationship;
                        } else if(props.reverse === true) {
                            cardResult.description = el.ch_relationship_R;
                        }
                    }
                    else {
                        cardResult.description = el.ch_decision;
                    }
                }
            }
            return null;
        })
    }

    async function turnToFront() {
        setCoverState(!coverState);
        setTurnableCover(false);
        const animation = await setTimeout(() => {
            setDisplayCard(true);
            setFrontState(!frontState);
            setTurnableFront(true);
          }, 1000);
    }

    async function turnToCover() {
        setFrontState(!frontState);
        setTurnableFront(false);
        const animation = await setTimeout(() => {
            setDisplayCard(false);
            setCoverState(!coverState);
            setTurnableCover(true);
          }, 1000);
    }

    function disableTurnable() {

    }


    return (
        <div>
            {displayCard ? 
            <div 
                className={frontState ? 'box switch-on' : 'box switch-off'} 
                onClick={turnableFront ? turnToCover : disableTurnable} 
            >
                {renderCard()}
                <TarocciCardFront title={cardResult.title} description={cardResult.description} cardImage={cardResult.image} reverse={props.reverse} input={props.input} type={choice} game='set' language={language}/>
            </div>
            : 
            <div 
                className={coverState ? 'box switch-on' : 'box switch-off'} 
            >
                <TarocciCardCover cardImage='https://www.lenormandia.net/wp-content/uploads/2020/06/raider-waite-tarotkarte.png' onHandleSelect={turnableCover ? turnToFront : disableTurnable} />
            </div>
            }
        </div>
    );
}

export default TarocciCard;