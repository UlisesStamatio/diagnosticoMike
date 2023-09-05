window.onload = function create() {
    fetch('https://reqres.in/api/users?page=2')
        .then(response => response.json())
        .then(data => build(data.data));
}

function build(data) {
    data.forEach(element => {
        document.getElementById("cuerpo").innerHTML +=
            `
             <tr>
                <th scope="row">${element.id}</th>
                <td><img src="${element.avatar}" alt=""></td>
                <td>${element.first_name}</td>
                <td>${element.last_name}</td>
                <td>${element.email}</td>
                <td>
                <button class="btn btn-primary" onclick="abrirModal(${element.id},'${element.first_name}','${element.last_name}')">Modificar</button>
                <button class="btn btn-danger" onclick="eliminar(${element.id})">Eliminar</button>
                </td>
              </tr>
        `

    });
}

function enviar() {
    const name = document.getElementById("name").value;
    const job = document.getElementById("job").value;
    const obj = {
        "name": name,
        "job": job
    }
    fetch('https://reqres.in/api/users', { method: "POST", body: obj })
        .then(response => response.json())
        .then(data => toast())

    $('#exampleModal').modal('hide')
    document.getElementById("name").value = "";
    document.getElementById("job").value = "";

}


function abrirModal(id, name, job) {
    $('#exampleModal2').modal('show')
    document.getElementById("idMod").value = id;
    document.getElementById("nameModify").value = name;
    document.getElementById("jobModify").value = job;
}


function modificar() {
    const id = document.getElementById("idMod").value
    const name = document.getElementById("nameModify").value;
    const job = document.getElementById("jobModify").value;
    const obj = {
        "name": name,
        "job": job
    }
    fetch(`https://reqres.in/api/users/${id}`, { method: "PUT", body: obj })
        .then(response => response.json())
        .then(data => toast())

    $('#exampleModal2').modal('hide')
}

function eliminar(id) {
    fetch(`https://reqres.in/api/users/${id}`, { method: "DELETE" })
        .then(response => toast())
}

function toast() {
    const toastLiveExample = document.getElementById('liveToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastBootstrap.show()

}