var pg = 1;

var num = (document.getElementById("pg").innerText = pg);

function getdata(pg) {
  fetch(`https://still-island-58313.herokuapp.com/users?page=${pg}`)
    .then((res) => res.json())
    .then((res) => mapping(res.data));
}
getdata(1);
function mapping(data) {
  document.querySelector("#body").innerHTML = "";
  data.map((el, i) => {
    var row = document.createElement("tr");
    row.setAttribute("id", "row");

    var data1 = document.createElement("td");
    data1.innerText = i + 1;

    var data2 = document.createElement("td");
    data2.innerText = el.name;

    var data3 = document.createElement("td");
    data3.innerText = el.email;

    var data4 = document.createElement("td");
    data4.innerText = el.mobile;

    var data5 = document.createElement("td");
    data5.innerText = el.password;

    row.append(data1, data2, data3, data4, data5);

    document.querySelector("#body").append(row);
  });
}

document.getElementById("prev").addEventListener("click", () => {
  pg--;

  if (pg >= 1) {
    document.getElementById("pg").innerText = pg;
    getdata(pg);
  }
});

document.getElementById("next").addEventListener("click", () => {
  pg++;

  if (pg >= 1) {
    document.getElementById("pg").innerText = pg;
    getdata(pg);
  }
});
