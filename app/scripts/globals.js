import Browser from './utils/Browser';

let Globals = {
	get viewport () { return utils.updateViewportDimensions() },
	browser: new Browser()
};

window.globals = Globals;

export { Globals as default};