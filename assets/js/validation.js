var MAX_BOOKING_HOURS = 2;
var LAB_OPEN = "09:00";
var LAB_CLOSE = "17:00";
var MAX_FILE_MB = 2;
var SERVER_READY = false;
var firstErrorField = null;

function clearErrors () {
	firstErrorField = null;
	let errors = document.querySelectorAll(".error");
	for (let i = 0; i < errors.length; i++) {
		errors[i].innerText = "";
	}
	let invalids = document.querySelectorAll(".invalid");
	for (let i = 0; i < invalids.length; i++) {
		invalids[i].classList.remove("invalid");
	}
	let successes = document.querySelectorAll(".success");
	for (let i = 0; i < successes.length; i++) {
		successes[i].innerText = "";
	}
}

function showError (id, message) {
	let field = document.getElementById(id);
	let errorSpan = document.getElementById(id + "-error");
	if (errorSpan) {
		errorSpan.innerText = message;
	}
	if (field) {
		field.classList.add("invalid");
		if (!firstErrorField) {
			firstErrorField = field;
			field.focus();
		}
	}
}

function isEmpty (value) {
	if (value === null || value === undefined) {
		return true;
	}
	return value.trim() === "";
}

function isEmail (value) {
	let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(value.trim());
}

function isStudentId (value) {
	let idRegex = /^[0-9]{2}-[0-9]{5}-[0-9]{1}$/;
	return idRegex.test(value.trim());
}

function isPhone (value) {
	let phoneRegex = /^01[0-9]{9}$/;
	return phoneRegex.test(value.trim());
}

function isStrongPassword (value) {
	if (value.length < 8) {
		return false;
	}
	let hasLetter = /[a-zA-Z]/.test(value);
	let hasNumber = /[0-9]/.test(value);
	return hasLetter && hasNumber;
}

function passwordStrength (value) {
	if (value.length === 0) {
		return "";
	}
	if (value.length < 6) {
		return "Weak";
	}
	let hasLetter = /[a-zA-Z]/.test(value);
	let hasNumber = /[0-9]/.test(value);
	let hasSpecial = /[^a-zA-Z0-9]/.test(value);

	if (value.length >= 8 && hasLetter && hasNumber && hasSpecial) {
		return "Strong";
	} else if (value.length >= 6 && ((hasLetter && hasNumber) || (hasLetter && hasSpecial))) {
		return "Medium";
	} else {
		return "Weak";
	}
}

function isPastDate (dateStr) {
	if (isEmpty(dateStr)) {
		return false;
	}
	let inputDate = new Date(dateStr);
	let today = new Date();
	today.setHours(0, 0, 0, 0);
	return inputDate < today;
}

function isFutureDate (dateStr) {
	if (isEmpty(dateStr)) {
		return false;
	}
	let inputDate = new Date(dateStr);
	let today = new Date();
	today.setHours(23, 59, 59, 999);
	return inputDate > today;
}

function isEndAfterStart (start, end) {
	if (isEmpty(start) || isEmpty(end)) {
		return false;
	}
	return end > start;
}

function hoursBetween (start, end) {
	if (isEmpty(start) || isEmpty(end)) {
		return 0;
	}
	let startParts = start.split(":");
	let endParts = end.split(":");
	let startHours = parseInt(startParts[0], 10) + parseInt(startParts[1], 10) / 60;
	let endHours = parseInt(endParts[0], 10) + parseInt(endParts[1], 10) / 60;
	return endHours - startHours;
}

function inLabHours (timeStr) {
	if (isEmpty(timeStr)) {
		return false;
	}
	return timeStr >= LAB_OPEN && timeStr <= LAB_CLOSE;
}

function isImageFile (input) {
	if (!input || !input.files || input.files.length === 0) {
		return false;
	}
	let file = input.files[0];
	let validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
	return validTypes.includes(file.type.toLowerCase()) || /\.(jpe?g|png|webp)$/i.test(file.name);
}

function isTooBig (input, maxMB) {
	if (!input || !input.files || input.files.length === 0) {
		return false;
	}
	let maxBytes = maxMB * 1024 * 1024;
	return input.files[0].size > maxBytes;
}

function getRadio (name) {
	let radios = document.getElementsByName(name);
	for (let i = 0; i < radios.length; i++) {
		if (radios[i].checked) {
			return radios[i].value;
		}
	}
	return "";
}

function countChars (textId, counterId, max) {
	let input = document.getElementById(textId);
	let counter = document.getElementById(counterId);
	if (input && counter) {
		let currentLength = input.value.length;
		counter.innerText = currentLength + " / " + max + " characters";
		if (currentLength > max) {
			counter.style.color = "#dc2626";
		} else {
			counter.style.color = "#64748b";
		}
	}
}

function finishForm (valid, form) {
	if (valid) {
		let successSpan = form.querySelector(".success");
		if (successSpan) {
			successSpan.innerText = "Form submitted successfully!";
		}
		if (!SERVER_READY) {
			return false;
		}
		return true;
	}
	return false;
}
