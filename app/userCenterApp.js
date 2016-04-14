window.onload = function(){
	var user = getCookie("username");
	if (user != "") 
	{
		$("#displayUsername").html(user);
		var personalInfoView = new PersonalInfoView();
        personalInfoView.render();
	} 
	else 
	{
		alert("Please login first!");
		window.location.replace("index.html");
		
	}

}
function logOut(){
		document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
		window.location.replace("index.html");
}