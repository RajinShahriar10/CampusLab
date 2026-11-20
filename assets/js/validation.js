// CampusLab - Shared Validation Helpers (CSC 3215 Web Technologies)

var MAX_BOOKING_HOURS = 2;
var LAB_OPEN = "09:00";
var LAB_CLOSE = "17:00";
var MAX_FILE_MB = 2;
var SERVER_READY = false;

// Clears all red borders and error messages on the form
function clearErrors () {
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

// Displays an error message under the specified input field and moves focus if first error
function showError (id, message) {
	let field = document.getElementById(id);
	let errorSpan = document.getElementById(id + "-error");
	if (errorSpan) {
		errorSpan.innerText = message;
	}
	if (field) {
		field.classList.add("invalid");
		// focus on the first invalid field
		let currentFocused = document.querySelector(":focus");
		if (!currentFocused || !currentFocused.classList.contains("invalid")) {
			field.focus();
		}
	}
}

// Checks if a text value is empty or only whitespace
function isEmpty (value) {
	if (value === null || value === undefined) {
		return true;
	}
	return value.trim() === "";
}

// Validates standard email address format
function isEmail (value) {
	let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(value.trim());
}

// Validates student/faculty ID format like 24-57561-2
function isStudentId (value) {
	let idRegex = /^[0-9]{2}-[0-9]{5}-[0-9]{1}$/;
	return idRegex.test(value.trim());
}

// Validates 11-digit phone number starting with 01
function isPhone (value) {
	let phoneRegex = /^01[0-9]{9}$/;
	return phoneRegex.test(value.trim());
}

// Checks for at least 8 characters with at least one letter and one number
function isStrongPassword (value) {
	if (value.length < 8) {
		return false;
	}
	let hasLetter = /[a-zA-Z]/.test(value);
	let hasNumber = /[0-9]/.test(value);
	return hasLetter && hasNumber;
}

// Returns password strength level
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

// Checks if date is before today
function isPastDate (dateStr) {
	if (isEmpty(dateStr)) {
		return false;
	}
	let inputDate = new Date(dateStr);
	let today = new Date();
	today.setHours(0, 0, 0, 0);
	return inputDate < today;
}

// Checks if date is after today
function isFutureDate (dateStr) {
	if (isEmpty(dateStr)) {
		return false;
	}
	let inputDate = new Date(dateStr);
	let today = new Date();
	today.setHours(23, 59, 59, 999);
	return inputDate > today;
}

// Checks if end time is after start time
function isEndAfterStart (start, end) {
	if (isEmpty(start) || isEmpty(end)) {
		return false;
	}
	return end > start;
}

// Returns the hour difference between two time strings
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

// Checks if selected file is an image
function isImageFile (input) {
	if (!input || !input.files || input.files.length === 0) {
		return false;
	}
	let file = input.files[0];
	let validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
	return validTypes.includes(file.type.toLowerCase()) || /\.(jpe?g|png|webp)$/i.test(file.name);
}

// Checks if file size exceeds maximum megabytes
function isTooBig (input, maxMB) {
	if (!input || !input.files || input.files.length === 0) {
		return false;
	}
	let maxBytes = maxMB * 1024 * 1024;
	return input.files[0].size > maxBytes;
}

// Returns value of the checked radio button
function getRadio (name) {
	let radios = document.getElementsByName(name);
	for (let i = 0; i < radios.length; i++) {
		if (radios[i].checked) {
			return radios[i].value;
		}
	}
	return "";
}

// Live character counter
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

// Form finish handler: displays success message and prevents reload
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
