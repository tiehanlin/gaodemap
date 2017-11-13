(function() {
	'use strict';

	angular
		.module('myapp.location')
		.config(configure);

	/* @ngInject */
	function configure(c8yViewsProvider, c8yComponentsProvider) {
		function addActions(rou,loc,dev, act) {
			var i = rou.deviceId,
				s = "/device/" + i + "/location2",
				c = dev.detailCached(i).then(function(n) {
					var e = n.data,
						a = "c8y_Position",
						t = "com_nsn_startups_vendme_fragments_GPSCoordinates",
						l = e[a] || e[t];

					return l
				})
			return c.then(function(n) {
				if(n == undefined) {
					act.addAction({
						priority: 1,
						text: 'Add Location222',
						showIfPermissions: {
							adminMOs: [i]
						},
						action: function() {
							dev.save({
								id: i,
								c8y_Position: _.cloneDeep(l)
							}).then(function() {
								loc.path(s)
							})
						}
					})
				} else {
					n
				}
			}),c
		}
		var l = {
			lat: 41.030122,
			lng: 117.300211
		};
		c8yViewsProvider.when('/device/:deviceId', {
			name: 'location2',
			icon: 'envelope-o',
			priority: 1,
			templateUrl: ':::PLUGIN_PATH:::/views/location.html',
			controller: 'location',
			showIf: ['$routeParams','$location', 'c8yDevices', 'c8yActions', addActions]
		})/*, c8yComponentsProvider.add({
			name: "Location",
			description: "Displays a map with device position marker",
			templateUrl: "devicemanagement_location/views/component.html",
			options: {
				noNewWidgets: !0
			}
		})*/
	}
}());
/*
 
			*/