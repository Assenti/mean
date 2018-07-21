app.filter('mydate', DateFilter);

function DateFilter(){
	var months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
	var weekDays = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

	return function(date){
		return weekDays[date.getDay()-1] + ', ' + date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear() + ' год';
	}
}