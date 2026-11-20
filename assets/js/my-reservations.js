let upcoming_div = document.getElementById('upcoming');
let past_div = document.getElementById('past');

function makeTable(){
	let table = document.createElement('table');

	let header_row = document.createElement('tr');
	header_row.style.fontStyle = 'italic';

	let equipmentTH = document.createElement('th');
	equipmentTH.innerText = "Equipment";
	let labTH = document.createElement('th');
	labTH.innerText = "Lab";
	let timeTH = document.createElement('th');
	timeTH.innerText = "Date / Time";
	let statusTH = document.createElement('th');
	statusTH.innerText = "Status";
	let actionsTH = document.createElement('th');
	actionsTH.innerText = "Actions";

	header_row.appendChild(equipmentTH);
	header_row.appendChild(labTH);
	header_row.appendChild(timeTH);
	header_row.appendChild(statusTH);
	header_row.appendChild(actionsTH);

	table.appendChild(header_row);
	return table;
}

let upcoming_table = makeTable();
let past_table = makeTable();

upcoming_div.appendChild(upcoming_table);
past_div.appendChild(past_table);

function addReservationRow(reservation) {
	let row = document.createElement('tr');

	let equipment_td = document.createElement('td');
	equipment_td.innerText = reservation.equipment;
	row.appendChild(equipment_td);

	let td_html = "<td>" + reservation.lab + "</td>";
	td_html += "<td>" + reservation.time + "</td>";
	td_html += "<td>" + reservation.status + "</td>";
	row.innerHTML += td_html;

	let actions_td = document.createElement('td');
	let actions_html = "";

	if (reservation.status === "Completed") {
		actions_html += "<a href='report-fault.html'>Report Fault</a> ";
		actions_html += "<a href='session-feedback.html'>Rate Session</a>";
		actions_html += "<form action='#' method='post'>";
		actions_html += "<input type='hidden' name='reservation_id' value='" + reservation.id + "' />";
		actions_html += "<button type='submit'>Download Receipt</button>";
		actions_html += "</form>";
	} else {
		if (reservation.status === "Approved") {
			actions_html += "<a href='#qr-code'>View QR</a>";
		}
		actions_html += "<form action='#' method='post'>";
		actions_html += "<fieldset>";
		actions_html += "<legend>Reschedule</legend>";
		actions_html += "<input type='hidden' name='reservation_id' value='" + reservation.id + "' />";
		actions_html += "<label for='new-date-" + reservation.id + "'>New Date:</label> ";
		actions_html += "<input type='date' id='new-date-" + reservation.id + "' name='new_date' required /><br />";
		actions_html += "<label for='new-start-time-" + reservation.id + "'>New Start Time:</label> ";
		actions_html += "<input type='time' id='new-start-time-" + reservation.id + "' name='new_start_time' required /><br />";
		actions_html += "<label for='new-end-time-" + reservation.id + "'>New End Time:</label> ";
		actions_html += "<input type='time' id='new-end-time-" + reservation.id + "' name='new_end_time' required /><br />";
		actions_html += "<label for='reason-" + reservation.id + "'>Reason:</label> ";
		actions_html += "<input type='text' id='reason-" + reservation.id + "' name='reason' maxlength='150' /><br />";
		actions_html += "<button type='submit'>Reschedule</button>";
		actions_html += "</fieldset>";
		actions_html += "</form>";
		actions_html += "<form action='#' method='post'>";
		actions_html += "<fieldset>";
		actions_html += "<legend>Cancel</legend>";
		actions_html += "<input type='hidden' name='reservation_id' value='" + reservation.id + "' />";
		actions_html += "<label for='cancel-reason-" + reservation.id + "'>Reason:</label> ";
		actions_html += "<select id='cancel-reason-" + reservation.id + "' name='cancel_reason' required>";
		actions_html += "<option value=''>Select a reason</option>";
		actions_html += "<option value='change_of_plan'>Change of plan</option>";
		actions_html += "<option value='schedule_conflict'>Schedule conflict</option>";
		actions_html += "<option value='no_longer_needed'>No longer needed</option>";
		actions_html += "<option value='other'>Other</option>";
		actions_html += "</select><br />";
		actions_html += "<input type='checkbox' id='confirm-cancel-" + reservation.id + "' name='confirm_cancel' required /> Yes, cancel this reservation<br />";
		actions_html += "<button type='submit'>Cancel Reservation</button>";
		actions_html += "</fieldset>";
		actions_html += "</form>";
	}

	actions_td.innerHTML += actions_html;
	row.appendChild(actions_td);

	if (reservation.status === "Completed") {
		past_table.appendChild(row);
	} else {
		upcoming_table.appendChild(row);
	}
}

reservations.forEach(addReservationRow);