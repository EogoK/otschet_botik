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

		this.state = {fetchedUser : null, element_main:null, activeView: "preloader", snackbar: null, update: null};
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
			    <Root activeView={this.state.activeView}>
					<View id="preloader">

					{
						!self.state.update &&
						<Preloader self={self}/>
					}
					{
						self.state.update &&
						<AdaptiveBlock year={"50"} day={"00"} hour={"10"} min={"25"} sec={"19"}/>
					}
					</View>
				</Root>
				{this.state.snackbar}
			</AppRoot>
		</AdaptivityProvider>
	);
}
}
export default App;
