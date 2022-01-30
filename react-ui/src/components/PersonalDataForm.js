// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import '../css/PersonalDataForm.css';
import Button from '@material-ui/core/Button';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Airtable from 'airtable';

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

function PersonalDataForm (props) {

    const [user, setUser] = useState('');
    const [career, setCareer] = useState();
    const [otherPerson, setOtherPerson] = useState('');
    const [decision, setDecision] = useState();
    const [typeOfRelationship, setTypeOfRelationship] = useState();
    const [age, setAge] = useState();
    const [validation, setValidation] = useState(
        {
            'user': 0,
            'career': 0,
            'otherPerson': 0,
            'decision': 0,
            'typeOfRelationship': 0,
            'age': 0
        }
    );

    function renderTypeOfForm() {
        return (
            <>
                {props.type === 'relationshipSet' ? relationshipSetForm() : <></>}
                {props.type === 'relationshipStandard' ? relationshipStandardForm() : <></>}
                {props.type === 'careerStandard' ? careerStandardForm() : <></>}
                {props.type === 'decisionStandard' ? decisionStandardForm() : <></>}
            </>
        );
    }

    function careerStandardForm() {
        return(
            <>
                {   validation.user === 0 ?
                    <TextField
                        // sx={{ input: { color: 'red' } }}
                        className='input'
                        required
                        id="outlined-required"
                        label={props.language === 'english' ? props.content.en_text1 : props.content.ch_text1}
                        type='text'
                        name='user'
                        onChange={handleUser}
                        value={user}
                        color='primary'
                        helperText={props.language === 'english' ? props.content.en_text10 : props.content.ch_text10}
                    />
                    :
                    <TextField
                        className='input'
                        error
                        id="outlined-error"
                        label={props.language === 'english' ? props.content.en_text1 : props.content.ch_text1}
                        type='text'
                        name='user'
                        onChange={handleUser}
                        value={user}
                        helperText={props.language === 'english' ? props.content.en_text9 : props.content.ch_text9}
                    />
                }
                {
                    validation.career === 0 ?
                    <TextField
                        className='input'
                        required
                        id="outlined-required"
                        label={props.language === 'english' ? props.content.en_text2 : props.content.ch_text2}
                        type='text'
                        name='career'
                        onChange={handleCareer}
                        value={career}
                        helperText={props.language === 'english' ? props.content.en_text11 : props.content.ch_text11}
                    />
                    :
                    <TextField
                        className='input'
                        error
                        id="outlined-error"
                        label={props.language === 'english' ? props.content.en_text2 : props.content.ch_text2}
                        type='text'
                        name='career'
                        onChange={handleCareer}
                        value={career}
                        helperText={props.language === 'english' ? props.content.en_text9 : props.content.ch_text9}
                    />
                }
            </>
        );
    }

    function relationshipStandardForm() {
        return(
            <>
                {
                    validation.user === 0 ?
                    <TextField
                        // sx={{ input: { color: 'red' } }}
                        className='input'
                        required
                        id="outlined-required"
                        label={props.language === 'english' ? props.content.en_text1 : props.content.ch_text1}
                        type='text'
                        name='user'
                        onChange={handleUser}
                        value={user}
                        helperText={props.language === 'english' ? props.content.en_text10 : props.content.ch_text10}
                    />
                    :
                    <TextField
                        className='input'
                        error
                        id="outlined-error"
                        label={props.language === 'english' ? props.content.en_text1 : props.content.ch_text1}
                        type='text'
                        name='user'
                        onChange={handleUser}
                        value={user}
                        helperText={props.language === 'english' ? props.content.en_text9 : props.content.ch_text9}
                    />
                }
                {
                    validation.typeOfRelationship === 0 ?
                    <TextField
                        className='input'
                        required
                        id="outlined-required"
                        label={props.language === 'english' ? props.content.en_text3 : props.content.ch_text3}
                        type='text'
                        name='typeOfRelationship'
                        onChange={handleTypeOfRelationship}
                        value={typeOfRelationship}
                        helperText={props.language === 'english' ? props.content.en_text12 : props.content.ch_text12}
                    />
                    :
                    <TextField
                        className='input'
                        error
                        id="outlined-error"
                        label={props.language === 'english' ? props.content.en_text3 : props.content.ch_text3}
                        type='text'
                        name='typeOfRelationship'
                        onChange={handleTypeOfRelationship}
                        value={typeOfRelationship}
                        helperText={props.language === 'english' ? props.content.en_text9 : props.content.ch_text9}
                    />
                }
                {
                    validation.age === 0 ?
                    <TextField
                        className='input'
                        required
                        id="outlined-required"
                        label={props.language === 'english' ? props.content.en_text4 : props.content.ch_text4}
                        type='number'
                        name='age'
                        onChange={handleAge}
                        value={age}
                    />
                    :
                    <TextField
                        className='input'
                        error
                        id="outlined-error"
                        label={props.language === 'english' ? props.content.en_text4 : props.content.ch_text4}
                        type='number'
                        name='age'
                        onChange={handleAge}
                        value={age}
                        helperText={props.language === 'english' ? props.content.en_text9 : props.content.ch_text9}
                    />
                }
            </>
        );
    }

    function relationshipSetForm() {
        return(
            <>
                {
                    validation.user === 0 ?
                    <TextField
                        // sx={{ input: { color: 'red' } }}
                        className='input'
                        required
                        id="outlined-required"
                        label={props.language === 'english' ? props.content.en_text1 : props.content.ch_text1}
                        type='text'
                        name='user'
                        onChange={handleUser}
                        value={user}
                        color='primary'
                        helperText={props.language === 'english' ? props.content.en_text10 : props.content.ch_text10}
                    />
                    :
                    <TextField
                        className='input'
                        error
                        id="outlined-error"
                        label={props.language === 'english' ? props.content.en_text1 : props.content.ch_text1}
                        type='text'
                        name='user'
                        onChange={handleUser}
                        value={user}
                        helperText={props.language === 'english' ? props.content.en_text9 : props.content.ch_text9}
                    />
                }
                {
                    validation.otherPerson === 0 ?
                    <TextField
                        className='input'
                        required
                        id="outlined-required"
                        label={props.language === 'english' ? props.content.en_text5 : props.content.ch_text5}
                        type='text'
                        name='otherPerson'
                        onChange={handleOtherPerson}
                        value={otherPerson}
                        helperText={props.language === 'english' ? props.content.en_text13 : props.content.ch_text13}
                    />
                    :
                    <TextField
                        className='input'
                        error
                        id="outlined-error"
                        label={props.language === 'english' ? props.content.en_text5 : props.content.ch_text5}
                        type='text'
                        name='otherPerson'
                        onChange={handleOtherPerson}
                        value={otherPerson}
                        helperText={props.language === 'english' ? props.content.en_text9 : props.content.ch_text9}
                    />
                }
                {
                    validation.age === 0 ?
                    <TextField
                        className='input'
                        required
                        id="outlined-required"
                        label={props.language === 'english' ? props.content.en_text4 : props.content.ch_text4}
                        type='number'
                        name='age'
                        onChange={handleAge}
                        value={age}
                    />
                    :
                    <TextField
                        className='input'
                        error
                        id="outlined-error"
                        label={props.language === 'english' ? props.content.en_text4 : props.content.ch_text4}
                        type='number'
                        name='age'
                        onChange={handleAge}
                        value={age}
                        helperText={props.language === 'english' ? props.content.en_text9 : props.content.ch_text9}
                    />
                }
            </>
        );
    }

    function decisionStandardForm() {
        return(
            <>
                {
                    validation.user === 0 ?
                    <TextField
                        // sx={{ input: { color: 'red' } }}
                        className='input'
                        required
                        id="outlined-required"
                        label={props.language === 'english' ? props.content.en_text1 : props.content.ch_text1}
                        type='text'
                        name='user'
                        onChange={handleUser}
                        value={user}
                        color='primary'
                        helperText={props.language === 'english' ? props.content.en_text10 : props.content.ch_text10}
                    />
                    :
                    <TextField
                        className='input'
                        error
                        id="outlined-error"
                        label={props.language === 'english' ? props.content.en_text1 : props.content.ch_text1}
                        type='text'
                        name='user'
                        onChange={handleUser}
                        value={user}
                        helperText={props.language === 'english' ? props.content.en_text9 : props.content.ch_text9}
                    />
                }
                {
                    validation.decision === 0 ?
                    <TextField
                        className='input'
                        required
                        id="outlined-required"
                        label={props.language === 'english' ? props.content.en_text6 : props.content.ch_text6}
                        type='text'
                        name='decision'
                        onChange={handleDecision}
                        value={decision}
                        helperText={props.language === 'english' ? props.content.en_text14 : props.content.ch_text14}
                    />
                    :
                    <TextField
                        className='input'
                        error
                        id="outlined-error"
                        label={props.language === 'english' ? props.content.en_text6 : props.content.ch_text6}
                        type='text'
                        name='decision'
                        onChange={handleDecision}
                        value={decision}
                        helperText={props.language === 'english' ? props.content.en_text9 : props.content.ch_text9}
                    />
                }
            </>
        );
    }

    function handleUser (event) {
        const input = event.target.value;
        setUser(input);
        setValidation(prevValue => (
            {
                ...prevValue,
                'user': 0
            }
        ))
    }

    function handleCareer (event) {
        const input = event.target.value;
        setCareer(input);
        setValidation(prevValue => (
            {
                ...prevValue,
                'career': 0
            }
        ))
    }

    function handleOtherPerson (event) {
        const input = event.target.value;
        setOtherPerson(input);
        setValidation(prevValue => (
            {
                ...prevValue,
                'otherPerson': 0
            }
        ))
    }

    function handleDecision (event) {
        const input = event.target.value;
        setDecision(input);
        setValidation(prevValue => (
            {
                ...prevValue,
                'decision': 0
            }
        ))
    }

    function handleTypeOfRelationship (event) {
        const input = event.target.value;
        setTypeOfRelationship(input);
        setValidation(prevValue => (
            {
                ...prevValue,
                'typeOfRelationship': 0
            }
        ))
    }

    function handleAge (event) {
        const input = event.target.value;
        setAge(input);
        setValidation(prevValue => (
            {
                ...prevValue,
                'age': 0
            }
        ))
    }

    function submitForm(event) {

        const input = {
                'user': String,
                'career': String,
                'otherPerson': String,
                'decision': String,
                'typeOfRelationship': String,
                'age': Number
            };

        if(props.type === 'relationshipSet') {
            if(user && otherPerson && age){
                base('relationshipEntries').create([
                {
                    "fields": {
                        "name": user,
                        "otherPerson": otherPerson,
                        "age": age
                    }
                }
                ], function(err, records) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });
    
                input.user = user;
                input.otherPerson = otherPerson;
                input.age = age;
            } else {
                if(user) {
                    setValidation(prevValue => (
                        {
                            ...prevValue,
                            'user': 0
                        }
                    ))
                } else {
                    setValidation(prevValue => (
                        {
                            ...prevValue,
                            'user': 1
                        }
                    ))
                }

                if(otherPerson) {
                    setValidation(prevValue => (
                        {
                            ...prevValue,
                            'otherPerson': 0
                        }
                    ))
                } else {
                    setValidation(prevValue => (
                        {
                            ...prevValue,
                            'otherPerson': 1
                        }
                    ))
                }

                if(age) {
                    setValidation(prevValue => (
                        {
                            ...prevValue,
                            'age': 0
                        }
                    ))
                } else {
                    setValidation(prevValue => (
                        {
                            ...prevValue,
                            'age': 1
                        }
                    ))
                }

                return;
            }
        } else if(props.type === 'relationshipStandard') {
            if(user && typeOfRelationship && age) {
                base('relationshipStandardEntries').create([
                    {
                        "fields": {
                            "name": user,
                            "typeOfRelationship": typeOfRelationship,
                            "age": age
                        }
                    }
                    ], function(err, records) {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });
        
                input.user = user;
                input.typeOfRelationship = typeOfRelationship;
                input.age = age;
            } else {
                if(user) {
                    setValidation(prevValue => (
                        {
                            ...prevValue,
                            'user': 0
                        }
                    ))
                } else {
                    setValidation(prevValue => (
                        {
                            ...prevValue,
                            'user': 1
                        }
                    ))
                }

                if(typeOfRelationship) {
                    setValidation(prevValue => (
                        {
                            ...prevValue,
                            'typeOfRelationship': 0
                        }
                    ))
                } else {
                    setValidation(prevValue => (
                        {
                            ...prevValue,
                            'typeOfRelationship': 1
                        }
                    ))
                }

                if(age) {
                    setValidation(prevValue => (
                        {
                            ...prevValue,
                            'age': 0
                        }
                    ))
                } else {
                    setValidation(prevValue => (
                        {
                            ...prevValue,
                            'age': 1
                        }
                    ))
                }

                return;
            }
        } else if(props.type === 'careerStandard') {
            if(user && career){
                base('careerStandardEntries').create([
                    {
                        "fields": {
                            "name": user,
                            "career": career
                        }
                    }
                    ], function(err, records) {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });
        
                input.user = user;
                input.career = career;
            } else {
                if(user) {
                    setValidation(prevValue => (
                        {
                            ...prevValue,
                            'user': 0
                        }
                    ))
                } else {
                    setValidation(prevValue => (
                        {
                            ...prevValue,
                            'user': 1
                        }
                    ))
                }

                if(career) {
                    setValidation(prevValue => (
                        {
                            ...prevValue,
                            'career': 0
                        }
                    ))
                } else {
                    setValidation(prevValue => (
                        {
                            ...prevValue,
                            'career': 1
                        }
                    ))
                }

                return;
            }
        } else if(props.type === 'decisionStandard') {
            if (user && decision){
                base('decisionStandardEntries').create([
                    {
                        "fields": {
                            "name": user,
                            "decision": decision
                        }
                    }
                    ], function(err, records) {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });
        
                input.user = user;
                input.decision = decision;
            } else {
                if(user) {
                    setValidation(prevValue => (
                        {
                            ...prevValue,
                            'user': 0
                        }
                    ))
                } else {
                    setValidation(prevValue => (
                        {
                            ...prevValue,
                            'user': 1
                        }
                    ))
                }

                if(decision) {
                    setValidation(prevValue => (
                        {
                            ...prevValue,
                            'decision': 0
                        }
                    ))
                } else {
                    setValidation(prevValue => (
                        {
                            ...prevValue,
                            'decision': 1
                        }
                    ))
                }

                return;
            }
        }

        props.onSubmitForm(input);

        setUser('');
        setOtherPerson('');
        setAge();
        setCareer();
        setDecision();
        setTypeOfRelationship();
        setValidation(
            {
                'user': 0,
                'career': 0,
                'otherPerson': 0,
                'decision': 0,
                'typeOfRelationship': 0,
                'age': 0
            }
        )
        event.preventDefault();
    }

    function skipForm() {
        props.onSkipForm();
    }

    return (
        <div className='personalDataForm'>
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
                    {renderTypeOfForm()}
                    <div className='buttonContainer'>
                        <Button size='small' variant='outlined' color='primary' onClick={submitForm}>
                            {props.language === 'english' ? props.content.en_text7 : props.content.ch_text7}
                        </Button>
                    </div>
                </Box>
                <div className='buttonContainer'>
                    <Button size='small' variant='outlined' color='neutral' onClick={skipForm}>
                        {props.language === 'english' ? props.content.en_text8 : props.content.ch_text8}
                    </Button>
                </div>
            </ThemeProvider>
        </div>
    )
}

export default PersonalDataForm;