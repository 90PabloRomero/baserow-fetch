/////////
//  Configuracion inicial
////////
// noinspection CommaExpressionJS

const TABLENUMBER = 63796

// dom manipulation
const newDiv = document.createElement('div');



// constantes front - busqueda
const searchForm = document.querySelector("form")
const searchInput = searchForm.querySelector("input");
const searchText = searchInput.value
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

    fields?.map(function (fields,i){
      return (
        resultsContainerFields.appendChild(document.createElement('div')).textContent = fields.name
    )})

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
        return(Object.values(rows).map(el => `<div>${el}</div>`).join(" "))
      })
      console.log(returnRows)
      returnRows.map((elem) => newDiv.innerHTML += elem)
      resultsContainerRows.append(newDiv)
    })
    .catch(error => console.log(error))
};

getAllDataFields();
getAllDataRows();