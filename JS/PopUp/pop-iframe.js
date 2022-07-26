
let clickedlink = document.querySelector(".bru-poplink");

window.console.log(clickedlink);

clickedlink.addEventListener("click", bruPop);

function bruPop (event){

		event.preventDefault();
		let targetLink = event.target.href;
    let pframe= document.createElement('iframe');

    pframe.style.cssText = 'width: 70%;	height: 70%; border:0;';
	pframe.setAttribute('src', `${targetLink}`)
	pframe.innerHTML = 'allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"';

	let popBox = document.createElement('div');
	popBox.classList.add("pop-link-box");
	popBox.appendChild(pframe);


	event.target.parentNode.appendChild(popBox);

	popBox.addEventListener("click", function() {
			event.parentNode.removeChild(popBox);
	}
	);
	}