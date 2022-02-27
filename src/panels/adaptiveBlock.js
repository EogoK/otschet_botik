import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, Panel, Root, Snackbar} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import "./adaptiveBlock.css";

let gl_cors = "https://cors.eu.org/";

async function create_history(self){
		var canv;
		var rs = document.getElementsByClassName("block_date");

		for(var i of rs){
			i.classList.remove("block_date_1");
		}

		var s = document.getElementById("block_date 0");
		s.style.backgroundColor = "black";

			var r = await html2canvas(document.getElementById("snap"), {imageTimeout: 10000, height:690}).then(function(canvas){

				var img = new Image();
				img.src = "../photo/down.jpg";
				console.log(img);

				canv = canvas;
				console.log(canv.width);
				var ctx = canv.getContext("2d");

				ctx.drawImage(img, 0, 590, canv.width/2, 100);
			});
		for(var i of rs){
			i.classList.add("block_date_1");
		}

		var s = await bridge.send("VKWebAppCallAPIMethod", {"method": "photos.getMessagesUploadServer", "request_id": "123", "params": {"group_id":207427589, "access_token":"50d527bd5714c1282cf181a7ee78380ce310550b37125c31a2d39b7d5d0f160bdabad73275054d1d7763b", "v":"5.103"}});
		var url = s["response"]["upload_url"];

		var dataURL = canv.toDataURL('image/jpeg', 1.0);
  		console.log(dataURL);

  		canv.toBlob((blob)=>{			

  		console.log(URL.createObjectURL(blob));
  		});
		var res = await bridge.send("VKWebAppShowStoryBox",{ "background_type" : "image",
		        "blob": dataURL.toString()
	});

}

function morphy_data(date, sets){
	var ret;
		if (date > 10 && date < 20){
			ret = sets[2];
		}
		else if(date%10 > 1 && date%10 < 5){
			ret = sets[1];
		}
		else if(date%10 > 4 || date%10 == 0){
			ret = sets[2];
		}else{
			ret = sets[0];
		}
	return ret;
}

class AdaptiveBlock extends React.Component{
	constructor(props){
		super(props);
		this.state = {can: null};
		this.props = props;
		this.BlockToBlock = this.BlockToBlock.bind(this);
		var sets = ["ГОД","ГОДА", "ЛЕТ"];
		var sets_day = ["ДЕНЬ", "ДНЯ", "ДНЕЙ"];
		var sets_hour = ["ЧАС", "ЧАСА", "ЧАСОВ"];
		var sets_min = ["МИНУТА", "МИНУТЫ", "МИНУТ"];

		var years = morphy_data(parseInt(this.props["year"]), sets);
		var days = morphy_data(parseInt(this.props["day"]), sets_day);
		var hours = morphy_data(parseInt(this.props["hour"]), sets_hour);
		var mins = morphy_data(parseInt(this.props["min"]), sets_min);

		this.date = {year:years.toString(), day:days.toString(), hour:hours.toString(), min:mins.toString()};
	}
	componentDidMount(){

	}
	componentWillUnmount(){

	}

	BlockToBlock(){
		var res = [];
		let it = 0;

		for(var elem in this.props){
			var str = "block_date "+it.toString();
			var	temp = (<div id={str.toString()} className="block_date block_date_1" key={it}><div id="date">{this.props[elem]}</div><div id="sub_opt">{this.date[elem]}</div></div>);
			res.push(temp);
			it++;
		}
		return res;
	}
	render(){

		var blocks = this.BlockToBlock();
		var self = this; 

		return(
			<div style={{textAlign: "center"}}>
			<div id="snap" style={{backgroundColor:"black"}}>
			{blocks}
			</div>
			<div className="button_history" id="mpb">
				<div id="lool" onClick={()=>{create_history(self)}}>Выложить в историю</div>
			</div>
			</div>
		);
	}

}

export default AdaptiveBlock;