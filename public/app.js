var app = angular.module('decode', [
	'ui.router'
]);

app.config(routeConfig);

routeConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('home', {
		url: '/',
		templateUrl: '/views/home.html',
		controller: 'MainCtrl',
		controllerAs: 'vm'
	})
	.state('profile', {
		url: '/profile',
		templateUrl: '/views/profile.html',
		controller: 'ProfileCtrl',
		controllerAs: 'vm'
	})
	.state('contacts', {
		url: '/contacts',
		templateUrl: '/views/contacts.html',
		controller: 'ContactsCtrl',
		controllerAs: 'vm'
	});


}


