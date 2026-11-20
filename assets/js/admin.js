let users = [
	{ id: "24-57561-2", name: "Md. Rajin Shahriar", email: "rajin@student.aiub.edu", dept: "CSE", role: "Student", status: "Active" },
	{ id: "22-45123-1", name: "Nasrin Jahan Basma", email: "nasrin@aiub.edu", dept: "EEE", role: "Lab Technician", status: "Active" },
	{ id: "22-48662-3", name: "Md. Abidur Rahman", email: "abidur@aiub.edu", dept: "CSE", role: "Administrator", status: "Active" },
	{ id: "19-32104-2", name: "Shah Md. Akil Akhtab", email: "akhtab@aiub.edu", dept: "EEE", role: "Lab In-Charge", status: "Active" }
];

let labs = [
	{ code: "LAB-01", name: "IEC Circuit Lab", dept: "EEE", incharge: "Dr. Shah Md. Akil Akhtab", inchargeId: "1", location: "Building D, Room 401", capacity: 35, status: "Active" },
	{ code: "LAB-02", name: "Microprocessor Lab", dept: "CSE", incharge: "Dr. Hasan Mahmud", inchargeId: "2", location: "Building D, Room 502", capacity: 40, status: "Active" }
];

let equipment = [
	{ code: "EQ-101", name: "Digital Multimeter", category: "Measuring Instrument", lab: "LAB-01", labId: "1", maxHours: 2, status: "Available" },
	{ code: "EQ-102", name: "8086 Microprocessor Trainer", category: "Trainer Kit", lab: "LAB-02", labId: "2", maxHours: 4, status: "Available" },
	{ code: "EQ-103", name: "Oscilloscope 50MHz", category: "Measuring Instrument", lab: "LAB-01", labId: "1", maxHours: 2, status: "Available" }
];

let reservations = [
	{ id: 101, student: "Md. Rajin Shahriar", equipment: "Digital Multimeter", status: "Approved" },
	{ id: 102, student: "Tanzim Hasan", equipment: "8086 Trainer Kit", status: "Pending" },
	{ id: 103, student: "Kazi Fahim", equipment: "Function Generator", status: "Completed" }
];

let requests = [
	{ id: 201, user: "Md. Rajin Shahriar", item: "Digital Multimeter", status: "Approved" },
	{ id: 202, user: "Tanzim Hasan", item: "8086 Trainer Kit", status: "Pending" }
];

let auditLog = [
	{ timestamp: "2026-11-20 16:30:10", actor: "Md. Abidur Rahman", action: "CREATE_USER", target: "User: 25-10023-1", ip: "192.168.1.15" },
	{ timestamp: "2026-11-20 15:45:22", actor: "Md. Rajin Shahriar", action: "LOGIN", target: "Student Portal", ip: "192.168.1.42" },
	{ timestamp: "2026-11-20 14:20:11", actor: "Md. Abidur Rahman", action: "UPDATE_ROLE", target: "User: 22-48662-3", ip: "192.168.1.15" },
	{ timestamp: "2026-11-20 11:10:05", actor: "Nasrin Jahan Basma", action: "CHECKOUT", target: "Equipment: EQ-101", ip: "192.168.1.18" }
];

window.addEventListener("DOMContentLoaded", function () {
	initAdminDashboard();
});

function initAdminDashboard () {
	let usersCount = document.getElementById("total-users-count");
	let labsCount = document.getElementById("total-labs-count");
	let equipmentCount = document.getElementById("total-equipment-count");
	let reservationsCount = document.getElementById("total-reservations-count");

	if (usersCount) {
		usersCount.innerText = users.length;
	}
	if (labsCount) {
		labsCount.innerText = labs.length;
	}
	if (equipmentCount) {
		equipmentCount.innerText = equipment.length;
	}
	if (reservationsCount) {
		reservationsCount.innerText = reservations.length;
	}

	let auditTbody = document.getElementById("latest-audit-tbody");
	if (auditTbody) {
		auditTbody.innerHTML = "";
		let count = 0;
		for (let i = 0; i < auditLog.length && count < 3; i++) {
			let entry = auditLog[i];
			let row = document.createElement("tr");
			row.innerHTML = "<td>" + entry.timestamp + "</td>" +
				"<td>" + entry.actor + "</td>" +
				"<td><span class='badge active-status'>" + entry.action + "</span></td>" +
				"<td>" + entry.target + " (" + entry.ip + ")</td>";
			auditTbody.appendChild(row);
			count++;
		}
	}
}

function filterUsers () {
	let text = document.getElementById("search").value.toLowerCase();
	let rows = document.querySelectorAll("#users-table tr");
	for (let i = 1; i < rows.length; i++) {
		if (rows[i].innerText.toLowerCase().includes(text)) {
			rows[i].style.display = "";
		} else {
			rows[i].style.display = "none";
		}
	}
}

function validateAddUser (form) {
	let fullName = document.getElementById("full-name").value;
	let email = document.getElementById("email").value;
	let studentId = document.getElementById("student-id").value;
	let department = document.getElementById("department").value;
	let role = document.getElementById("role").value;
	let tempPassword = document.getElementById("temporary-password").value;
	let valid = true;

	clearErrors();

	if (isEmpty(fullName) || fullName.trim().length < 3 || fullName.trim().length > 100 || !/^[a-zA-Z .-]+$/.test(fullName.trim())) {
		showError("full-name", "Full name must be at least 3 characters");
		valid = false;
	}

	if (isEmpty(email) || !isEmail(email)) {
		showError("email", "Enter a valid email address");
		valid = false;
	}

	if (isEmpty(studentId) || !isStudentId(studentId)) {
		showError("student-id", "Use the format 24-57561-2");
		valid = false;
	}

	if (isEmpty(department)) {
		showError("department", "Select a department");
		valid = false;
	}

	if (isEmpty(role)) {
		showError("role", "Select a role");
		valid = false;
	}

	if (isEmpty(tempPassword) || !isStrongPassword(tempPassword)) {
		showError("temporary-password", "Password needs 8+ characters with a letter and a number");
		valid = false;
	}

	if (valid) {
		let tbody = document.getElementById("users-tbody");
		if (tbody) {
			let newRowId = "user-row-" + (tbody.children.length + 1);
			let newRow = document.createElement("tr");
			newRow.id = newRowId;

			let roleTitle = role.charAt(0).toUpperCase() + role.slice(1);
			if (role === "admin") {
				roleTitle = "Administrator";
			} else if (role === "technician") {
				roleTitle = "Lab Technician";
			} else if (role === "incharge") {
				roleTitle = "Lab In-Charge";
			}

			newRow.innerHTML = "<td>" + fullName + "</td>" +
				"<td>" + studentId + "<br /><small>" + email + "</small></td>" +
				"<td>" + department + "</td>" +
				"<td class='user-role-cell'>" + roleTitle + "</td>" +
				"<td><span class='status active-status'>Active</span></td>" +
				"<td>" +
					"<form action='#' method='post' onsubmit='return validateChangeRole(this, " + (tbody.children.length + 1) + ")' novalidate>" +
						"<select name='new_role' required>" +
							"<option value=''>Change Role</option>" +
							"<option value='student'>Student</option>" +
							"<option value='technician'>Technician</option>" +
							"<option value='incharge'>In-Charge</option>" +
							"<option value='admin'>Admin</option>" +
						"</select> " +
						"<button type='submit'>Update</button>" +
					"</form> " +
					"<button type='button' class='btn-warning' onclick='toggleUserStatus(this)'>Deactivate</button>" +
				"</td>";

			tbody.appendChild(newRow);
		}

		users.push({
			id: studentId,
			name: fullName,
			email: email,
			dept: department,
			role: role,
			status: "Active"
		});

		form.reset();
		let successSpan = document.getElementById("add-user-success");
		if (successSpan) {
			successSpan.innerText = "User added successfully!";
		}
		return finishForm(valid, form);
	}

	return false;
}

function validateChangeRole (form, rowId) {
	let select = form.querySelector("select[name='new_role']");
	if (!select || isEmpty(select.value)) {
		alert("Please select a new role");
		return false;
	}

	let row = document.getElementById("user-row-" + rowId);
	let currentRoleCell = row ? row.querySelector(".user-role-cell") : null;
	let currentRole = currentRoleCell ? currentRoleCell.innerText.toLowerCase() : "";

	if (currentRole.includes(select.value)) {
		alert("The selected role is already assigned to this user");
		return false;
	}

	if (confirm("Are you sure you want to change this user role?")) {
		if (currentRoleCell) {
			let newTitle = select.options[select.selectedIndex].text;
			currentRoleCell.innerText = newTitle;
		}
		alert("Role updated successfully!");
	}

	return false;
}

function toggleUserStatus (button) {
	let row = button.closest("tr");
	let statusSpan = row ? row.querySelector(".status") : null;

	if (confirm("Are you sure you want to change this user status?")) {
		if (statusSpan) {
			if (statusSpan.innerText === "Active") {
				statusSpan.innerText = "Inactive";
				statusSpan.className = "status inactive";
				button.innerText = "Activate";
				button.className = "btn-success";
			} else {
				statusSpan.innerText = "Active";
				statusSpan.className = "status active-status";
				button.innerText = "Deactivate";
				button.className = "btn-warning";
			}
		}
	}
}

function validateLab (form) {
	let labName = document.getElementById("lab-name").value;
	let labCode = document.getElementById("lab-code").value;
	let department = document.getElementById("department").value;
	let inchargeId = document.getElementById("incharge-id").value;
	let location = document.getElementById("location").value;
	let capacity = document.getElementById("capacity").value;
	let status = document.getElementById("lab-status").value;
	let valid = true;

	clearErrors();

	if (isEmpty(labName) || labName.trim().length < 3 || labName.trim().length > 60) {
		showError("lab-name", "Lab name must be between 3 and 60 characters");
		valid = false;
	}

	let labCodeRegex = /^LAB-[0-9]{2}$/;
	if (isEmpty(labCode) || !labCodeRegex.test(labCode.trim())) {
		showError("lab-code", "Use the format LAB-01");
		valid = false;
	}

	if (isEmpty(department)) {
		showError("department", "Select a department");
		valid = false;
	}

	if (isEmpty(inchargeId)) {
		showError("incharge-id", "Select an in-charge faculty");
		valid = false;
	}

	if (isEmpty(location)) {
		showError("location", "Location is required");
		valid = false;
	}

	let capNum = parseInt(capacity, 10);
	if (isEmpty(capacity) || isNaN(capNum) || capNum < 1 || capNum > 100) {
		showError("capacity", "Capacity must be between 1 and 100");
		valid = false;
	}

	if (isEmpty(status)) {
		showError("lab-status", "Select a status");
		valid = false;
	}

	if (valid) {
		let labIdField = document.getElementById("lab-id-field");
		let isEdit = labIdField && labIdField.value !== "";

		if (isEdit) {
			let row = document.getElementById(labIdField.value);
			if (row) {
				row.querySelector(".col-name").innerText = labName;
				row.querySelector(".col-code").innerText = labCode;
				row.querySelector(".col-dept").innerText = department;
				let inchargeSelect = document.getElementById("incharge-id");
				let inchargeName = inchargeSelect.options[inchargeSelect.selectedIndex].text;
				let inchargeCell = row.querySelector(".col-incharge");
				inchargeCell.innerText = inchargeName;
				inchargeCell.setAttribute("data-id", inchargeId);
				row.querySelector(".col-location").innerText = location;
				row.querySelector(".col-capacity").innerText = capacity;
				let statusSpan = row.querySelector(".col-status .status");
				statusSpan.innerText = status.charAt(0).toUpperCase() + status.slice(1);
			}
			resetLabForm();
		} else {
			let tbody = document.getElementById("labs-tbody");
			if (tbody) {
				let rowCount = tbody.children.length + 1;
				let rowId = "lab-row-" + rowCount;
				let newRow = document.createElement("tr");
				newRow.id = rowId;

				let inchargeSelect = document.getElementById("incharge-id");
				let inchargeName = inchargeSelect.options[inchargeSelect.selectedIndex].text;

				newRow.innerHTML = "<td class='col-code'>" + labCode + "</td>" +
					"<td class='col-name'>" + labName + "</td>" +
					"<td class='col-dept'>" + department + "</td>" +
					"<td class='col-incharge' data-id='" + inchargeId + "'>" + inchargeName + "</td>" +
					"<td class='col-location'>" + location + "</td>" +
					"<td class='col-capacity'>" + capacity + "</td>" +
					"<td class='col-status'><span class='status active-status'>" + (status.charAt(0).toUpperCase() + status.slice(1)) + "</span></td>" +
					"<td>" +
						"<button type='button' onclick='editLab(this)'>Edit</button> " +
						"<form action='#' method='post' onsubmit='return deleteLabRow(this)' novalidate>" +
							"<input type='checkbox' id='confirm-delete-lab-" + rowCount + "' name='confirm_delete' required /> Confirm " +
							"<br /><span class='error' id='confirm-delete-lab-" + rowCount + "-error'></span>" +
							"<button type='submit' class='btn-danger'>Delete</button>" +
						"</form>" +
					"</td>";

				tbody.appendChild(newRow);
			}
			form.reset();
		}

		let successSpan = document.getElementById("lab-success");
		if (successSpan) {
			successSpan.innerText = "Laboratory saved successfully!";
		}
		return finishForm(valid, form);
	}

	return false;
}

function editLab (btnOrId) {
	let row;
	if (typeof btnOrId === "string") {
		row = document.getElementById(btnOrId);
	} else {
		row = btnOrId.closest("tr");
	}
	if (!row) {
		return;
	}

	let rowId = row.id;
	document.getElementById("lab-id-field").value = rowId;
	document.getElementById("lab-code").value = row.querySelector(".col-code").innerText.trim();
	document.getElementById("lab-name").value = row.querySelector(".col-name").innerText.trim();
	document.getElementById("department").value = row.querySelector(".col-dept").innerText.trim();
	document.getElementById("incharge-id").value = row.querySelector(".col-incharge").getAttribute("data-id") || "1";
	document.getElementById("location").value = row.querySelector(".col-location").innerText.trim();
	document.getElementById("capacity").value = row.querySelector(".col-capacity").innerText.trim();

	let legend = document.getElementById("lab-form-legend");
	if (legend) {
		legend.innerText = "Edit Laboratory";
	}
	let submitBtn = document.getElementById("lab-submit-btn");
	if (submitBtn) {
		submitBtn.value = "Update Laboratory";
	}

	document.getElementById("lab-name").focus();
}

function resetLabForm () {
	let labIdField = document.getElementById("lab-id-field");
	if (labIdField) {
		labIdField.value = "";
	}
	let legend = document.getElementById("lab-form-legend");
	if (legend) {
		legend.innerText = "Add Laboratory";
	}
	let submitBtn = document.getElementById("lab-submit-btn");
	if (submitBtn) {
		submitBtn.value = "Save Laboratory";
	}
	clearErrors();
}

function deleteLabRow (form, rowId) {
	let confirmCheck = form.querySelector("input[name='confirm_delete']");
	let errorSpan = form.querySelector(".error");

	if (!confirmCheck || !confirmCheck.checked) {
		if (errorSpan) {
			errorSpan.innerText = "You must confirm deletion";
		}
		return false;
	}

	if (confirm("Delete this lab?")) {
		let row = rowId ? document.getElementById(rowId) : form.closest("tr");
		if (row) {
			row.remove();
		}
	}

	return false;
}

function validateEquipment (form) {
	let name = document.getElementById("equipment-name").value;
	let code = document.getElementById("equipment-code").value;
	let category = document.getElementById("category").value;
	let labId = document.getElementById("lab-id").value;
	let status = document.getElementById("equipment-status").value;
	let maxHours = document.getElementById("max-booking-hours").value;
	let purchaseDate = document.getElementById("purchase-date").value;
	let fileInput = document.getElementById("equipment-image");
	let description = document.getElementById("description").value;
	let valid = true;

	clearErrors();

	if (isEmpty(name) || name.trim().length < 3 || name.trim().length > 60) {
		showError("equipment-name", "Equipment name must be between 3 and 60 characters");
		valid = false;
	}

	let codeRegex = /^EQ-[0-9]{3}$/;
	if (isEmpty(code) || !codeRegex.test(code.trim())) {
		showError("equipment-code", "Use the format EQ-101");
		valid = false;
	}

	if (isEmpty(category)) {
		showError("category", "Select a category");
		valid = false;
	}

	if (isEmpty(labId)) {
		showError("lab-id", "Select a lab");
		valid = false;
	}

	if (isEmpty(status)) {
		showError("equipment-status", "Select a status");
		valid = false;
	}

	let hoursNum = parseInt(maxHours, 10);
	if (isEmpty(maxHours) || isNaN(hoursNum) || hoursNum < 1 || hoursNum > 8) {
		showError("max-booking-hours", "Max booking hours must be between 1 and 8");
		valid = false;
	}

	if (isEmpty(purchaseDate)) {
		showError("purchase-date", "Date cannot be in the future");
		valid = false;
	} else if (isFutureDate(purchaseDate)) {
		showError("purchase-date", "Date cannot be in the future");
		valid = false;
	}

	if (fileInput && fileInput.files && fileInput.files.length > 0) {
		if (!isImageFile(fileInput) || isTooBig(fileInput, MAX_FILE_MB)) {
			showError("equipment-image", "Choose an image (JPG or PNG) under 2 MB");
			valid = false;
		}
	}

	if (description.length > 300) {
		showError("description", "Description cannot exceed 300 characters");
		valid = false;
	}

	if (valid) {
		let tbody = document.getElementById("equipment-tbody");
		if (tbody) {
			let count = tbody.children.length + 1;
			let rowId = "eq-row-" + count;
			let newRow = document.createElement("tr");
			newRow.id = rowId;

			let labSelect = document.getElementById("lab-id");
			let labText = labSelect.options[labSelect.selectedIndex].text;
			let labCode = labText.split(" ")[0];
			newRow.setAttribute("data-lab", labCode);

			let catSelect = document.getElementById("category");
			let catText = catSelect.options[catSelect.selectedIndex].text;

			newRow.innerHTML = "<td>" + code + "</td>" +
				"<td>" + name + "</td>" +
				"<td>" + catText + "</td>" +
				"<td>" + labCode + "</td>" +
				"<td>" + maxHours + " hrs</td>" +
				"<td><span class='status active-status'>Available</span></td>" +
				"<td>" +
					"<form action='#' method='post' onsubmit='return deleteEquipmentRow(this)' novalidate>" +
						"<input type='checkbox' id='confirm-delete-eq-" + count + "' name='confirm_delete' required /> Confirm " +
						"<br /><span class='error' id='confirm-delete-eq-" + count + "-error'></span>" +
						"<button type='submit' class='btn-danger'>Delete</button>" +
					"</form>" +
				"</td>";

			tbody.appendChild(newRow);
		}

		form.reset();
		let successSpan = document.getElementById("equipment-success");
		if (successSpan) {
			successSpan.innerText = "Equipment added successfully!";
		}
		return finishForm(valid, form);
	}

	return false;
}

function filterEquipmentByLab () {
	let filter = document.getElementById("filter-lab").value;
	let rows = document.querySelectorAll("#equipment-table tbody tr");

	for (let i = 0; i < rows.length; i++) {
		let labAttr = rows[i].getAttribute("data-lab");
		if (filter === "" || labAttr === filter) {
			rows[i].style.display = "";
		} else {
			rows[i].style.display = "none";
		}
	}
}

function deleteEquipmentRow (form, rowId) {
	let confirmCheck = form.querySelector("input[name='confirm_delete']");
	let errorSpan = form.querySelector(".error");

	if (!confirmCheck || !confirmCheck.checked) {
		if (errorSpan) {
			errorSpan.innerText = "You must confirm deletion";
		}
		return false;
	}

	if (confirm("Delete this equipment?")) {
		let row = rowId ? document.getElementById(rowId) : form.closest("tr");
		if (row) {
			row.remove();
		}
	}

	return false;
}

function validateReport (form) {
	let reportType = document.getElementById("report-type").value;
	let fromDate = document.getElementById("from-date").value;
	let toDate = document.getElementById("to-date").value;
	let valid = true;

	clearErrors();

	if (isEmpty(reportType)) {
		showError("report-type", "Select a report type");
		valid = false;
	}

	if (isEmpty(fromDate)) {
		showError("from-date", "From date is required");
		valid = false;
	}

	if (isEmpty(toDate)) {
		showError("to-date", "To date is required");
		valid = false;
	} else if (isFutureDate(toDate)) {
		showError("to-date", "Date cannot be in the future");
		valid = false;
	}

	if (!isEmpty(fromDate) && !isEmpty(toDate)) {
		if (new Date(fromDate) > new Date(toDate)) {
			showError("from-date", "From date cannot be after to date");
			valid = false;
		}
	}

	if (valid) {
		let successSpan = document.getElementById("report-success");
		if (successSpan) {
			successSpan.innerText = "Report generated successfully!";
		}
		return finishForm(valid, form);
	}

	return false;
}

function validateAuditFilter (form) {
	let actor = document.getElementById("actor").value;
	let fromDate = document.getElementById("audit-from").value;
	let toDate = document.getElementById("audit-to").value;
	let valid = true;

	clearErrors();

	if (!isEmpty(actor) && !/^[a-zA-Z .-]+$/.test(actor.trim())) {
		showError("actor", "Actor name can only contain letters and dots");
		valid = false;
	}

	if (!isEmpty(fromDate) && !isEmpty(toDate)) {
		if (new Date(fromDate) > new Date(toDate)) {
			showError("audit-from", "From date cannot be after to date");
			valid = false;
		}
	}

	if (valid) {
		return finishForm(valid, form);
	}

	return false;
}

function filterAuditTableByAction () {
	let action = document.getElementById("action-type").value;
	let rows = document.querySelectorAll("#audit-table tbody tr");

	for (let i = 0; i < rows.length; i++) {
		let rowAction = rows[i].getAttribute("data-action");
		if (action === "" || rowAction === action) {
			rows[i].style.display = "";
		} else {
			rows[i].style.display = "none";
		}
	}
}

function countAnnouncementChars () {
	countChars("announcement-message", "message-char-count", 500);
}

function validateAnnouncement (form) {
	let title = document.getElementById("announcement-title").value;
	let message = document.getElementById("announcement-message").value;
	let publishDate = document.getElementById("publish-date").value;
	let expiryDate = document.getElementById("expiry-date").value;
	let priority = getRadio("priority");
	let valid = true;

	clearErrors();

	if (isEmpty(title) || title.trim().length < 5 || title.trim().length > 80) {
		showError("announcement-title", "Title must be between 5 and 80 characters");
		valid = false;
	}

	if (isEmpty(message) || message.trim().length < 10 || message.trim().length > 500) {
		showError("announcement-message", "Message must be between 10 and 500 characters");
		valid = false;
	}

	let audCheckboxes = document.querySelectorAll("input[name='audience[]']:checked");
	if (audCheckboxes.length === 0) {
		let audError = document.getElementById("audience-error");
		if (audError) {
			audError.innerText = "Select at least one audience";
		}
		valid = false;
	}

	if (isEmpty(priority)) {
		let prioError = document.getElementById("priority-error");
		if (prioError) {
			prioError.innerText = "Choose a priority";
		}
		valid = false;
	}

	if (isEmpty(publishDate)) {
		showError("publish-date", "Date cannot be in the past");
		valid = false;
	} else if (isPastDate(publishDate)) {
		showError("publish-date", "Date cannot be in the past");
		valid = false;
	}

	if (isEmpty(expiryDate)) {
		showError("expiry-date", "Expiry date is required");
		valid = false;
	}

	if (!isEmpty(publishDate) && !isEmpty(expiryDate)) {
		if (new Date(expiryDate) <= new Date(publishDate)) {
			showError("expiry-date", "Expiry date must be after publish date");
			valid = false;
		}
	}

	if (valid) {
		let tbody = document.getElementById("announcements-tbody");
		if (tbody) {
			let count = tbody.children.length + 1;
			let rowId = "ann-row-" + count;
			let newRow = document.createElement("tr");
			newRow.id = rowId;

			let audienceList = [];
			for (let i = 0; i < audCheckboxes.length; i++) {
				audienceList.push(audCheckboxes[i].value);
			}

			let badgeClass = "checked-in";
			if (priority === "Important") {
				badgeClass = "pending";
			} else if (priority === "Urgent") {
				badgeClass = "inactive";
			}

			newRow.innerHTML = "<td>" + title + "</td>" +
				"<td>" + audienceList.join(", ") + "</td>" +
				"<td><span class='badge " + badgeClass + "'>" + priority + "</span></td>" +
				"<td>" + publishDate + "</td>" +
				"<td>" + expiryDate + "</td>" +
				"<td><button type='button' class='btn-danger' onclick='deleteAnnouncementRow(this)'>Delete</button></td>";

			tbody.appendChild(newRow);
		}

		form.reset();
		document.getElementById("message-char-count").innerText = "0 / 500 characters";
		let successSpan = document.getElementById("announcement-success");
		if (successSpan) {
			successSpan.innerText = "Announcement published successfully!";
		}
		return finishForm(valid, form);
	}

	return false;
}

function deleteAnnouncementRow (btnOrId) {
	if (confirm("Are you sure you want to delete this announcement?")) {
		let row = (typeof btnOrId === "string") ? document.getElementById(btnOrId) : btnOrId.closest("tr");
		if (row) {
			row.remove();
		}
	}
}

function checkNewPasswordStrength () {
	let pw = document.getElementById("new-password").value;
	let indicator = document.getElementById("password-strength-indicator");
	if (indicator) {
		let level = passwordStrength(pw);
		if (level === "") {
			indicator.innerText = "";
		} else {
			indicator.innerText = "Strength: " + level;
			if (level === "Weak") {
				indicator.style.color = "#dc2626";
			} else if (level === "Medium") {
				indicator.style.color = "#b45309";
			} else {
				indicator.style.color = "#15803d";
			}
		}
	}
}

function validateChangePassword (form) {
	let currentPw = document.getElementById("current-password").value;
	let newPw = document.getElementById("new-password").value;
	let confirmPw = document.getElementById("confirm-new-password").value;
	let valid = true;

	clearErrors();

	if (isEmpty(currentPw) || currentPw.length < 8) {
		showError("current-password", "Password must be at least 8 characters");
		valid = false;
	}

	if (isEmpty(newPw) || !isStrongPassword(newPw)) {
		showError("new-password", "Password needs 8+ characters with a letter and a number");
		valid = false;
	} else if (newPw === currentPw) {
		showError("new-password", "New password must be different from current password");
		valid = false;
	}

	if (isEmpty(confirmPw) || confirmPw !== newPw) {
		showError("confirm-new-password", "Passwords do not match");
		valid = false;
	}

	if (valid) {
		let successSpan = document.getElementById("change-password-success");
		if (successSpan) {
			successSpan.innerText = "Password updated successfully!";
		}
		form.reset();
		let indicator = document.getElementById("password-strength-indicator");
		if (indicator) {
			indicator.innerText = "";
		}
		return finishForm(valid, form);
	}

	return false;
}
