var SensorDataDisplayForm = Backbone.View.extend({
	el:"#display-data",
	events:{
		'click #submitForLightData':'displayLightData',
		'click #submitForSoundData':'displaySoundData',
		'click #submitForMotionData':'displayMotionData',
	},	
	displayLightData:function(ev){
		var lightChartData = "";	
		var selectDate = new Date($('#datepicker').val());
		var username = getCookie("username");	
		var time = new Array();;
		var light = new Array();
		var sensor = $(ev.target).data('sensor');	
		var userData = new UserData();
         userData.fetch({
			data: $.param({username:username,sensor:sensor}),
          	success: function (userData) {	
				$("#lightChart").empty();			
				for (i = 0; i<userData.models.length; i++)
				{
					
					var dataDate = new Date(userData.models[i].attributes.date);
					console.log(dataDate);
					console.log(selectDate);
					console.log(selectDate == dataDate);
					if(selectDate.getTime() == dataDate.getTime())
					{
						time.push(userData.models[i].attributes.time);
				    	light.push(userData.models[i].attributes.lightrecord);
					}					
				}
				if(time.length == 0)
				{
					$( "#errDateDialog" ).dialog();						
					return;
				}
				if(time.length>10)
				{
					var j = 0;
					for(i=0;i<=time.length;i++)
					{
						if(i!=Math.floor(time.length*(j/8)))
						{
							time[i] = "";
						}
						else
						{
							j++;
						}
					}
				}
				
				lightChartData = {
					labels : time,
					datasets : [						
						{
							label: "light Data",
							fillColor : "rgba(151,187,205,0.2)",
							strokeColor : "rgba(151,187,205,1)",
							pointColor : "rgba(151,187,205,1)",
							pointStrokeColor : "#fff",
							pointHighlightFill : "#fff",
							pointHighlightStroke : "rgba(151,187,205,1)",
							data : light
						}
					]		
				}
				
				$('#lightChartDiv').show();			
				window.myLine = new Chart(ctx1).Line(lightChartData, {
					responsive: true
				});                				
           }
        });						
	},
	displaySoundData:function(ev){	
		var selectDate = new Date($('#datepicker').val());
		var username = getCookie("username");
		var time = new Array();;
		var sound = new Array();
		var sensor = $(ev.target).data('sensor');
		var userData = new UserData();
         userData.fetch({
			data: $.param({username:username,sensor:sensor}),
          	success: function (userData) {
				$("#soundChart").empty();				
				for (i = 0; i<userData.models.length; i++)
				{
					var dataDate = new Date(userData.models[i].attributes.date);
					if(selectDate.getTime() == dataDate.getTime())
					{
						time.push(userData.models[i].attributes.time);
					    sound.push(userData.models[i].attributes.soundrecord);
					}	
				}
				if(time.length==0)
				{
					$( "#errDateDialog" ).dialog();						
					return;
				}
				
				if(time.length>10)
				{
					var j = 0;
					for(i=0;i<=time.length;i++)
					{
						if(i!=Math.floor(time.length*(j/10)))
						{
							time[i] = "";
						}
						else
						{
							j++;
						}
					}			
				}	
				var soundChartData = {
					labels : time,
					datasets : [						
						{
							label: "light Data",
							fillColor : "rgba(151,187,205,0.2)",
							strokeColor : "rgba(151,187,205,1)",
							pointColor : "rgba(151,187,205,1)",
							pointStrokeColor : "#fff",
							pointHighlightFill : "#fff",
							pointHighlightStroke : "rgba(151,187,205,1)",
							data : sound
						}
					]		
				}			
				$('#soundChartDiv').show();				
				var ctx = document.getElementById("soundChart").getContext("2d");
				window.myLine = new Chart(ctx).Line(soundChartData, {
					responsive: true
				});                				
           }
        });						
	},
	displayMotionData:function(ev){
		var selectDate = new Date($('#datepicker').val());
		var nextDate = new Date(selectDate -1 + 1 + 86400000);
		console.log(selectDate);
		console.log(nextDate);
		var username = getCookie("username");
		var time = new Array();;
		var motion = new Array();
		var sensor = $(ev.target).data('sensor');
		var userData = new UserData();
         userData.fetch({
			
			data: $.param({username:username,sensor:sensor}),
          	success: function (userData) {	
				$("#motionChart").empty();
				console.log(userData);			
				for (i = 0; i<userData.models.length; i++)
				{
					var dataDate = new Date(userData.models[i].attributes.date);
					if(selectDate.getTime() == dataDate.getTime())
					{
						if(userData.models[i].attributes.time.substring(16,18)>19){
							time.push(userData.models[i].attributes.time.substring(16,24));
					 		motion.push(userData.models[i].attributes.motionrecord);
						}
						
					}
					if(nextDate.getTime() == dataDate.getTime()){
						if(userData.models[i].attributes.time.substring(16,18)<11){
							time.push(userData.models[i].attributes.time.substring(16,24));
					    	motion.push(userData.models[i].attributes.motionrecord);
						}
						
					}
				}
				if(time.length==0)
				{
					$( "#errDateDialog" ).dialog();						
					return;
				}
				/*
				if(time.length>10)
				{
					var j = 0;
					for(i=0;i<=time.length;i++)
					{
						if(i!=Math.floor(time.length*(j/10)))
						{
							time[i] = "";
						}
						else
						{
							j++;
						}
					}	
				}
				*/
				var motionChartData = {
					labels : time,
					datasets : [						
						{
							label: "light Data",
							fillColor : "rgba(151,187,205,0.2)",
							strokeColor : "rgba(151,187,205,1)",
							pointColor : "rgba(151,187,205,1)",
							pointStrokeColor : "#fff",
							pointHighlightFill : "#fff",
							pointHighlightStroke : "rgba(151,187,205,1)",
							data : motion
						}
					]		
				}
				$('#motionChartDiv').show();				
				var ctx = document.getElementById("motionChart").getContext("2d");
				window.myLine = new Chart(ctx).Line(motionChartData, {
					responsive: true
				});                				
           }
        });						
	},
	render:function(){
		var template = _.template($('#searchForm-template').html());              
        $("#display-data").html(template());
		ctx1 = document.getElementById("lightChart").getContext("2d");
	
		 $(function() {
			$( "#datepicker" ).datepicker();
		  });
	  },
});
