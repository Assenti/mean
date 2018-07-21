app.controller('FilterCtrl', FilterCtrl);

FilterCtrl.$inject = ['$http', '$scope'];

function FilterCtrl($http, $scope){
	var vm = this;

	vm.employees = [
		{name: 'Asset', surname: 'Sultanov', position: 'CEO', age: 31, date: new Date()},
		{name: 'Will', surname: 'Smith', position: 'PR-manager', age: 45, date: new Date()},
		{name: 'Leo', surname: 'DiCaprio', position: 'SeniorDev', age: 41, date: new Date()},
		{name: 'Ben', surname: 'Affleck', position: 'MiddleDev', age: 44, date: new Date()},
		{name: 'Matt', surname: 'Daimon', position: 'JuniorDev', age: 43, date: new Date()},
		{name: 'Denzel', surname: 'Washington', position: 'TeamLead', age: 59, date: new Date()},
		{name: 'Colin', surname: 'Pharell', position: 'DevOps', age: 46, date: new Date()},
		{name: 'Al', surname: 'Pacino', position: 'Advisor', age: 61, date: new Date()},
		{name: 'Silvester', surname: 'Stallone', position: 'Designer', age: 63, date: new Date()},
		{name: 'Angelina', surname: 'Jolie', position: 'SMM', age: 40, date: new Date()}
	]

	vm.toggler = false;

	vm.sortToggler = function(filter){
		vm.toggler = !vm.toggler;
		if(vm.toggler) vm.setFilter(filter)
		else vm.setFilterReverse(filter);
	}

	vm.setFilter = function(filter){
		vm.filter = filter;
	}

	vm.setFilterReverse = function(filter){
		vm.filter = '-' + filter;
	}

}