// eslint-disable-next-line
import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import '../css/TarocciCardFront.css'

const useStyles = makeStyles(theme => ({
	root: {
		// display: 'flex',
		display: 'flex',
		justifyContent: 'center'
		// flexGrow: 1,
	},
	card: {
		// marginTop: 20,
		maxWidth: 440,
		alighItems: 'center'
	},
	media: {
		margin: 'auto',
		marginTop: 20,
		width: 220,
		height: 357
	}
}))

function TarocciCardFront({ title, description, cardImage, reverse, input, type, game, language }) {

	const classes = useStyles();

	function renderDescription() {
		

		const otherPersonCH = '{對方}';
		const otherPersonEN = '{the person}';
		const careerCH = '{事業}';
		const careerEN = '{career}'
		const decisionCH = '{選擇}';
		const decisionEN = '{the decision}'
		const leftClosureSign = '{';
		const rightClosureSign = '}';
		let leftClosureIndex = description.indexOf(leftClosureSign);
		let rightClosureIndex = description.indexOf(rightClosureSign);
		let descriptionSplited = [];
	
		
		if(input) {
			while(leftClosureIndex !== -1 && language === 'english') {
				if ( game === 'set' && type === 'relationship' ) {
					descriptionSplited = description.split(otherPersonEN);
					description = descriptionSplited.join(input.otherPerson);
				}
				else if ( game === 'standard' && type === 'career' ) {
					descriptionSplited = description.split(careerEN);
					description = descriptionSplited.join(input.career);
				}
				else if ( game === 'standard' && type === 'decision' ) {
					descriptionSplited = description.split(decisionEN);
					description = descriptionSplited.join(input.decision);
				} else {
					break;
				}
				leftClosureIndex = description.indexOf(leftClosureSign);
				rightClosureIndex = description.indexOf(rightClosureSign);
			}

			while(leftClosureIndex !== -1 && language === 'chinese') {
				if ( game === 'set' && type === 'relationship' ) {
					descriptionSplited = description.split(otherPersonCH);
					description = descriptionSplited.join(input.otherPerson);
				}
				else if ( game === 'standard' && type === 'career' ) {
					descriptionSplited = description.split(careerCH);
					description = descriptionSplited.join(input.career);
				}
				else if ( game === 'standard' && type === 'decision' ) {
					descriptionSplited = description.split(decisionCH);
					description = descriptionSplited.join(input.decision);
				} else {
					break;
				}
				leftClosureIndex = description.indexOf(leftClosureSign);
				rightClosureIndex = description.indexOf(rightClosureSign);
			}
			descriptionSplited = description.split('{');
			description = descriptionSplited.join('');
			descriptionSplited = description.split('}');
			description = descriptionSplited.join('');
		} else {
			// no input
			while(leftClosureIndex !== -1 && language === 'english') {
				if( type === 'relationship' || type === 'decision' ) {
					descriptionSplited = description.split('{');
					description = descriptionSplited.join('');
					descriptionSplited = description.split('}');
					description = descriptionSplited.join('');
				} else {
					descriptionSplited = description.split(careerEN);
					description = descriptionSplited.join('');
				}
				leftClosureIndex = description.indexOf(leftClosureSign);
				rightClosureIndex = description.indexOf(rightClosureSign);
			}
			while(leftClosureIndex !== -1 && language === 'chinese') {
				if( type === 'relationship' ) {
					descriptionSplited = description.split('{');
					description = descriptionSplited.join('');
					descriptionSplited = description.split('}');
					description = descriptionSplited.join('');
				} else if ( type === 'decision' ){
					descriptionSplited = description.split(decisionCH);
					description = descriptionSplited.join('');
				} else {
					descriptionSplited = description.split(careerCH);
					description = descriptionSplited.join('');
				}
				leftClosureIndex = description.indexOf(leftClosureSign);
				rightClosureIndex = description.indexOf(rightClosureSign);
			}
		}
		
		return (
			<Typography paragraph variant='body2'>
				{description}
			</Typography>
		);
	};

	return (
		<div className={classes.root}>
			<Grid>
				<Card className={classes.card}>
					<CardActionArea>
						<CardMedia className={reverse ? 'mediaR' : classes.media} image={cardImage} />
						<CardContent>
							<Typography gutterBottom variant='h5' component='h2'>
								{title}
							</Typography>
						</CardContent>
					</CardActionArea>
					<CardContent>
						{renderDescription()}
					</CardContent>
				</Card>
			</Grid>
		</div>
	)
}

export default TarocciCardFront;