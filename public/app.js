var app = angular.module('decode', [
	'ui.router',
	'ngCookies'
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
	.state('auth', {
		url: '/auth',
		templateUrl: '/views/auth.html',
		controller: 'AuthCtrl',
		controllerAs: 'vm'
	})
	.state('register', {
		url: '/register',
		templateUrl: '/views/register.html',
		controller: 'RegisterCtrl',
		controllerAs: 'vm'
	})
	.state('post', {
		url: '/post/:id',
		templateUrl: '/views/post.html',
		controller: 'PostCtrl',
		controllerAs: 'vm'
	})
	.state('filter', {
		url: '/filter',
		templateUrl: '/views/filter.html',
		controller: 'FilterCtrl',
		controllerAs: 'vm'
	});


}


