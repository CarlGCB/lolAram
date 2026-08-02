// Quita acentos y pasa a minúsculas, para que "mis" encuentre "Miss" y "jinx" encuentre "Jinx"
function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Envuelve en <mark> la parte del texto que coincide con la búsqueda
function resaltarCoincidencia(texto, consulta) {
  if (!consulta) return texto;
  const idx = normalizar(texto).indexOf(normalizar(consulta));
  if (idx === -1) return texto;
  const antes = texto.slice(0, idx);
  const coincide = texto.slice(idx, idx + consulta.length);
  const despues = texto.slice(idx + consulta.length);
  return `${antes}<mark>${coincide}</mark>${despues}`;
}

function crearTarjeta(item, consulta, delayMs) {
  const card = document.createElement("article");
  card.className = "card";
  card.style.animationDelay = `${delayMs}ms`;

  const label = document.createElement("h2");
  label.className = "card-label";
  label.innerHTML = resaltarCoincidencia(item.text, consulta);

  const imgWrap = document.createElement("div");
  imgWrap.className = "card-image-wrap";

  const img = document.createElement("img");
  img.src = item.file;
  img.alt = item.text;
  img.loading = "lazy";
  img.onerror = () => card.classList.add("is-broken");

  imgWrap.appendChild(img);
  card.appendChild(label);
  card.appendChild(imgWrap);
  return card;
}

function iniciarGaleria(items) {
  const grid = document.getElementById("grid");
  const buscador = document.getElementById("buscador");
  const contador = document.getElementById("contador");
  const estadoVacio = document.getElementById("estado-vacio");
  const consultaVacia = document.getElementById("consulta-vacia");

  function render(consultaCruda) {
    const consulta = consultaCruda.trim();
    const consultaNorm = normalizar(consulta);

    const coincidencias = items.filter((item) =>
      normalizar(item.text).includes(consultaNorm)
    );

    grid.innerHTML = "";
    coincidencias.forEach((item, i) => {
      grid.appendChild(crearTarjeta(item, consulta, i * 25));
    });

    contador.textContent = consulta
      ? `${coincidencias.length} de ${items.length}`
      : `${items.length} ${items.length === 1 ? "imagen" : "imágenes"}`;

    const sinResultados = coincidencias.length === 0;
    estadoVacio.hidden = !sinResultados;
    grid.hidden = sinResultados;
    if (sinResultados) consultaVacia.textContent = consulta;
  }

  buscador.addEventListener("input", (e) => render(e.target.value));
  render("");
}

document.addEventListener("DOMContentLoaded", () => {
  iniciarGaleria(typeof GALLERY_ITEMS !== "undefined" ? GALLERY_ITEMS : []);
});
