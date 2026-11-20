let menu_ul = document.getElementById('menu');

function addMenuItem(link){

	let menu_li = document.createElement('li');
	let menu_a = document.createElement('a');
	menu_a.innerText = link.text;
	menu_a.href = link.href;
	menu_li.appendChild(menu_a);
	menu_ul.appendChild(menu_li);
}

menu_links.forEach(addMenuItem);