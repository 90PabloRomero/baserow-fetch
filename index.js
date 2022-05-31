// noinspection CommaExpressionJS
/////////
//  Configuracion inicial
////////
const TABLENUMBER = 64071
// este numero corresponde al numero de tabla en baserow
/////////////////////////////////////////
const CANTIDAD_DIGITOS_TELEFONO = 10
// CANTIDAD_DIGITOS_TELEFONO sirve para determinar la cantidad de numeros que tiene un numero de telefono. este programa para funcionar necesita saber cuantos
// numeros en total son los numeros de telefono. Introducir mas numeros(o menos) hara que la busqueda por numero de telefono falle.




// constantes front - busqueda

const tipoDeBusqueda = document.getElementById("tipoDeBusqueda")


// constantes front -resultados

const resultsRowBox = document.querySelector('#boxSearchResultsQuery')

// constantes fetch

//funciones fetch
const getAllDataRows = () => {
  axios({
    method: "GET",
    url:"https://api.baserow.io/api/database/rows/table/"+TABLENUMBER+"/?user_field_names=true&include=Celular,Detalle,Estado,Costo,FechaULT,HoraULT,ClientePuedeRetirar,Orden",

    headers: {
      Authorization: "Token KMZNn5Mz3sdv6kG9TywZ4nuyL0psftcP"
    }
  })
    .then(response =>{
      const rows = response.data.results;
      const losValuesDeRow = Object.values(rows)
      const returnRows = losValuesDeRow?.map(function (rows,i){
        delete(rows.order)
        return(
          Object.values(rows).map((el, index) =>
            `<div class="">${el}</div>`
          ).join('')

        )

      })
      for (let i = 0; i < returnRows.length; i++) {

        resultsRowBox.innerHTML += '<div class="result is-hidden">'+returnRows[i]+'</div>'
      }


    })
    .catch(error => console.log(error))
};

getAllDataRows();




function searchAllRowsByPhone() {
  const rowsResultsSearch = document.querySelectorAll('.result')
  const noResultsDiv = document.querySelectorAll('.no-results')
  let search_query = document.getElementById("searchboxAllRows").value;

  let search_query_RegExp = new RegExp(search_query)
  let search_query_ready = search_query_RegExp.toString().replace(/\//g, '')

  for(let i = 0; i < rowsResultsSearch.length; i++){
    if(rowsResultsSearch[i].textContent.toLowerCase().match(search_query_ready))
    {
      const valorEncontrado = rowsResultsSearch[i].textContent.slice(1, CANTIDAD_DIGITOS_TELEFONO)
      if(valorEncontrado.toString().length === search_query_ready.length){
        rowsResultsSearch[i].classList.remove("is-hidden");
        noResultsDiv[i].classList.add("is-hidden");
      }else {
        rowsResultsSearch[i].classList.add("is-hidden")
        noResultsDiv.classList.remove("is-hidden");
      }
    } else {
      rowsResultsSearch[i].classList.add("is-hidden")
      noResultsDiv[i].classList.add("is-hidden");
    }
  }
}

function searchAllRowsByOrderNum() {

  const rowsResultsSearch = document.querySelectorAll('.result')
  const noResultsDiv = document.querySelectorAll('.no-results')
  let search_query = document.getElementById("searchboxAllRows").value;

  let search_query_RegExp = new RegExp(search_query)
  let search_query_ready = search_query_RegExp.toString().replace(/\//g, '')

  for(let i = 0; i < rowsResultsSearch.length; i++){
  console.log(rowsResultsSearch[i].childNodes[8].textContent)
    //console.log(i+1 === Number(search_query))
    if(rowsResultsSearch[i].childNodes[1].textContent === search_query.toString())
    {
      if(rowsResultsSearch[i].childNodes[1].textContent.length === search_query.length){
        rowsResultsSearch[i].classList.remove("is-hidden");
        noResultsDiv[i].classList.add("is-hidden");
        rowsResultsSearch[i].childNodes[8].textContent === "true" ? rowsResultsSearch[i].classList.add("") : rowsResultsSearch[i].classList.add("NOT-READY")
      }else {
        rowsResultsSearch[i].classList.add("is-hidden")
        noResultsDiv[i].classList.remove("is-hidden");
      }
    } else {
      rowsResultsSearch[i].classList.add("is-hidden")
      noResultsDiv[i].classList.add("is-hidden");
    }
  }
}

//A little delay
let typingTimer;
let typeInterval = 500;
let searchInput = document.getElementById('searchboxAllRows');

document.addEventListener('DOMContentLoaded', function(event) {
  const btn = document.getElementById('searchButton');
  btn.addEventListener('click', event => {
    if (searchInput.value.length > 4) {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(searchAllRowsByPhone, typeInterval);
      tipoDeBusqueda.innerHTML = 'Numero de telefono'
    } else {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(searchAllRowsByOrderNum, typeInterval);
      tipoDeBusqueda.innerHTML = 'Numero de orden'
    }
  })
});