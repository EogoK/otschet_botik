import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, Panel, Root, Snackbar} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import "./adaptiveBlock.css";


class AdaptiveBlock extends React.Component{
	constructor(props){
		super(props);
		this.state = {};
		this.props = props;
		this.BlockToBlock = this.BlockToBlock.bind(this);

		this.date = {year:"ГОД", day:"ДЕНЬ", hour:"ЧАС", min:"МИН", sec:"СЕК"};
	}
	componentDidMount(){

	}
	componentWillUnmount(){

	}

	BlockToBlock(){
		var res = [];

		for(var elem in this.props){
			var temp = (<div id="block_date" key={this.props[elem]}><div id="date">{this.props[elem]}</div><div id="sub_opt">{this.date[elem]}</div></div>);
			res.push(temp);
		}

		return res;
	}
	render(){

		var blocks = this.BlockToBlock();

		return(
			<div style={{textAlign: "center"}}>
			{blocks}
			</div>
		);
	}

}

export default AdaptiveBlock;