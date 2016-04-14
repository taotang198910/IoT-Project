var LoginAndRegister = Backbone.View.extend({
	el:"#loginAndRegisterForm",
	events:{
		'click #signUp':'showSignUpForm',
		'click #login':'showLogin',
		'click #submitForLogin':'submitForLogin',
		'click #logOutBtn':'logOut',
		'click #submitForRegister':'submitForRegister',
		'focusout #registerForm #usrname':'validateUsername',
		'focusout #registerForm #psw':'validatePsw',
		'focusout #registerForm #rePsw':'validateRePsw',
		'focusout #registerForm #email':'validateEmail',
		'keypress #registerForm #usrname':'validateUsername',
		'keypress #registerForm #psw':'validatePsw',
		'keypress #registerForm #rePsw':'validateRePsw',
		'keypress #registerForm #email':'validateEmail'
	},
	showSignUpForm:function(ev){
		$('#loginForm').hide();
		$('#registerForm').show();

	},
	showLogin:function(ev){
		$('#loginForm').show();
		$('#registerForm').hide();
	},
	submitForLogin:function(ev){

		var userLogin = new UserLogin();

		var userDetails = {
			username: $('#usrname').val(),
			password: $('#psw').val(),
		};

		userLogin.save(userDetails,{
			success:function(model,response){
				setCookie("username", response.username, 0.05);
				window.location.replace("main.html");
			},
			error:function(model,response){
				alert(response.responseJSON.Message);
			}
		});

	},
	logOut:function(){
		document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
		this.render();
	},

	validateUsername:function(){
		var username = $('#registerForm #usrname').val();

		if(username.length<=5){
			$('#usernameError').html("Username length should not be less than 5 !");
			$('#usernameError').css("color","red");
			cname = '';
		}
		else if(!username.match("^[a-zA-Z0-9_.-]*$")){
			$('#usernameError').html("Username format is not correct!");
			$('#usernameError').css("color","red");
			cname = '';
		}
		else{
			var checkUsername = new CheckUsername();
			checkUsername.save({username:username},{
				success:function(){
					cname = 'yes';
					$('#usernameError').html("Your username is ready for register!");
					$('#usernameError').css("color","green");
					chkreg();
				},
				error:function(model,response){
					cname = '';
					$('#usernameError').html(response.responseJSON.Message);
					$('#usernameError').css("color","red");
				}
			});
		}
		chkreg();
	},

	validatePsw:function(){
		var psw = $("#registerForm #psw").val();
		if(psw.length<= 5){
			$('#pswError').html("Password length should not be less than 6 !");
			$('#pswError').css("color","red");
			cpwd1 = '';
		}
		else{
			$('#pswError').html("Good!");
			$('#pswError').css("color","green");
			cpwd1 = 'yes';
			chkreg();
		}
		chkreg();

	},
	validateRePsw:function(){
		var rePsw = $('#registerForm #rePsw').val();
		var psw = $("#registerForm #psw").val();
		if(psw == rePsw){
			$('#rePswError').html("Good!");
			$('#rePswError').css("color","green");
			cpwd2 = 'yes';
			chkreg();
		}
		else{
			$('#rePswError').html("Password is not same!");
			$('#rePswError').css("color","red");
			cpwd2 = '';
		}
		chkreg();

	},
	validateEmail:function(){
		var email = $("#registerForm #email").val();
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(!re.test(email))
		{
			$('#emailError').html("Please input a correct format E-mail !");
			$('#emailError').css("color","red");
			cemail = '';
			
		}
		else {
			var checkEmail = new CheckEmail();
			checkEmail.save({email:email},{
				success:function(){
					cemail = 'yes';
					$('#emailError').html("Your E-mail is ready for register!");
					$('#emailError').css("color","green");
					chkreg();
				},
				error:function(model,response){
					cemail = '';
					$('#emailError').html(response.responseJSON.Message);
					$('#emailError').css("color","red");
				}
			});
		}
		chkreg();
	},
	submitForRegister:function(){
		
		var userRegister = new UserRegister();		
		var userDetails = {
			username: $('#registerForm #usrname').val(),
			password: $('#registerForm #psw').val(),
			email: $('#registerForm #email').val()		
		}
		userRegister.save(userDetails,{
			success:function(model,response){
				setCookie("username", response.username, 0.05);
				location.reload();
			},
			error:function(model,response){
				alert(response.responseJSON.Message);
			}
		});		
   },
	render:function(){
		var template = _.template($('#login-register-template').html());
		$("#loginAndRegisterForm").html(template());
		$('#loginForm').show();
		$('#registerForm').hide();
		$(document).ready(function(){
		    $("#loginBtn").click(function(){
		        $("#myModal").modal();
		    });
		});
		$(function() {
		    var tooltips = $( "[title]" ).tooltip({
		      position: {
		        my: "left top",
		        at: "right+5 top-5"
		      }
		    });
		    $( "<button>" )
		      .text( "Show help" )
		      .button()
		      .click(function() {
		        tooltips.tooltip( "open" );
		      })
		      .insertAfter( "form" );
		 });
				 
	    $('#submitForRegister').attr("disabled", "disabled");
		var user = getCookie("username");
		if (user != "") 
		{
			$("#loginBtn").hide();
			$("#loginDiv").show();
			$("#displayUsername").html(user);
		} 
		else 
		{
			$("#loginBtn").show();
			$("#loginDiv").hide();
			$("#logOutBtn").hide();
		}
	}
});
