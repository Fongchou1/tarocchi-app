// eslint-disable-next-line
import React, {useState , useEffect} from 'react'
import TarocciCard from './TarocciCard'
import '../css/TarocciSet.css'
import PlayAgainButton from './PlayAgainButton'


function TarocciSet(props) {

    const language = props.language;

    const cardSet = props.cardSet.slice();

    const [contentPlayAgainButton, setContentPlayAgainButton] = useState();
    const [contentSetDescription, setContentSetDescription] = useState();

    useEffect(() => {
        let resultPlayAgainButton = null;
        let resultContentSetDescription = null;
        if (props.content != null) {
            resultPlayAgainButton = props.content.find( currRecord => currRecord.Name === 'PlayAgainButton' );
            resultContentSetDescription = props.content.find( currRecord => currRecord.Name === 'SetDescription' )
        }
        setContentPlayAgainButton(resultPlayAgainButton);
        setContentSetDescription(resultContentSetDescription);
        // console.log(contentSetDescription);
      }, []);

    function renderCards () {
        return (
            // cardSet.map(el => (
                <div className='TarocciSet column'>

                    <div className='row gameLabel'>
                    {/* You both's present */}
                        <p>
                            {
                                language === 'english' ?
                                contentSetDescription.en_text1
                                :
                                contentSetDescription.ch_text1
                            }
                        </p>
                    </div>
                    <div className='row'>
                        <div className='card'>
                            <div className='row gameLabel'>
                            {/* yours */}
                                <p>
                                    {
                                        language === 'english' ?
                                        contentSetDescription.en_text6
                                        :
                                        contentSetDescription.ch_text6
                                    }
                                </p>
                            </div>
                            <TarocciCard choice={props.gameChoice} cardIndex={cardSet[0][0].index} cardsPlaying={props.cards} reverse={props.reverse[0]} input={props.input} language={language}/>
                        </div>
                        <div className='card'>
                            <div className='row gameLabel'>
                            {/* The other person's */}
                                <p>
                                    {
                                        language === 'english' ?
                                        contentSetDescription.en_text7
                                        :
                                        contentSetDescription.ch_text7
                                    }
                                </p>
                            </div>
                            <TarocciCard choice={props.gameChoice} cardIndex={cardSet[1][0].index} cardsPlaying={props.cards} reverse={props.reverse[1]} input={props.input} language={language}/>
                        </div>
                    </div>

                    <div className='row gameLabel'>
                    {/* Conflict */}
                        <p>
                            {
                                language === 'english' ?
                                contentSetDescription.en_text2
                                :
                                contentSetDescription.ch_text2
                            }
                        </p>
                    </div>
                    <div className='row'>
                        <div className='card'>
                            <TarocciCard choice={props.gameChoice} cardIndex={cardSet[2][0].index} cardsPlaying={props.cards} reverse={props.reverse[2]} input={props.input} language={language}/>
                        </div>
                    </div>

                    <div className='row gameLabel'>
                    {/* Your past */}
                        <p>
                            {
                                language === 'english' ?
                                contentSetDescription.en_text3
                                :
                                contentSetDescription.ch_text3
                            }
                        </p>
                    </div>
                    <div className='row'>
                        <div className='card'>
                            <div className='row gameLabel'>
                                {/* yours */}
                                <p>
                                    {
                                        language === 'english' ?
                                        contentSetDescription.en_text6
                                        :
                                        contentSetDescription.ch_text6
                                    }
                                </p>
                            </div>
                            <TarocciCard choice={props.gameChoice} cardIndex={cardSet[3][0].index} cardsPlaying={props.cards} reverse={props.reverse[3]} input={props.input} language={language}/>
                        </div>
                        <div className='card'>
                            <div className='row gameLabel'>
                                {/* The other person's */}
                                <p>
                                    {
                                        language === 'english' ?
                                        contentSetDescription.en_text7
                                        :
                                        contentSetDescription.ch_text7
                                    }
                                </p>
                            </div>
                            <TarocciCard choice={props.gameChoice} cardIndex={cardSet[4][0].index} cardsPlaying={props.cards} reverse={props.reverse[4]} input={props.input} language={language}/>
                        </div>
                    </div>

                    <div className='row gameLabel'>
                        {/* Your future */}
                        <p>
                            {
                                language === 'english' ?
                                contentSetDescription.en_text4
                                :
                                contentSetDescription.ch_text4
                            }
                        </p>
                    </div>
                    <div className='row'>
                        <div className='card'>
                            <div className='row gameLabel'>
                                {/* yours */}
                                <p>
                                    {
                                        language === 'english' ?
                                        contentSetDescription.en_text6
                                        :
                                        contentSetDescription.ch_text6
                                    }
                                </p>
                            </div>
                            <TarocciCard choice={props.gameChoice} cardIndex={cardSet[5][0].index} cardsPlaying={props.cards} reverse={props.reverse[5]} input={props.input} language={language}/>
                        </div>
                        <div className='card'>
                            <div className='row gameLabel'>
                                {/* The other person's */}
                                <p>
                                    {
                                        language === 'english' ?
                                        contentSetDescription.en_text7
                                        :
                                        contentSetDescription.ch_text7
                                    }
                                </p>
                            </div>
                            <TarocciCard choice={props.gameChoice} cardIndex={cardSet[6][0].index} cardsPlaying={props.cards} reverse={props.reverse[6]} input={props.input} language={language}/>
                        </div>
                    </div>

                    <div className='row gameLabel'>
                        {/* Result */}
                        <p>
                            {
                                language === 'english' ?
                                contentSetDescription.en_text5
                                :
                                contentSetDescription.ch_text5
                            }
                        </p>
                    </div>
                    <div className='row'>
                        <div className='card'>
                            <TarocciCard choice={props.gameChoice} cardIndex={cardSet[7][0].index} cardsPlaying={props.cards} reverse={props.reverse[7]} input={props.input} language={language}/>
                        </div>
                    </div>
                </div>
            // ))
        )
    }

    function startOver(){
        props.onSwitchSetGame(false);
    }

    return (
        <div>
            {props.content &&
            <div className='column'>
                {contentSetDescription && renderCards()}
                <div className='row'>
                    <div className='buttonContainer'>
                        {
                            contentPlayAgainButton &&
                            <PlayAgainButton onHandleClick={() => startOver()} language={language} content={contentPlayAgainButton} />
                        }
                    </div>
                </div>
            </div>}
        </div>
    );

}

export default TarocciSet;