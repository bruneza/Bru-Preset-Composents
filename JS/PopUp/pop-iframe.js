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
	var head = document.getElementsByTagName('HEAD')[0];
        // Create new link Element
        var link = document.createElement('link');
        // set the attributes for link element
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'style.css';
        head.appendChild(link);
}
function bruPop (targetIdentifier, action){
	// targetElement.preventDefault();

	let targetElement = document.querySelector(targetIdentifier);
	let target = targetElement.href;
	let targetContent;
	let targettype;

	let popContainer = document.createElement('div');
	popContainer.classList.add("popup-container");

	let popBox = document.createElement('div');
	popBox.classList.add("popup-box");

	let popFrame= document.createElement('iframe');
	popFrame.style.cssText = 'width: 100%; height: 100%; border:0;';
	popFrame.innerHTML = 'allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"';


	let types = ['id:','class:',,'map-location:','link:'];

	types.forEach( function(t) {
		if(target.includes(t)){
			targettype = t;
			targetContent = target.replace(t,'');
		}
	});

	window.console.log("Content: "+ targetContent + " Type: " + targettype);

	if(!targettype){
		window.console.log('Invalid Option ');
		return false;
	}

	switch (targettype) {
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

	/*
	popBox.addEventListener("click", function() {
		event.parentNode.removeChild(popBox);
	}
	);
	*/

}