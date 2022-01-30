// eslint-disable-next-line
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import '../css/TarocciCardCover.css'

function TarocciCardCover(props) {
    // const classes = useStyles();

	function handleSelect(event) {
		props.onHandleSelect(props.index);
		event.preventDefault();
	}

	return (
		<div className='TarocciCardCover root'>
			<Card className='cardCover'>
				<CardActionArea>
					<CardMedia className='media' image={props.cardImage} onClick={handleSelect}/>
					{/* <CardMedia className={classes.media} image={props.cardImage} /> */}
				</CardActionArea>
			</Card>
		</div>
	)
}

export default TarocciCardCover;