var loginAndRegister = new LoginAndRegister();
loginAndRegister.render();


var cname,cpwd1,cpwd2,cemail; 
//define 5 variables to check all the registration contraints, when all five variables become ture, the register button becomes true. 
function chkreg(){
	 if((cname == 'yes') && (cpwd1 == 'yes') && (cpwd2 == 'yes')&&(cemail == 'yes')){
	  $('#submitForRegister').removeAttr("disabled");
	 }else{
	  $('#submitForRegister').attr("disabled", "disabled");
	 }
}
