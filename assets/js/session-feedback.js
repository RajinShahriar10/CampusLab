let reservation_select = document.getElementById('reservation-id');

function addReservationOption(reservation){
	if (reservation.status === "Completed"){
		let option = document.createElement('option');
		option.value = reservation.id;
		option.innerText = reservation.equipment + " - " + reservation.time;
		reservation_select.appendChild(option);
	}
}

reservations.forEach(addReservationOption);