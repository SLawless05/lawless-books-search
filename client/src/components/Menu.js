import React from 'react';
import { FaHome } from 'react-icons/fa/';
import { MdStar } from 'react-icons/md/';
import { GoGithub } from 'react-icons/go/';
export const Menu = ({ setVisibility, visibility }) => {

	const color = { color: '#BDBDBD' };

	const showSaved = () => {
		console.log(visibility);
		setVisibility({
			highlight: false,
			booklist: false,
			saved: true

		});

	}

	const showHome = () => {
		setVisibility({
			highlight: false,
			booklist: true,
			saved: false
		});

	}

	return (
		<nav aria-label="App navigation" id="app-nav">
			<span>{visibility.saved ?
				<MdStar style={color} /> :
				<MdStar onClick={() => showSaved()} />}</span>
			<span>{visibility.saved ?
				<FaHome onClick={() => showHome()} /> :
				<FaHome style={color} />}</span>
			<span><a href="https://github.com/SLawless05/lawless-books-search"><GoGithub /></a></span>
		</nav>
	)
}