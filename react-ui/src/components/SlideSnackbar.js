// eslint-disable-next-line
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import '../css/SlideSnackbar.css'
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

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

export default function SlideSnackbar(props) {
  const [state, setState] = React.useState({
    open: true,
    Transition: SlideTransition,
  });

//   const handleClick = (Transition) => () => {
//     setState({
//       open: true,
//       Transition,
//     });
//   };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setState({
      ...state,
      open: false,
    });
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        {/* <Button onClick={handleClick(GrowTransition)}>Grow Transition</Button>
        <Button onClick={handleClick(Fade)}>Fade Transition</Button>
        <Button onClick={handleClick(SlideTransition)}>Slide Transition</Button> */}
        <Snackbar
          open={state.open}
          TransitionComponent={state.Transition}
          message={
            props.language === 'english' ?
            'We use cookies to improve your experience.'
            :
            '我們追蹤cookies來提升您的用戶體驗。'
          }
          key={state.Transition.name}
          action={
            <React.Fragment>
              <Button color="primary" size="small" onClick={handleClose}>
                {
                  props.language === 'english' ?
                  'Accept and close'
                  :
                  '了解'
                }
              </Button>
              <IconButton
                aria-label="close"
                color="inherit"
                sx={{ ml: 1 ,p: 0.5 }}
                onClick={handleClose}
              >
                <FontAwesomeIcon icon={faTimes} color='grey' />
              </IconButton>
            </React.Fragment>
          }
        />
      </ThemeProvider>
    </div>
  );
}
