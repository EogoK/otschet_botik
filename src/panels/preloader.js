import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import '@vkontakte/vkui/dist/vkui.css';

import "./preloader.css";


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const onClickMainPreloaderButton = async function(self){

	var access_token = await bridge.send("VKWebAppGetAuthToken", {"app_id": 8075865, "scope": "friends"});

	if (access_token["access_token"]){
		var id = self.parent_class.state.fetchedUser["id"].toString();
		console.log(id);
		var at = access_token["access_token"].toString();
		console.log(at)
		var date = await bridge.send("VKWebAppCallAPIMethod", {"method": "users.get", "request_id": "56564", "params": {"user_ids": {id}, "v":"5.131", "fields":"bdate", "access_token":{at}}});

		console.log(date);

		self.setState({canvas: (<canvas id="preloader_elem" width={1920} height={300}/>)});
		await sleep(500);


		let hide = document.getElementById("death");
		let main_but = document.getElementById("mpb");
		let loader = document.getElementById('preloader_elem');
		let main = document.getElementById('main_loader');

		hide.style.opacity = "0";
		main_but.style.pointerEvents = "none";

		if(loader.getContext){

			var ctx = loader.getContext("2d");

			function figure(ctx, x, y, d=0){
			   	ctx.save();
			   	ctx.strokeStyle = "white";
			   	ctx.beginPath();
				ctx.moveTo(92-x+d, 71-y);
				ctx.quadraticCurveTo(47-x+d,104-y,78-x+d,133-y);
				ctx.moveTo(92-x+d, 71-y);
				ctx.quadraticCurveTo(71-x+d,105-y,110-x+d,117-y);
				ctx.moveTo(110-x+d, 117-y);
				ctx.quadraticCurveTo(120-x+d,105-y,143-x+d,113-y);
				ctx.moveTo(79-x+d, 95-y);
				ctx.quadraticCurveTo(65-x+d,115-y,78-x+d,133-y);
				ctx.moveTo(79-x+d, 95-y);
				ctx.quadraticCurveTo(70-x+d,123-y,94-x+d,138-y);
				ctx.moveTo(81-x+d, 150-y);
				ctx.quadraticCurveTo(81-x+d,150-y, 94-x+d,138-y);
				ctx.moveTo(81-x+d, 150-y);
				ctx.quadraticCurveTo(96-x+d,153-y,110-x+d,149-y);
				ctx.moveTo(110-x+d, 149-y);
				ctx.quadraticCurveTo(128-x+d,150-y,133-x+d,182-y);
				ctx.moveTo(133-x+d, 182-y);
				ctx.quadraticCurveTo(128-x+d,167-y,124-x+d,163-y);
				ctx.moveTo(124-x+d, 163-y);
				ctx.quadraticCurveTo(114-x+d,162-y,109-x+d,155-y);
				ctx.moveTo(109-x+d, 155-y);
				ctx.quadraticCurveTo(105-x+d,162-y,121-x+d,182-y);
				ctx.moveTo(121-x+d, 182-y);
				ctx.quadraticCurveTo(125-x+d,190-y,122.5-x+d,197-y);
				ctx.moveTo(122.5-x+d, 197-y);
				ctx.quadraticCurveTo(122-x+d,190-y,118-x+d, 200-y);
				ctx.moveTo(122.5-x+d, 197-y);
				ctx.quadraticCurveTo(122-x+d,190-y,118-x+d, 200-y);
				ctx.moveTo(118-x+d, 200-y);
				ctx.quadraticCurveTo(119-x+d,208-y, 143-x+d, 213-y);
				ctx.stroke();
				ctx.restore();

				ctx.beginPath();
				ctx.strokeStyle = "white";
				ctx.translate(284+d+d, 0);
				ctx.scale(-1, 1);
				ctx.moveTo(92-x+d, 71-y);
				ctx.quadraticCurveTo(47-x+d,104-y,78-x+d,133-y);
				ctx.moveTo(92-x+d, 71-y);
				ctx.quadraticCurveTo(71-x+d,105-y,110-x+d,117-y);
				ctx.moveTo(110-x+d, 117-y);
				ctx.quadraticCurveTo(120-x+d,105-y,143-x+d,113-y);
				ctx.moveTo(79-x+d, 95-y);
				ctx.quadraticCurveTo(65-x+d,115-y,78-x+d,133-y);
				ctx.moveTo(79-x+d, 95-y);
				ctx.quadraticCurveTo(70-x+d,123-y,94-x+d,138-y);
				ctx.moveTo(81-x+d, 150-y);
				ctx.quadraticCurveTo(81-x+d,150-y,94-x+d,138-y);
				ctx.moveTo(81-x+d, 150-y);
				ctx.quadraticCurveTo(96-x+d,153-y,110-x+d,149-y);
				ctx.moveTo(110-x+d, 149-y);
				ctx.quadraticCurveTo(128-x+d,150-y,133-x+d,182-y);
				ctx.moveTo(133-x+d, 182-y);
				ctx.quadraticCurveTo(128-x+d,167-y,124-x+d,163-y);
				ctx.moveTo(124-x+d, 163-y);
				ctx.quadraticCurveTo(114-x+d,162-y,109-x+d,155-y);
				ctx.moveTo(109-x+d, 155-y);
				ctx.quadraticCurveTo(105-x+d,162-y,121-x+d,182-y);
				ctx.moveTo(121-x+d, 182-y);
				ctx.quadraticCurveTo(125-x+d,190-y,122.5-x+d,197-y);
				ctx.moveTo(122.5-x+d, 197-y);
				ctx.quadraticCurveTo(122-x+d,190-y,118-x+d, 200-y);
				ctx.moveTo(122.5-x+d, 197-y);
				ctx.quadraticCurveTo(122-x+d,190-y,118-x+d, 200-y);
				ctx.moveTo(118-x+d, 200-y);
				ctx.quadraticCurveTo(119-x+d,208-y, 143-x+d, 213-y);
				ctx.stroke();
			}

			figure(ctx, 0, 0, window.innerWidth/2);
			loader.style.opacity = "0";

			let startAnim = Date.now();
			var x = 0, y= 0;
			var it = 0;

			const figureAnime = function(){
				let start = Date.now();
				let figureAnim = setInterval(()=>{

					loader.style.opacity = "1";
					let passed = Date.now() - start;

					if(passed >= 1000){
						main.style.display = "none";

						self.parent_class.setState({update: 1});
						
						self.setState({canvas: null});


						clearInterval(figureAnim);
					}

					ctx.clearRect(0, 0, 1920, 300);
					figure(ctx, x, 0, window.innerWidth/2);
					x+=Math.pow(it, 2);
					it+=0.2;

				}, 1);
			};
			let Anim = setInterval(()=>{
					let passed = Date.now() - startAnim;
				 	ctx.clearRect(0, 0, 1920, 300);
					figure(ctx, 0, 0, window.innerWidth/2);

					if(passed >= 5000){
						loader.style.opacity = "1";
						figureAnime();
						clearInterval(Anim);
					}

					if(loader.style.opacity == "0.3"){
						loader.style.opacity = "1";
					}
					else{
					loader.style.opacity = "0.3";
					}

				}, 500);
		}
	}
}

class Preloader extends React.Component{
	constructor(props){
		super(props);
		this.state = {canvas:null};

		this.parent_class = props["self"];
	}	
	render(){

		var self = this;

		return (
			<div className="main_preloader" id="main_loader">
			<div className="preloader_pop" id="but">
				<div className="preloader_elem">{this.state.canvas}</div>
			</div>
			<div className="main_preloader_button" id= "mpb">
				<div className="elem" id="death" onClick={()=>onClickMainPreloaderButton(self)}>узнать дату смерти</div>
			</div>
			</div>
			);
	}
}



export default Preloader;
