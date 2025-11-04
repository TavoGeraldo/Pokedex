document.getElementById("btn-registrar").addEventListener("click", () => {
  const nombre = document.getElementById("nombre").value;

  if (nombre === "") {
    alert("Por favor ingresa tu nombre");
    return;
  }

  document.getElementById("registro").style.display = "none";
  document.getElementById("principal").style.display = "block";
  document.getElementById("saludo").textContent = "¡Bienvenido " + nombre + "!";
});


function getPokeData() {
  const nombre = document.getElementById("poke_search").value.toLowerCase();

  fetch("https://pokeapi.co/api/v2/pokemon/" + nombre)
    .then(res => res.json())
    .then(data => {
      document.getElementById("poke_data").innerHTML =
        "<img src='" + data.sprites.front_default + "'>";
      document.getElementById("poke_name").textContent = data.name;
    })
    .catch(err => {
      document.getElementById("poke_data").innerHTML = "";
      document.getElementById("poke_name").textContent =
        "No se encontró el Pokémon";
    });
}

