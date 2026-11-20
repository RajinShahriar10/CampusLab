let equipment_list = document.getElementById('equipment-list');
let equipment_select = document.getElementById('equipment-id');

function addEquipmentItem(item){
	let img = document.createElement('img');
	img.src = "../assets/images/" + item.image;
	img.alt = item.name;
	img.width = 80;
	img.height = 80;
	equipment_list.appendChild(img);

	let name_h4 = document.createElement('h4');
	name_h4.innerText = item.name;
	equipment_list.appendChild(name_h4);

	let info_p = document.createElement('p');
	info_p.innerText = item.lab + " | " + item.category;
	equipment_list.appendChild(info_p);

	let status_p = document.createElement('p');
	status_p.innerText = "Status: " + item.status;
	equipment_list.appendChild(status_p);

	if (item.status === "Available") {
		let book_link = document.createElement('a');
		book_link.href = "#booking-request";
		book_link.innerText = "Book";
		equipment_list.appendChild(book_link);
	} else {
		let waitlist_form = document.createElement('form');
		waitlist_form.action = "#";
		waitlist_form.method = "post";
		let form_html = "<fieldset>";
		form_html += "<legend>Join Waitlist</legend>";
		form_html += "<input type='hidden' name='equipment_id' value='" + item.id + "' />";
		form_html += "<label for='preferred-date-" + item.id + "'>Preferred Date:</label> ";
		form_html += "<input type='date' id='preferred-date-" + item.id + "' name='preferred_date' required /><br />";
		form_html += "<label for='waitlist-start-" + item.id + "'>Start Time:</label> ";
		form_html += "<input type='time' id='waitlist-start-" + item.id + "' name='start_time' required /><br />";
		form_html += "<label for='waitlist-end-" + item.id + "'>End Time:</label> ";
		form_html += "<input type='time' id='waitlist-end-" + item.id + "' name='end_time' required /><br />";
		form_html += "<button type='submit'>Join Waitlist</button>";
		form_html += "</fieldset>";
		waitlist_form.innerHTML += form_html;

		equipment_list.appendChild(waitlist_form);
	}
	let hr = document.createElement('hr');
	equipment_list.appendChild(hr);
}
function addEquipmentOption(item) {
	let option = document.createElement('option');
	option.value = item.id;
	option.innerText = item.name + " - " + item.lab;
	equipment_select.appendChild(option);
}
equipment.forEach(addEquipmentItem);
equipment.forEach(addEquipmentOption);