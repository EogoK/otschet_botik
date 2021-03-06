import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, Panel, Root, Snackbar} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Preloader from "./panels/preloader.js";
import AdaptiveBlock from "./panels/adaptiveBlock.js";

import "./css/App.css";

class App extends React.Component {
	componentDidMount(){
		
		var self = this;

		bridge.subscribe(({ detail: { type, data }}) => {
				if (type === 'VKWebAppUpdateConfig') {
					const schemeAttribute = document.createAttribute('scheme');
					schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
					document.body.attributes.setNamedItem(schemeAttribute);
				}
			});
			async function fetchData(self) {
				const user = await bridge.send('VKWebAppGetUserInfo');
				self.setState({fetchedUser: user});
			}
			fetchData(self);
	}

	constructor(props){
		super(props);

		this.state = {fetchedUser : null, element_main:null, activeView: "preloader", snackbar: null, update: false, date: null};
		this.snackbarFunc = this.snackbarFunc.bind(this);


	}

	snackbarFunc(message){
		if(this.state.snackbar) return;

		this.setState({snackbar:(
			<Snackbar onClose={()=> this.setState({snackbar: null})}>
				{message}
			</Snackbar>)
		});
	}




	render(){

	var self = this;
	return (
		<AdaptivityProvider>
			<AppRoot>
					{
						!self.state.update &&
						<Preloader self={self}/>
					}
					{
						self.state.update &&
						<AdaptiveBlock year={this.state.date["year"]} day={this.state.date["day"]} hour={this.state.date["hour"]} min={this.state.date["min"]}/>
					}
				{this.state.snackbar}
			</AppRoot>
		</AdaptivityProvider>
	);
}
}
export default App;
