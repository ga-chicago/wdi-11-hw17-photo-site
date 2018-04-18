$('a').on('click', (e) => {
	if(e.currentTarget.innerText === "Login") {
		if ($('#login').hasClass('invisible')){
			$('#login').toggleClass('invisible');
			$('#register').toggleClass('invisible');
		}
	} else if(e.currentTarget.innerText === "Register") {
		if ($('#register').hasClass('invisible')){
			$('#register').toggleClass('invisible');
			$('#login').toggleClass('invisible');
		}	
	}
})