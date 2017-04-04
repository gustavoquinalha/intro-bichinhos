function checkEl() {
	let fix = 0;
	if(window.outerWidth < 480) {
		fix = 100;
	} else if(window.outerWidth < 1024) {
		fix = 150;
	} else {
		fix = 200;
	}
	let scrollW = window.outerHeight,
		toBottom = scrollW - fix,
		el = document.querySelectorAll('.animate');
	el.forEach(function(e) {
		if(e.getBoundingClientRect().top <= toBottom) {
			e.classList.add('active');
		} else {
			e.classList.remove('active');
		}
	})
};

setTimeout(function() {
	checkEl();
}, 200);


window.addEventListener('scroll', function(){
	checkEl();
});
