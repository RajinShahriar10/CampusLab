let next_reservation_p = document.getElementById('next-reservation');
let pending_count_p = document.getElementById('pending-count');
let availability_list = document.getElementById('availability-list');

let first = reservations[0];
next_reservation_p.innerText = first.equipment + " - " + first.lab + " (" + first.time + ")";

let pending_count = 0;

function countPending(reservation){
	if (reservation.status === "Pending") {
		pending_count++;
	}
}

reservations.forEach(countPending);
pending_count_p.innerText = pending_count;

function addEquipmentCard(item) {
	let img = document.createElement('img');
	img.src = "../assets/images/" + item.image;
	img.alt = item.name;
	img.width = 80;
	img.height = 80;
	availability_list.appendChild(img);

	let name_h4 = document.createElement('h4');
	name_h4.innerText = item.name;
	availability_list.appendChild(name_h4);

	let info_p = document.createElement('p');
	info_p.innerText = item.lab + " | " + item.category;
	availability_list.appendChild(info_p);

	let status_p = document.createElement('p');
	status_p.innerText = "Status: " + item.status;
	availability_list.appendChild(status_p);

	let link = document.createElement('a');
	link.href = "equipment-catalogue.html";
	if (item.status === "Available") {
		link.innerText = "Book Now";
	} else {
		link.innerText = "Join Waitlist";
	}
	availability_list.appendChild(link);

	let hr = document.createElement('hr');
	availability_list.appendChild(hr);
}

equipment.forEach(addEquipmentCard);
