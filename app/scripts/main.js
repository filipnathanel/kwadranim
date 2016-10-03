import Kwadranim from './Kwadranim.js'
import testPerformance from './utils/testPerformance';

document.addEventListener('DOMContentLoaded', ()=>{

	var kw = new Kwadranim('#kwadranim');
	// var kw2 = new Kwadranim('#kwadranim');
	// 
	
	console.log(kw);

	// kw.run();
	testPerformance('generate 5x5 particles with Image Data', function(){
		kw.drawImageData();
	}, {maxCycles:400}).then(function(){
		// kw.run();
	});
	// 
	
	// kw.
	
	// testPerformance('generate 2x2 particles with Image Data', function(){
	// 	kw.drawImageData();
	// },{})
	// .then( () => {

	// 	setTimeout( () => {
	// 		testPerformance('generate 2x2 particles with Canvas Methods', function(){
	// 			kw.drawCanvasMethod();
	// 		},{});
	// 	}, 2000);
		
	// } );
		
		// drawCanvasMethod
	// testPerformance( ()=>{

	// 	return new Promise((resolve,reject) =>{ 

	// 		var kwImageData1 = new Kwadranim('#kwadranim');

	// 	});

	// // } );
	// .then()



});
