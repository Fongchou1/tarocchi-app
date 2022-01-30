// eslint-disable-next-line
import '../css/GameSelector.css';
import React, { useCallback, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';

const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
        main: '#000',
        darker: '#053e85',
        },
        neutral: {
        main: '#64748B',
        contrastText: '#fff',
        },
    },
});

function GameSelector(props) {

    const language = props.language;
    
    let gameToPlay = '';

    const [isChoosing, setIsChoosing] = useState(true);
    const [choice, setChoice] = useState();

    function handleChoice(event) {

        // console.log(event.currentTarget.value);
        setChoice(event.currentTarget.value);
        setIsChoosing(false);

        return;
    }

    function handleGame(event) {
        gameToPlay = event.currentTarget.value;
        props.onHandleChoice(choice, gameToPlay);

        return;
    }
    //handle dialog
    const [openStandardDialog, setOpenStandardDialog] = React.useState(false);
    const [openSetDialog, setOpenSetDialog] = useState(false);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpenStandardDialog = () => {
        setOpenStandardDialog(true);
    };

    const handleCloseStandardDialog = () => {
        setOpenStandardDialog(false);
    };
    const handleClickOpenSetDialog = () => {
        setOpenSetDialog(true);
    };

    const handleCloseSetDialog = () => {
        setOpenSetDialog(false);
    };
    //end of handing dialog
    return (
        <ThemeProvider theme={theme}>
        {props.content && 
            <div className='box gameSelector'>
                {isChoosing ? 
                <div className="boardButtons">
                    <div className='choicesButton'>
                        {
                            language === 'english' ?
                            <Button variant='contained' onClick={handleChoice} value="career">{props.content.en_text1}</Button> :
                            <Button variant='contained' onClick={handleChoice} value="career">{props.content.ch_text1}</Button>
                        }
                    </div>
                    <div className='choicesButton'>
                        {
                            language === 'english' ?
                            <Button variant='contained' onClick={handleChoice} value="relationship">{props.content.en_text2}</Button> :
                            <Button variant='contained' onClick={handleChoice} value="relationship">{props.content.ch_text2}</Button>
                        }
                    </div>
                    <div className='choicesButton'>
                        {
                            language === 'english' ?
                            <Button variant='contained' onClick={handleChoice} value="decision">{props.content.en_text3}</Button> :
                            <Button variant='contained' onClick={handleChoice} value="decision">{props.content.ch_text3}</Button>
                        }
                    </div>
                </div>
                :
                <div className="boardButtons">
                    <div className='choicesButton'>
                        {
                            language === 'english' ?
                            <Button variant='contained' onClick={handleGame} value="standard">{props.content.en_text4}</Button> :
                            <Button variant='contained' onClick={handleGame} value="standard">{props.content.ch_text4}</Button>
                        }
                        <div className='information'>
                            {/* dialog */}
                            <Button variant="text" onClick={handleClickOpenStandardDialog} color='neutral'>
                                <FontAwesomeIcon icon={faInfoCircle} size="lg" />
                            </Button>
                            <Dialog
                                fullScreen={fullScreen}
                                open={openStandardDialog}
                                onClose={handleCloseStandardDialog}
                                aria-labelledby="standard"
                            >
                                {
                                    language === 'english' ?
                                    <DialogTitle id="standard">
                                        {props.content.en_text8}
                                    </DialogTitle> :
                                    <DialogTitle id="standard">
                                        {props.content.ch_text8}
                                    </DialogTitle>
                                }
                                <DialogContent>
                                {
                                    language === 'english' ?
                                    <DialogContentText>
                                        {props.content.en_text6}
                                    </DialogContentText> :
                                    <DialogContentText>
                                        {props.content.ch_text6}
                                    </DialogContentText>
                                }
                                </DialogContent>
                                <DialogActions>
                                {
                                    language === 'english' ?
                                    <Button onClick={handleCloseStandardDialog} autoFocus>
                                        {props.content.en_text10}
                                    </Button> :
                                    <Button onClick={handleCloseStandardDialog} autoFocus>
                                        {props.content.ch_text10}
                                    </Button>
                                }
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>
                    {
                        choice === 'relationship' ? 
                        <div className='choicesButton'>
                            {
                                language === 'english' ?
                                <Button variant='contained' onClick={handleGame} value="set">{props.content.en_text5}</Button> :
                                <Button variant='contained' onClick={handleGame} value="set">{props.content.ch_text5}</Button>
                            }
                            <div className='information'>
                                {/* dialog */}
                                <Button variant="text" onClick={handleClickOpenSetDialog} color='neutral'>
                                    <FontAwesomeIcon icon={faInfoCircle} size="lg" />
                                </Button>
                                <Dialog
                                    fullScreen={fullScreen}
                                    open={openSetDialog}
                                    onClose={handleCloseSetDialog}
                                    aria-labelledby="set"
                                >
                                    {
                                        language === 'english' ?
                                        <DialogTitle id="set">
                                            {props.content.en_text9}
                                        </DialogTitle> :
                                        <DialogTitle id="set">
                                            {props.content.ch_text9}
                                        </DialogTitle>
                                    }
                                    <DialogContent>
                                    {
                                        language === 'english' ?
                                        <DialogContentText>
                                            {props.content.en_text7}
                                        </DialogContentText> :
                                        <DialogContentText>
                                            {props.content.ch_text7}
                                        </DialogContentText>
                                    }
                                    </DialogContent>
                                    <DialogActions>
                                    {
                                        language === 'english' ?
                                        <Button onClick={handleCloseSetDialog} autoFocus>
                                            {props.content.en_text10}
                                        </Button> :
                                        <Button onClick={handleCloseSetDialog} autoFocus>
                                            {props.content.ch_text10}
                                        </Button>
                                    }
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>
                        :
                        <></>
                    }
                </div>}
            </div>
        }
        </ThemeProvider>
    )

}

export default GameSelector;