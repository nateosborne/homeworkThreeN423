function initListeners() {
  $("#submit").on("click", (e) => {
    e.preventDefault();
    let fn = $("#firstName").val();
    let ln = $("#lastName").val();
    let cs = $("#classes").val();
    let ag = $("#age").val();
    let ph = $("#phone").val();

    let newArrClass = cs.split(",");
    let finalClassArray = [];

    let userObj = {
      fName: fn,
      lName: ln,
      age: ag,
      phone: ph,
      classes: [],
    };

    $.each(newArrClass, (idx, newClass) => {
      if (newClass != "") {
        let cl = {
          className: newClass.trim(),
        };
        finalClassArray.push(cl);
      }
    });

    userObj.classes = finalClassArray;

    console.log(userObj);

    $("#firstName").val("");
    $("#lastName").val("");
    $("#age").val("");
    $("#phone").val("");
    $("#classes").val();

    addUser(userObj);
  });

  $("#getUsers").on("click", (e) => {
    getAllUsers();
  });
}

function addUser(user) {
  let allUsers = JSON.parse(localStorage.getItem("Classes"));
  allUsers.push(user);

  localStorage.setItem("Classes", JSON.stringify(allUsers));
}

function getAllUsers() {
  $("#userList").html("");
  let allUsers = JSON.parse(localStorage.getItem("Classes"));
  let userString = "";

  $.each(allUsers, (idx, user) => {
    userString += `<p>`;
    userString += `<strong>Name:</strong> ${user.fName} ${user.lName}<br> <strong>Age:</strong> ${user.age}<br> <strong>Phone:</strong> ${user.phone} <br><strong>Classes:</strong> `;
    $.each(user.classes, (idx, cls) => {
      userString += `<span> ${cls.className}</span>`;
    });
    userString += `</p>`;
  });

  console.log(userString);
  $("#userList").html(userString);

  console.log(localStorage.getItem("Classes"));
}

function connectToStorage() {
  if (localStorage) {
    console.log("Storage detected");
    let classes = localStorage.getItem("Classes");

    if (classes) {
      console.log("Already exists", classes);
    } else {
      localStorage.setItem("Classes", "[]");
    }
  } else {
    console.log("No storage detected");
  }
}

$(document).ready(function () {
  initListeners();
  connectToStorage();
});
