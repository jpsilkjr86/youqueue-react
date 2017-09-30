$(document).ready(function(){
	// activates collapsible side nav
	$(".button-collapse").sideNav();
	// ensure side nav always closes when any <li> elements that
	// are children of #slide-out are clicked
	$(document).on('click', '#slide-out > li', function(){
		$(".button-collapse").sideNav('hide');
	});
});