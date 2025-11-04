document.getElementById("btn-registrar").addEventListener("click", () => {
    const inputNombre = document.getElementById("nombre");
    const inputEmail = document.getElementById("email");
    const inputFecha = document.getElementById("fecha");

    const nombre = inputNombre.value;
    const email = inputEmail.value;
    const fecha = inputFecha.value;

    let valido = true;

    if (nombre.length < 3) {
        inputNombre.style.border = "2px solid red";
        valido = false;
    } else {
        inputNombre.style.border = "2px solid green";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        inputEmail.style.border = "2px solid red";
        valido = false;
    } else {
        inputEmail.style.border = "2px solid green";
    }

    if (fecha === "") {
        inputFecha.style.border = "2px solid red";
        valido = false;
    } else {
        inputFecha.style.border = "2px solid green";
    }

    if (!valido) {
        return;
    }

    const entrenador = {
        id: Date.now(),
        trainerName: nombre,
        email: email,
        startDate: fecha,
        equipo: []
    };

    localStorage.setItem("entrenador", JSON.stringify(entrenador));

    document.getElementById("registro").style.display = "none";
    document.getElementById("principal").style.display = "block";
    document.getElementById("saludo").textContent = "¡Bienvenido " + nombre + "!";
    mostrarEquipo();
});

function getPokeData() {
    const nombre = document.getElementById("poke_search").value.toLowerCase();

    fetch("https://pokeapi.co/api/v2/pokemon/" + nombre)
        .then(res => res.json())
        .then(data => {
            document.getElementById("poke_data").innerHTML =
                "<h3>" + data.name + "</h3>" +
                "<img src='" + data.sprites.front_default + "'>" +
                "<button id='btn-add'>Añadir al equipo</button>";

            document.getElementById("btn-add").addEventListener("click", function() {
                let entrenador = JSON.parse(localStorage.getItem("entrenador"));
                const existe = entrenador.equipo.some(function(p) {
                    return p.id === data.id;
                });
                if (existe) {
                    return;
                }

                const pokemon = {
                    id: data.id,
                    nombre: data.name,
                    sprite: data.sprites.front_default
                };

                entrenador.equipo.push(pokemon);
                localStorage.setItem("entrenador", JSON.stringify(entrenador));
                mostrarEquipo();
            });
        })
        .catch(function() {
            document.getElementById("poke_data").innerHTML = "No se encontró el Pokémon";
        });
}

function mostrarEquipo() {
    const entrenador = JSON.parse(localStorage.getItem("entrenador"));
    const lista = document.getElementById("equipo");

    if (entrenador.equipo.length === 0) {
        lista.innerHTML = "<p>No tienes Pokémon en tu equipo aún.</p>";
        return;
    }

    let contenido = "";
    for (let i = 0; i < entrenador.equipo.length; i++) {
        const poke = entrenador.equipo[i];
        contenido +=
            "<div class='pokemon-item'>" +
            "<img src='" + poke.sprite + "' width='60'>" +
            "<p>" + poke.nombre + "</p>" +
            "<button onclick='liberarPokemon(" + poke.id + ")'>Liberar</button>" +
            "</div>";
    }

    lista.innerHTML = contenido;
}

function liberarPokemon(idPokemon) {
    const entrenador = JSON.parse(localStorage.getItem("entrenador"));
    entrenador.equipo = entrenador.equipo.filter(function(p) {
        return p.id !== idPokemon;
    });
    localStorage.setItem("entrenador", JSON.stringify(entrenador));
    mostrarEquipo();
}
