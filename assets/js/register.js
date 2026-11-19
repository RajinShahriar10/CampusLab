let menu_ul = document.getElementById('menu');
let department_select = document.getElementById('department');
let role_select = document.getElementById('role');

function addMenuItem(link){
	let menu_li = document.createElement('li');

	let menu_a = document.createElement('a');
	menu_a.innerText = link.text;
	menu_a.href = link.href;

	menu_li.appendChild(menu_a);
	menu_ul.appendChild(menu_li);
}

function addDepartmentOption(department){
	let option = document.createElement('option');
	option.value = department.value;
	option.innerText = department.name;
	department_select.appendChild(option);
}

function addRoleOption(role){
	let option = document.createElement('option');
	option.value = role.value;
	option.innerText = role.name;
	role_select.appendChild(option);
}
menu_links.forEach(addMenuItem);
departments.forEach(addDepartmentOption);
roles.forEach(addRoleOption);
