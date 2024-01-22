function handleForm(event) {
    event.preventDefault();
    
    const Name = document.getElementById("name").value;
    const Address = document.getElementById("address").value;
    const Phone = document.getElementById("phone_number").value;

    const id = 'user_' + Date.now();

    var Details = {
        id,
        Name,
        Address,
        Phone
    }
    saveDetails(Details);
    add();
}

function saveDetails(Details){
    const patient_details = JSON.parse(localStorage.getItem('my-deatails')) || [];
    patient_details.push(Details);
    localStorage.setItem('my-deatails',JSON.stringify(patient_details));
}

function add(){
    const patient_details = JSON.parse(localStorage.getItem('my-deatails')) || [];
    const ul = document.getElementById("unorderlist");
    ul.innerHTML = '';

    if(patient_details){
        patient_details.forEach(Details=>{
            const li = document.createElement('li');
            li.id = `${Details.id}`;
        
            const deleteButton = document.createElement("button")
            deleteButton.type = "button";
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener('click', function(){
                deletePatientDetails(Details.id);
            })

            const editButton = document.createElement("button");
            editButton.type = "button";
            editButton.textContent = "Edit";
            editButton.addEventListener('click', function(){
                editPatientDetails(Details.id);
            })

            li.textContent = `${Details.id} - ${Details.Name} - ${Details.Address} - ${Details.Phone}`;
            li.appendChild(deleteButton);
            li.appendChild(editButton);
            ul.appendChild(li);
        })
    }
}

function deletePatientDetails(id){
    let patient_details = JSON.parse(localStorage.getItem('my-deatails')) || [];
    patient_details = patient_details.filter(Details => Details.id !== id);
    localStorage.setItem('my-deatails', JSON.stringify(patient_details));
    add();
}


function editPatientDetails(id){
    const patient_details = JSON.parse(localStorage.getItem('my-deatails')) || [];
    const Details = patient_details.find(Details => Details.id === id);
    if(Details){
        const editForm = document.createElement("form");
        editForm.innerHTML = 
        `<h3>Booking Appointment</h3>
        <label for="editedName">Name:</label>
        <input type="text" id="editedName" value="${Details.Name}" required>
        <br>
        <label for="editedAddress">Address:</label>
        <input type="text" id="editedAddress" value="${Details.Address}" required>
        <br>
        <label for="editedPhone">Phone:</label>
        <input type="text" id="editedPhone" value="${Details.Phone}" required>
        <br>
        <button type="button" onclick="saveEdit('${id}')">Save</button>
        <button type="button" onclick="cancelEdit()">Cancel</button>
        `;
        
        const listItem = document.getElementById(`${id}`);
        listItem.innerHTML = '';
        listItem.appendChild(editForm);
    }   
}

function saveEdit(id){
    const newName =  document.getElementById("editedName").value;
    const newAddress = document.getElementById("editedAddress").value;
    const newPhone = document.getElementById("editedPhone").value;

    let patient_details = JSON.parse(localStorage.getItem('my-deatails')) || [];
    patient_details = patient_details.map(Details => (Details.id === id ? {
        ...Details,
        Name: newName,
        Address: newAddress,
        Phone: newPhone
    } : Details)); 

    localStorage.setItem('my-deatails', JSON.stringify(patient_details));
    add();
}

function cancelEdit(){
    add();
}

window.onload = add;
