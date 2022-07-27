function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

function popStyle(){

	var link = document.createElement('link');
	link.setAttribute('rel', 'stylesheet');
	link.setAttribute('type', 'text/css');
	link.setAttribute('href', 'https://bruneza.github.io/Bru-Preset-Components/JS/PopUp/style.css');
	document.getElementsByTagName('head')[0].appendChild(link);

}
function bruPop (targetIdentifier, action){

	popStyle(); //Load style file

	//declare necessary variables
	let targetElement = document.querySelector(targetIdentifier);
	targetElement.preventDefault;

	let target = targetElement.href;
	let targetContent;
	let targettype;

	//create POP containers
	let popContainer = document.createElement('div');
	popContainer.classList.add("popup-container");

	let popBox = document.createElement('div');
	popBox.classList.add("popup-box");

	let popFrame= document.createElement('iframe');
	popFrame.style.cssText = 'width: 100%; height: 100%; border:0;';
	popFrame.innerHTML = 'allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"';

	//array for types of content that can be popped
	let types = ['id:','class:',,'map-location:','link:'];

	//verify if target is among the types
	types.forEach( function(t) {
		if(target.includes(t)){
			targettype = t;
			targetContent = target.replace(t,'');
			if(t == "id:")
				targetContent = target.replace(t,'#');
			if(t == "class:")
				targetContent = target.replace(t,'.');
		}
	});
	if(!targettype){
		window.console.log('Invalid Option ');
		return false;
	}

	// window.console.log("Content: "+ targetContent + " Type: " + targettype + window.location.pathname);


	// Handle each type
	switch (targettype) {
		//PopUp for ID
		case "id:":
		case "class:":

		popContent =document.querySelector(targetContent);
		popBox.appendChild(popContent);
		break;
		
		//PopUp for MAPS
		case "map-location:":

		popFrame.setAttribute('src', `https://maps.google.com/maps?q=${encodeURI(targetContent)}&t=m&z=15&output=embed&iwloc=near`);
		popBox.appendChild(popFrame);
		break;

		//PopUp for Links
		case "link:":
		if(!validURL(targetContent)){
			window.console.log('Invalid Link.');
			return false;
		}

		popFrame.setAttribute('src', `${targetContent}`);
		popBox.appendChild(popFrame);

		break;

		default:
		window.console.log('type of content not found.');
		break;
	}

	popContainer.appendChild(popBox);

	targetElement.parentNode.appendChild(popContainer);
	window.console.log(popContainer);


	popContainer.addEventListener("click", function() {
		targetElement.parentNode.removeChild(popContainer);
	}
	);


}