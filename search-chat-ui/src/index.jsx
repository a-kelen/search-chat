import { render, Fragment } from 'preact';
import { Chip, Divider, Grid, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import { history, addToHistoryPersonalMessage, query, setQuery, isConnected, persistantId, setHistory, sendMessage } from './store';
import { useEffect, useRef } from 'preact/hooks';
import FadeInAnimation from './components/FadeInAnimation/FadeInAnimation';
import { LoadingButton } from '@mui/lab';
import { useSocket } from './socketHook';
import { getHistoryBySessionId } from './requests';

import './style.css';

export function App() {
	useSocket();

	const historyRef = useRef(null);

	useEffect(() => {
		scrollToBottom();
		if (persistantId.value) {
			getHistoryBySessionId(persistantId.value).then((res) => {
				setHistory(res);
			});
		}
	}, []);

	useEffect(() => {
		scrollToBottom();
	}, [history.value]);	

	const scrollToBottom = () => {
		if (historyRef.current) {
		  historyRef.current.scrollTop = historyRef.current.scrollHeight;
		}
	};


	const handleQueryChange = (e) => {
		setQuery(e.target.value);
	}

	const buttonIsDisabled = !query.value && isConnected.value;

	const handleClick = () => {
		sendMessage();
	};

	const connectionNode = (
		<Chip 
			label={isConnected.value ? "Connected" : "Disconnected" } 
			color={isConnected.value ? "success" : "error" }  />
		);

	const mapListItem = (item) => (
		<ListItem style={{ textAlign: item.is_from_client ? 'right' : 'left' }}>
			{ item.is_from_client ?
				(<ListItemText
					primary={<Typography fontWeight="bold" color="gray" variant="subtitle1">{item.message}</Typography>}
				/>) :
				(<ListItemText
					primary={item.title}
					secondary={item.message}
				/>)
			}
		</ListItem>
	)

	return (
		<Grid container direction="column" className="container" px={20} spacing={2} justifyContent="flex-end">
			<Grid item>
				<List ref={historyRef} className="history" dense>
					{history.value.map(item => (
							<Fragment key={item.id}>
								<FadeInAnimation>
									{mapListItem(item)}
								</FadeInAnimation>
								<Divider />
							</Fragment>
						)
					)}
				</List>
			</Grid>
			<Grid container item alignItems="center" spacing={2}>
				<Grid item xs={10}>
					<TextField value={query} fullWidth size="small" label="Query" variant="outlined" onChange={handleQueryChange} />
				</Grid>
				<Grid container item xs={2} alignSelf="right">
					<LoadingButton
						fullWidth
						disabled={buttonIsDisabled}
						onClick={handleClick}
						loading={false}
						loadingIndicator="Loading…"
						variant="outlined"
					>
						Send
					</LoadingButton>
				</Grid>
				<Grid container item xs={12} spacing={2} justifyContent="flex-end">
					<Grid item>
						{!!persistantId.value && <Chip label={persistantId.value} color="primary" />}
					</Grid>
					<Grid item>
						{connectionNode}
					</Grid>
				</Grid>
			</Grid>
			
		</Grid>
	);
}

render(<App />, document.getElementById('app'));
