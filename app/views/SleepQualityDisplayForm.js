var SleepQualityDisplayForm = Backbone.View.extend({
	el:"#display-sleep-quality",
	events:{
		'click #submitForSleepQuality':'displaySleepQuality',
	},
	displaySleepQuality: function(){
		var selectDate = new Date($('#datepicker').val());
		var username = getCookie("username");
		var sleepQuality = new SleepQuality();
		sleepQuality.fetch({
			data: $.param({username:username}),
			success:function(userData){
				for (i = 0; i<userData.models.length; i++)
				{
					
					var dataDate = new Date(userData.models[i].attributes.date);
					if(selectDate.getTime() == dataDate.getTime())
					{
						var quality = userData.models[i].attributes.quality;
						$("#showQuality").show();
						$("#quality").text(quality);
					}
					else
					{
						$( "#errDateDialog" ).dialog();	
						$("#showQuality").hide();					
						return;
					}
				}
			},
			error:function(){
				$( "#errDateDialog" ).dialog();
				$("#showQuality").hide();						
				return;
			}
								
		});
	},
	render:function(){
		var template = _.template($('#searchSleepQuality-template').html());              
        $("#display-sleep-quality").html(template());
		$("#showQuality").hide();
		$(function() {
			$( "#datepicker" ).datepicker();
		});
	},	
});