const form = document.getElementById("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();

//   getting value by inputs of form and storing them in different values for each input entry 

  const name = document.getElementById("name").value;
  const id = document.getElementById("id").value;
  const email = document.getElementById("email").value;
  const mobile = document.getElementById("mobile").value;

  let students = JSON.parse(localStorage.getItem("students")) || [];

  // checking if duplicate data not entered
  const isDuplicate = students.some(
    (student) =>
      student.id === id || student.email === email || student.mobile === mobile
  );

  if (isDuplicate) {
    alert("Error !! \n\n Student with same Data already exists !");
    location.reload();
    return;
  }

  // creating student object to contain input field value of form
  const student = {
    id: id,
    name: name,
    email: email,
    mobile: mobile,
  };

  // pushing our newly created student object in local storage students object
  students.push(student);

  localStorage.setItem("students", JSON.stringify(students));

  alert("Success !! \n\n Student Data Submitted Successfully !");

  location.reload();
});

// Function to append our newly submited data to our student data table

function appendStudentDetails() {
  let students = JSON.parse(localStorage.getItem("students")) || [];

  const studentData = document.getElementById("studentdata");

//   creating a new row and adding data and button to it for each new record 

  students.forEach((student) => {

    // creating a row to append to our table 

    const details = document.createElement("tr");

    // creating four input entry to append it in our table cell to make it editable later on when edit button is clicked 

    const item1 = document.createElement("input");
    const item2 = document.createElement("input");
    const item3 = document.createElement("input");
    const item4 = document.createElement("input");

    // creating 4 data cells entry for name , student id , email and phone no in our table row 

    const itemContainer1 = document.createElement("td");
    const itemContainer2 = document.createElement("td");
    const itemContainer3 = document.createElement("td");
    const itemContainer4 = document.createElement("td");

    // creating edit and delete button for each row in our table 

    const removeButton = document.createElement("button");
    removeButton.innerHTML ='<i class="fa fa-trash-o fa-lg" aria-hidden="true"></i>';
    removeButton.dataset.id = student.id;
    const editButton = document.createElement("button");
    editButton.innerHTML ='<i class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i>';
    editButton.dataset.id = student.id;
    removeButton.classList.add("deleteButton");
    editButton.classList.add("editButton");

    // assinging value to each input entry in our table cell from local storage 

    item1.value = student.name;
    item2.value = student.id;
    item3.value = student.email;
    item4.value = student.mobile;

    // making our input as disabled after assigning value so it can't be edited directly without clicking edit button later on 

    item1.disabled = true;
    item2.disabled = true;
    item3.disabled = true;
    item4.disabled = true;

    // appending all items to our table row 
    
    itemContainer1.appendChild(item1);
    itemContainer2.appendChild(item2);
    itemContainer3.appendChild(item3);
    itemContainer4.appendChild(item4);
    details.appendChild(itemContainer1);
    details.appendChild(itemContainer2);
    details.appendChild(itemContainer3);
    details.appendChild(itemContainer4);
    details.appendChild(removeButton);
    details.appendChild(editButton);
    studentData.appendChild(details);
  });

//   Our event listener for delete button

  studentData.addEventListener("click", deleteData);

//   function to delete an entry from table on click of delete button 

  function deleteData(e) {
    let item = e.target;

    // checking if item clicked has deleteButton as its first class 

    if (item.classList[0] === "deleteButton") {
      if (confirm("Are you sure You want to Delete this Student Data")) {
        const studentId = item.dataset.id;
        students = students.filter((student) => student.id !== studentId); // Filter out the deleted student
        localStorage.setItem("students", JSON.stringify(students));

        location.reload();
      }
    } else if (item.classList[1] === "fa-trash-o") {
      if (confirm("Are you sure You want to Delete this Student Data")) {
        const parent = item.parentElement;
        const studentId = parent.dataset.id;
        students = students.filter((student) => student.id !== studentId); // Filter out the deleted student
        localStorage.setItem("students", JSON.stringify(students));
        location.reload();
      }
    }
  }

  //   Our event listener for edit button

  studentData.addEventListener("click", editData);

  //   function to edit an entry from table on click of edit button 

  function editData(e) {
    let item = e.target;
    function editItem(item) {

        // checking if item clicked has editButton as its first class 

      if (item.classList[0] === "editButton") {
        const parent = item.parentElement;
        const inputs = parent.querySelectorAll("input");
        inputs.forEach((input) => {
          input.disabled = false; // Enable the input
          input.style.backgroundColor = "white";
          input.style.padding = "5px";
          input.style.border = "2px solid black";
        });

        // accessing and removing edit and delete button on click of edit button so we can get tick and cross button  for confirmation 

        const deleteButton = parent.querySelector(".deleteButton");
        const editButton = parent.querySelector(".editButton");
        deleteButton.remove();
        editButton.remove();

        // creating and appending save button and exit button after edit button is clicked and we edit our data 

        const saveButton = document.createElement("button");
        saveButton.innerHTML =
          '<i class="fa fa-check fa-lg" aria-hidden="true"></i>';
        saveButton.classList.add("saveButton");
        const exitButton = document.createElement("button");
        exitButton.innerHTML =
          '<i class="fa fa-times fa-lg" aria-hidden="true"></i>';
        exitButton.classList.add("exitButton");
        parent.appendChild(saveButton);
        parent.appendChild(exitButton);

        // event listener and function on click of save button 

        saveButton.addEventListener("click", function () {
          console.log("save button clicked");
          const updatedName = inputs[0].value;
          const updatedId = inputs[1].value;
          const updatedEmail = inputs[2].value;
          const updatedMobile = inputs[3].value;

          // Validate updated inputs
          const namePattern = /^[A-Z a-z]+$/; // Only letters and space
          const mobilePattern = /^[0-9]{10,}$/; // Minimum 10 digits
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
          const idPattern = /^[0-9]+$/; //Student id can contain only numbers

          //checking if updated name contains only letters and space
          if (!namePattern.test(updatedName)) {
            alert("Name must contain only alphabet and space");
            return;
          }

          //checking if updated mobile contains only number and minimum length should be 10
          if (!mobilePattern.test(updatedMobile)) {
            alert(
              "Mobile can Contain only Numbers and Minimum Length should be 10"
            );
            return;
          }

          //checking if updated email contains only email id pattern
          if (!emailPattern.test(updatedEmail)) {
            alert("Please Enter a Valid Email Id");
            return;
          }

          //checking if updated id contains number only
          if (!idPattern.test(updatedId)) {
            alert("Please Enter Valid Student ID");
            return;
          }

        //   creating new updatedStudent object with updated data 

          const updatedStudent = {
            name: updatedName,
            id: updatedId,
            email: updatedEmail,
            mobile: updatedMobile,
          };

        //   updating it with already existing data in local storage with same student id 

          let students = JSON.parse(localStorage.getItem("students")) || [];
          students = students.map((student) =>
            student.id === updatedStudent.id ? updatedStudent : student
          );
          localStorage.setItem("students", JSON.stringify(students));
          location.reload();
        });

        // event listener and function for exit button 

        exitButton.addEventListener("click", function () {
          for (input of inputs) {
            input.disabled = true;
            input.style.backgroundColor = "";
            input.style.padding = "";
            input.style.border = "";
          }

        // removing save and exit button after our data is edited 

          saveButton.remove();
          exitButton.remove();

        // re-adding edit and delete button after our data is edited

          const newEditButton = document.createElement("button");
          newEditButton.innerHTML =
            '<i class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i>';
          newEditButton.classList.add("editButton");

          const newDeleteButton = document.createElement("button");
          newDeleteButton.innerHTML =
            '<i class="fa fa-trash-o fa-lg" aria-hidden="true"></i>';
          newDeleteButton.classList.add("deleteButton");

          parent.appendChild(newDeleteButton);
          parent.appendChild(newEditButton);
        });
      }
    }

    editItem(item);

    if (item.classList[1] === "fa-pencil-square-o") {
      const parent = item.parentElement;
      editItem(parent);
    }
  }
}

// calling appendStudentDetails function so it can fetch and add all data in our table from local storage students object

appendStudentDetails();
