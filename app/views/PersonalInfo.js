var PersonalInfoView = Backbone.View.extend({
	el:"#personal",
	events:{
		'click #modifyPersonalInfo':'modifyPersonalInfo',
		'click #cancelModifyPersonalInfo':'cancelModifyPersonalInfo',
		'click #saveModifyPersonalInfo':'saveModifyPersonalInfo',
	},
	modifyPersonalInfo:function(){
		$('#personalInfo').hide();
		$('#personalInforModify').show();
	},
	cancelModifyPersonalInfo:function(){
		this.render();
	},
	saveModifyPersonalInfo:function(ev){
		var user = getCookie("username");
		var userProfile = new UserProfile();	
		var userProfileDetails = {
			username: user,
			firstname: $('#firstname').val(),
		    lastname: $('#lastname').val(),
		    gender: $("input[type='radio'].gender:checked").val(),
		    age: $('#age').val(),
		};	
		userProfile.save(userProfileDetails,{
			success:function(){				
				var personalInfoView = new PersonalInfoView();
                personalInfoView.render();				
			},
		})		
	},
	
	
	render:function(){
		var template = _.template($('#userCenterPersonalInfo-template').html()); 
		var user = getCookie("username");
		var userProfile = new UserProfile();
		userProfile.fetch({data:$.param({username: user}),
			success: function(userProfile){
				$("#personal").html(template({username:userProfile.attributes[0].username,firstname:userProfile.attributes[0].firstname,
				lastname:userProfile.attributes[0].lastname,gender:userProfile.attributes[0].gender,age:userProfile.attributes[0].age,date:                userProfile.attributes[0].date}));
			},
		});
		var dataOverview = new DataOverview();
		dataOverview.fetch({data:$.param({username: user,sensor:"lightrecord"}),
			success:function(model, response){
				$('#lightOverview').html(response.toString());
				
			},
			error:function(model, response){
				$('#lightOverview').html(response.responseText);
			},
		});
		dataOverview.fetch({data:$.param({username: user,sensor:"soundrecord"}),
			success:function(model, response){
				$('#soundOverview').html(response.toString());
				
			},
			error:function(model, response){
				$('#soundOverview').html(response.responseText);
			},
		});
		dataOverview.fetch({data:$.param({username: user,sensor:"motionrecord"}),
			success:function(model, response){
				$('#motionOverview').html(response.toString());
				
			},
			error:function(model, response){
				$('#motionOverview').html(response.responseText);
			},
		});
		dataOverview.fetch({data:$.param({username: user,sensor:"report"}),
			success:function(model, response){
				$('#reportOverview').html(response.toString());
				
			},
			error:function(model, response){
				$('#reportOverview').html(response.responseText);
			},
		});
		   
		            
        
	},
		
})