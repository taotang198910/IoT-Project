var CapstoneRouter = Backbone.Router.extend({
    routes: {
        '/': 'index',
        'data': 'sensorDataPage'
    },
    index: function() {
        // render first view
    },
    sensorDataPage: function() {
        var sensorDataDisplayForm = new SensorDataDisplayForm();
        sensorDataDisplayForm.render();

	},
});