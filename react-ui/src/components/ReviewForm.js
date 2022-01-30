// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import '../css/ReviewForm.css';
import Button from '@material-ui/core/Button';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Airtable from 'airtable';
import Rating from '@mui/material/Rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'
// import StarIcon from '@mui/icons-material/Star';

var base = new Airtable({apiKey: 'keyUVmbar6wiZjmrx'}).base('appoly8fibJ9qgCzX');

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

function ReviewForm(props) {

    const labels = {
        1: props.language === 'english' ? 'Bad':'不好玩',
        2: props.language === 'english' ? 'OK':'普通',
        3: props.language === 'english' ? 'Fine':'還行',
        4: props.language === 'english' ? 'Good':'很棒',
        5: props.language === 'english' ? 'Excellent':'超有趣',
      };

    const [rating, setRating] = useState(2);
    const [text, setText] = useState();
    const [hover, setHover] = useState(-1);

    function skipForm() {
        props.onCloseReview();
    }

    function renderForm() {
        return (
            <>
                <Box
                    sx={{
                        width: 200,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                <Box sx={{ mb: 2 }}>
                    {props.language === 'english' ? props.content.en_text3 : props.content.ch_text3}
                </Box>
                <Rating
                    name="hover-feedback"
                    value={rating}
                    precision={1}
                    onChange={(event, newRating) => {
                    setRating(newRating);
                    }}
                    onChangeActive={(event, newHover) => {
                    setHover(newHover);
                    }}
                    // emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    emptyIcon={<FontAwesomeIcon style={{ opacity: 0.55 }} icon={faStar} />}
                />
                {rating !== null && (
                    <Box sx={{ mt: 1 }}>{labels[hover !== -1 ? hover : rating]}</Box>
                )}
                </Box>
                <TextField
                    className='input'
                    required
                    id="outlined-required"
                    label={props.language === 'english' ? props.content.en_text4 : props.content.ch_text4}
                    type='text'
                    name='text'
                    onChange={handleInput}
                    value={text}
                />
            </>
        )
    }

    function handleInput(event) {

        const inputType = event.target.name;
        if (inputType === 'rating') {
            let input = event.target.value;
            setRating(input);
        } else if (inputType === 'text') {
            let input = event.target.value;
            setText(input);
        }
    }

    const createRecord = async (fields) => {
        const table = base('reviewEntries');
        try {
            const createdRecord = await table.create(fields);
            // console.log(createdRecord);
        } catch (err) {
            console.error(err);
        }
    };

    function submitForm(event) {

        const input = {
                'rating': String,
                'text': String,
            };
        const saveRating = rating.toString()
        input.rating = saveRating;
        input.text = text;

        // base('reviewEntries').create([
        // {
        //     "fields": {
        //         "rating": input.rating,
        //         "text": input.text
        //     }
        // }
        // ], function(err, records) {
        //     if (err) {
        //         console.error(err);
        //         return;
        //     }
        // });
        
        createRecord(input);

        props.onCloseReview();

        setRating(0);
        setText('');
        event.preventDefault();
    }

    return (
        <div className='ReviewForm'>
            <ThemeProvider theme={theme}>
                <Box
                    className='box'
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 3 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    {renderForm()}
                    <div className='buttonContainer'>
                        <Button size='small' variant='outlined' color='primary' onClick={submitForm}>
                            {props.language === 'english' ? props.content.en_text1 : props.content.ch_text1}
                        </Button>
                    </div>
                </Box>
                <div className='buttonContainer'>
                    <Button size='small' variant='outlined' color='neutral' onClick={skipForm}>
                        {props.language === 'english' ? props.content.en_text2 : props.content.ch_text2}
                    </Button>
                </div>
            </ThemeProvider>
        </div>
    )

}

export default ReviewForm;
