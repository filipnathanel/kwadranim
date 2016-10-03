/**
 * TODO let's try functional proggraming approach to animation
 * and see whether we have any performace boost
 */

import * as utils from './utils/utils';
import Canvas from './canvas/Canvas';
import shadeColor from './color/shadeColor';

const kwadranim = new WeakMap();

export default class Kwadranim extends Canvas{
	
	constructor(el, options){

		super(el);

		this.setup();
		this.init(options);

	}

	get defaults(){
		return kwadranim.get(this);
	}

	setup(){

		this.animateLoop = this.animateLoop.bind(this);

		kwadranim.set(this, {
			particleSize: 5,
			baseColour: '9940aa'
		});

	}

	init(options){

		this.options = utils.extend( this.defaults, options);

		this.start = null;
		this.duration = 10000;
		this.imgData = this.context.createImageData(this.canvas.width, this.canvas.height);
		// this.imgData = this.context.createImageData(this.canvas.width, this.canvas.height);

		this.rowsCount = this.canvas.height / this.options.particleSize;
		this.columnsCount = this.canvas.width / this.options.particleSize;

		this.cellsPerRow = this.canvas.width * 4;
	}

	run(){
		window.requestAnimationFrame( this.animateLoop );
	}

	animateLoop(timestamp){

		if (!this.start) this.start = timestamp;
		let progress = ((timestamp - this.start) / this.duration);

		this.drawImageData();
		// console.log('animatin\' ' + progress)
		if ( progress <= 1 ){
			window.requestAnimationFrame(this.animateLoop);
		}

	}

	drawImageData(){

		let pxInParticle = Math.pow(this.options.particleSize, 2);
		

		// loop through each row, where row is the height of particleSize
		for( let row = 0; row < this.rowsCount; row++){
			// console.log('row: ' + row);
			// for each column in the row
			for( let col = 0 ; col < this.columnsCount; col++){
				// here is where the single cell starts
				// let's pick a color for current cell
				// let color = this.hexToRgb(this.genRandGradient( this.options.baseColour ));
				
				//// quick
				// let color = {
				// 	r:220 * Math.random(),
				// 	g:10,
				// 	b:200
				// };
				// 
				//slow
				let color = this.hexToRgb(this.genRandGradient( this.options.baseColour ));
				// 

				// for each cell we need to set  
				// console.log('col: ' + col);
				// then lets loop through each of the micro rows (currently 20 times)
				for( let microRow = 0; microRow < this.options.particleSize; microRow++){

					let startIndex = (microRow * this.cellsPerRow) + ( col * this.options.particleSize*4 ) + (row * this.cellsPerRow * this.options.particleSize);
					// console.log('microRow: ' + microRow );

					// this one goes 20 times
					for( let px = 0; px < this.options.particleSize; px++){
						// console.log(px)
						let currentPxIndex = startIndex + px * 4;
						// console.log(currentPxIndex);
						this.imgData.data[currentPxIndex ] = color[0] 
						this.imgData.data[currentPxIndex + 1 ] = color[1]
						this.imgData.data[currentPxIndex + 2 ] = color[2]
						this.imgData.data[currentPxIndex + 3 ] = 255;

					}

				}
			
			}

		}

		this.context.putImageData(this.imgData,0,0);

	}

	drawCanvasMethod(){

		let particlesPerLine = this.canvas.width / this.options.particleSize;
    
	    for (let h = 0; h < this.canvas.height; h+= this.options.particleSize){
	    
	      for(let i = 0; i < particlesPerLine;i++){
	        let startPoint = i * this.particleSize;

	       	this.context.fillStyle = this.genRandGradient(this.optionsbaseColour);
	        this.context.fillRect(startPoint, h, this.particleSize, this.particleSize);
	      }
	    
	    }
	}

	// Need to make it a separate module
	genRandGradient(num) {
	    let randomNum = Math.ceil(Math.random() * 80);
	    let gradient = shadeColor(num, randomNum);
	    return gradient;
	}
	
	// Need to make it a separate module
	hexToRgb(hex) {
		hex = '0x'  +hex;
	    var r = hex >> 16;
	    var g = hex >> 8 & 0xFF;
	    var b = hex & 0xFF;
	    return [r,g,b];
	}

}