/////////
//  Configuracion inicial
////////
// noinspection CommaExpressionJS
const TABLENUMBER = 63796

// constantes front - busqueda
const inputIngresado = document.querySelector('#inputIngresado')
// constantes front -resultados
const resultsContainerFields = document.querySelector('#query_results_field')
const resultsContainerRows = document.querySelector('#query_results_rows')
// constantes fetch

//funciones fetch
const getAllDataFields = () => {
  axios({
    method: "GET",
    url:"https://api.baserow.io/api/database/fields/table/"+TABLENUMBER,

    headers: {
      Authorization: "Token KMZNn5Mz3sdv6kG9TywZ4nuyL0psftcP"
    }

})
    .then(response =>{
    const fields = response.data;

      document.documentElement.style.setProperty('--colNum', fields.length+1);
    fields?.map(function (fields,i){
      return (
        resultsContainerFields.appendChild(document.createElement('th')).textContent = fields.name
    )
    })

    // console.log(fields)
    })
    .catch(error => console.log(error))
};
const getAllDataRows = () => {
  axios({
    method: "GET",
    url:"https://api.baserow.io/api/database/rows/table/"+TABLENUMBER+"/?user_field_names=true",

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
          // resultsContainerRows.append(newDiv),
        Object.values(rows).map(el =>
          `<td>${el}</td>`
          // el
        ).join('')

        )
      })
      for (let i = 0; i < returnRows.length; i++) {

        resultsContainerRows.innerHTML += '<tr class="row is-hidden">'+returnRows[i]+'</tr>'
      }


    })
    .catch(error => console.log(error))
};

getAllDataFields();
getAllDataRows();

function liveSearch() {
  const rowsResultsSearch = document.querySelectorAll('.row')

  let search_query = document.getElementById("searchbox").value;
  //Use innerText if all contents are visible
  //Use textContent for including hidden elements
  inputIngresado.innerHTML = (search_query)

  for(let i = 0; i < rowsResultsSearch.length; i++){

    if(rowsResultsSearch[i].textContent.toLowerCase()
      .includes(search_query.toLowerCase())) {
      rowsResultsSearch[i].classList.remove("is-hidden");

    } else {
      rowsResultsSearch[i].classList.add("is-hidden");
    }
  }


}

//A little delay
let typingTimer;
let typeInterval = 500;
let searchInput = document.getElementById('searchbox');

searchInput.addEventListener('keyup', () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(liveSearch, typeInterval);
});

