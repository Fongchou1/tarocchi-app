// eslint-disable-next-line
import React, {useState, useEffect} from 'react';
import '../css/Welcome.css'

function Welcome(props) {

    const [start, setStart] = useState(false);

    const startWelcome = () => {
        setTimeout(() => {
            setStart(true);
            props.onChangeStatus();
        }, 8000)
        
    }

    const setStatus = () => {
        props.onChangeStatus();
    }

    useEffect(() => {
        startWelcome();
      }, []);

    return (
        <button className='welcomeButton' onClick={() => setStatus()}>
            <div className='WelcomeHolder'>
                {
                    start === false ? 
                    <div className='Welcome'>
                        <div className='appTitle'>
                            <p>Tarocci App</p>
                        </div>
                        <div className='separator'>
                            <p>|</p>
                        </div>
                        <div className='creator'>
                            <p>Fong Chou</p>
                        </div>
                    </div>
                    :
                    <></>
                }
            </div>
        </button>
    )
}

export default Welcome;