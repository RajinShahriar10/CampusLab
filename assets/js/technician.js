function validateRequestDate() 
{
    let date=document.getElementById("request_date").value;
    if (date=="") {
        return true;
    }
    if (isNaN(Date.parse(date))) 
        
        {
        alert("Enter a valid date");
        return false;
    }
    return true;
}

function handleReservationAction(event)
{
    event.preventDefault();

    let form = event.target;
    let action = event.submitter.value;

    let id = form.querySelector('input[name="reservation_id"]').value;
    let reason = form.querySelector('select[name="rejection_reason"]').value;

    if (action == "reject" && reason == "")
    {
        alert("Please select a rejection reason");
        return false;
    }

    let row = form.closest("tr");
    let status = row.querySelector(".request-status");

    if (action == "approve")
    {
        status.innerHTML = "Approved";
    }
    else if (action == "reject")
    {
        status.innerHTML = "Rejected";
    }

    let buttons = form.querySelectorAll("button");

    for (let i = 0; i < buttons.length; i++)
    {
        buttons[i].disabled = true;
    }

    alert("Reservation " + id + " updated");

    updatePendingCount();

    return false;
}

function updatePendingCount() 

{
    let statuses=document.querySelectorAll(".request-status");
    let count=0;
    for (let i=0;i<statuses.length; i++) {
        if (statuses[i].innerHTML=="Pending")
            {
            count++;
            }
    }
    document.getElementById("pending-count").innerHTML=count;
}
function checkEquipmentConflicts() {
    let rows=document.querySelectorAll(".approval-queue tbody tr");
    for (let i=0;i<rows.length;i++){
        let equipment1=rows[i].getAttribute("data-equipment");
        let start1=new Date(rows[i].getAttribute("data-start"));
        let end1=new Date(rows[i].getAttribute("data-end"));
        for (let j=i+1;j<rows.length;j++) {
            let equipment2=rows[j].getAttribute("data-equipment");
            let start2=new Date(rows[j].getAttribute("data-start"));
            let end2=new Date(rows[j].getAttribute("data-end"));
            if (
                equipment1==equipment2 &&
                start1<end2 &&
                start2<end1
            ) {
                rows[i].querySelector(".conflict-status").innerHTML="Conflict";
                rows[j].querySelector(".conflict-status").innerHTML="Conflict";
                rows[i].querySelector(".conflict-status").style.color="red";
                rows[j].querySelector(".conflict-status").style.color="red";
            }
        }
    }
}
window.onload=function(){
    updatePendingCount();
    checkEquipmentConflicts();
};

/*check in and check out*/

function handleCheckInOut(event)
{
    event.preventDefault();
    let form =event.target;
    let reservation =form.querySelector('[name="reservation_id"]').value;
    let qr =form.querySelector('[name="qr_code"]').value;
    let student =form.querySelector('[name="student_id"]').value;
    let equipment =form.querySelector('[name="equipment_id"]').value;
    let action =event.submitter.value;
    let condition ="";
    let notes =form.querySelector('[name="condition_notes"]').value;
    let selected = form.querySelector('[name="equipment_condition"]:checked');
    if (reservation =="" && qr =="")
    {
        alert("Enter Reservation ID or QR Code");
        return false;
    }   
    if (student == ""|| equipment == "")
    {
        alert("Enter Student ID and Equipment ID");
        return false;
    }
    if (action == "check_out")
    {
        if (selected == null)
        {
            alert("Please select equipment condition");
            return false;
        }
        condition = selected.value;
        if (condition == "damaged" && notes.length < 10)
        {
            alert("Please write at least 10 characters in condition notes");
            return false;
        }
    }
    let table = document.getElementById("activity-list");
    let row = table.insertRow();
    row.insertCell(0).innerHTML=reservation;
    row.insertCell(1).innerHTML=student;
    row.insertCell(2).innerHTML=equipment;
    let activity = action;

    if (action=="check_in")
    {
        activity="Check-in";
    }
    else if (action=="check_out")
    {
        activity="Check-out("+condition+")";
    }
    else if (action=="no_show")
    {
        activity="No-show";
    }
    row.insertCell(3).innerHTML = activity;
    row.insertCell(4).innerHTML = new Date().toLocaleString();
    alert("Activity added successfully!");
    form.reset();
    return false;
}


/*Maintenance Log Form*/

function handleMaintenance(event)
{
    event.preventDefault();
    let form = event.target;
    let equipment = form.querySelector('[name="equipment_id"]').value;
    let type = form.querySelector('[name="maintenance_type"]').value;
    let status = form.querySelector('[name="maintenance_status"]').value;
    let date = form.querySelector('[name="date_performed"]').value;
    let nextDate = form.querySelector('[name="next_due_date"]').value;
    let description = form.querySelector('[name="description"]').value;
    let parts = form.querySelector('[name="parts_replaced"]').value;
    let file = form.querySelector('[name="attachment"]').files[0];
    let unavailable = form.querySelector('[name="set_unavailable"]').checked;
    if (description.length < 10 || description.length > 500)
    {
        alert("Description must be 10 to 500 characters.");
        return false;
    }
    if (parts.length > 100)
    {
        alert("Parts replaced cannot exceed 100 characters.");
        return false;
    }
    let today = new Date();
    let todayString = today.getFullYear() + "-" +
        String(today.getMonth() + 1).padStart(2, "0") + "-" +
        String(today.getDate()).padStart(2, "0");
    if (date > todayString)
    {
        alert("Date performed cannot be in the future.");
        return false;
    }
    if (nextDate != "" && nextDate <= date)
    {
        alert("Next due date must be after date performed.");
        return false;
    }
    if (file != null)
    {
        if (!file.type.startsWith("image/"))
        {
            alert("Please upload an image.");
            return false;
        }
        if (file.size > 2 * 1024 * 1024)
        {
            alert("Image must be smaller than 2 MB.");
            return false;
        }
    }
    if (unavailable)
    {
        let answer = confirm("Mark this equipment unavailable?");
        if (answer == false)
        {
            return false;
        }
    }
    let table = document.getElementById("maintenance-list");
    let newId = table.rows.length + 1;
    let row = table.insertRow();
    row.insertCell(0).innerHTML = "MT-" + String(newId).padStart(3, "0");
    row.insertCell(1).innerHTML = equipment;
    row.insertCell(2).innerHTML = type;
    row.insertCell(3).innerHTML = status;
    row.insertCell(4).innerHTML = date;
    row.insertCell(5).innerHTML = nextDate;
    alert("Maintenance record added successfully!");
    form.reset();
    document.getElementById("description-count").innerHTML = 0;
    return false;
}
window.addEventListener("load", function()
{
    let description = document.getElementById("description");
    if (description != null)
    {
        description.addEventListener("input", function()
        {
            document.getElementById("description-count").innerHTML =
                description.value.length;
        });
    }
});
function calculateUtilisation() {
    let rows = document.querySelectorAll("#utilisation-list tr");

    for (let i = 0; i < rows.length; i++) {
        let booked = Number(rows[i].getAttribute("data-booked"));
        let available = Number(rows[i].getAttribute("data-available"));
        let total = booked + available;
        let percent = (booked / total) * 100;
        let cell = rows[i].querySelector(".utilisation-value");
        cell.innerHTML = percent.toFixed(1) + "%";
        if (percent >= 75) {
            cell.style.color = "orange";
        } else {
            cell.style.color = "black";
        }
    }
}
document.addEventListener("DOMContentLoaded", function() {
    let form = document.getElementById("schedule-filter");

    if (form != null) {
        calculateUtilisation();

        form.addEventListener("submit", function(event) {
            event.preventDefault();

            let date = document.getElementById("schedule_date").value;
            let lab = document.getElementById("lab_id").value;
            let rows = document.querySelectorAll("#schedule-list tr");

            for (let i = 0; i < rows.length; i++) {
                let rowDate = rows[i].getAttribute("data-date");
                let rowLab = rows[i].getAttribute("data-lab");

                if (rowDate == date && (lab == "" || rowLab == lab)) {
                    rows[i].style.display = "";
                } else {
                    rows[i].style.display = "none";
                }
            }
            let labs = document.querySelectorAll("#utilisation-list tr");

            for (let i = 0; i < labs.length; i++) {
                let rowLab = labs[i].getAttribute("data-lab");
                if (lab == "" || rowLab == lab) {
                    labs[i].style.display = "";
                } else {
                    labs[i].style.display = "none";
                }
            }
        });
    }
});

