// eslint-disable-next-line
import React from 'react';
import '../css/PlayAgainButton.css';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'

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

function PlayAgainButton(props) {

    const language = props.language;

    function handleClick() {
        props.onHandleClick();
    }

    return (
        <div>
            <ThemeProvider theme={theme}>
                {
                    language === 'english' ?
                    <Button size='small' variant='outlined' color='primary' onClick={handleClick}>
                        {props.content.en_text1}
                    </Button> :
                    <Button size='small' variant='outlined' color='primary' onClick={handleClick}>
                        {props.content.ch_text1}
                    </Button>
                }
            </ThemeProvider>
        </div>
    )

}

export default PlayAgainButton;

