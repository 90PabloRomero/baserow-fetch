/////////
//  Configuracion inicial
////////
// noinspection CommaExpressionJS
const TABLENUMBER = 64071

// constantes front - busqueda
const inputIngresado = document.querySelector('#inputIngresado')
const searchButton = document.querySelectorAll('.searchButton')

// constantes front -resultados
const resultsContainerFields = document.querySelector('#query_results_field')
const resultsContainerRows = document.querySelector('#query_results_rows')
const resultsContainerSingleRow = document.querySelector('#single_query_result')
const resultsRowBox = document.querySelector('#boxSearchResultsQuery')
const rowsResultsSearch = document.querySelectorAll('.result')

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
// boxSearchResultsQuery
const getAllDataRows = () => {
  axios({
    method: "GET",
    url:"https://api.baserow.io/api/database/rows/table/"+TABLENUMBER+"/?user_field_names=true&include=Celular,Detalle,Estado,Costo,FechaULT,HoraULT,ClientePuedeRetirar",

    headers: {
      Authorization: "Token KMZNn5Mz3sdv6kG9TywZ4nuyL0psftcP"
    }
  })
    .then(response =>{
      const rows = response.data.results;
      const losValuesDeRow = Object.values(rows)
      const returnRows = losValuesDeRow?.map(function (rows,i){
        delete(rows.order)
          // .slice(1,1)
        return(
          // resultsContainerRows.append(newDiv),
        Object.values(rows).map((el, index) =>
            // `<td>${el}</td>`
            // `<div class=${Object.values(rows) === "true" ? "HOLA" : ""}>${el}</div>`
           `<div class="">${el}</div>`
          // elg
        ).join('')

        )

      })
      for (let i = 0; i < returnRows.length; i++) {

        resultsRowBox.innerHTML += '<div class="result is-hidden">'+returnRows[i]+'</div>'
        // resultsContainerRows.innerHTML += '<tr class="row is-hidden">'+returnRows[i]+'</tr>'
      }


    })
    .catch(error => console.log(error))
};

// getAllDataFields();
getAllDataRows();
// field_377849 celular
// const getSingleRowData = () => {
//   axios({
//     method: "GET",
//     url:"https://api.baserow.io/api/database/rows/table/"+TABLENUMBER+"/"+ROWID+"/?user_field_names=true",
//
//     headers: {
//       Authorization: "Token KMZNn5Mz3sdv6kG9TywZ4nuyL0psftcP"
//     }
//   })
//     .then(response =>{
//       const rows = response.data.results;
//       const losValuesDeRow = Object.values(rows)
//       const returnRows = losValuesDeRow?.map(function (rows,i){
//         delete(rows.order)
//         return(
//           // resultsContainerRows.append(newDiv),
//           Object.values(rows).map(el =>
//               `<td>${el}</td>`
//             // el
//           ).join('')
//
//         )
//       })
//       for (let i = 0; i < returnRows.length; i++) {
//
//         resultsContainerRows.innerHTML += '<tr class="row is-hidden">'+returnRows[i]+'</tr>'
//       }
//
//
//     })
//     .catch(error => console.log(error))
// };


function liveSearchAllRows() {
  const rowsResultsSearch = document.querySelectorAll('.result')

  let search_query = document.getElementById("searchboxAllRows").value;
  let search_query_RegExp = new RegExp(search_query)
  let search_query_ready = search_query_RegExp.toString().replace(/\//g, '')
  //Use innerText if all contents are visible
  //Use textContent for including hidden elements
  // inputIngresado.innerHTML = (search_query)

  const excludeDates = "/"
//  rowsResultsSearch[i].textContent.toLowerCase().includes(search_query.toLowerCase())

  // for(let i = 0; i < rowsResultsSearch.length; i++){
  //   if
  //   (
  //     rowsResultsSearch[i].textContent.toLowerCase().includes(search_query.toLowerCase())
  //     && !isNaN(search_query)
  //     && !search_query.includes(excludeDates)
  //     && search_query.length >= 2
  //   ) {
  //     rowsResultsSearch[i].classList.remove("is-hidden");
  //   } else {
  //     rowsResultsSearch[i].classList.add("is-hidden");
  //     }
  //   }

  console.log(search_query_ready.length)

  for(let i = 0; i < rowsResultsSearch.length; i++){
    if(rowsResultsSearch[i].textContent.toLowerCase().match(search_query_ready)
//    && rowsResultsSearch[i].textContent.toLowerCase().length === search_query_ready.length
    )
    {
      console.log("HAY UN MATCH Y ES" + (rowsResultsSearch[i].textContent.toLowerCase().match(search_query_ready)))
      const valorEncontrado = rowsResultsSearch[i].textContent.slice(1, 10)

      console.log('el indice Nª ' + i + ' es true!!');
      const resultado = rowsResultsSearch[i].textContent.slice(1, 10).match(search_query_RegExp)

      //const resultadoIncludes = rowsResultsSearch[i].textContent.toLowerCase().includes(search_query_ready)
      console.log("el largo de la variable RESULTADO " + resultado.length);
      console.log("el largo de la BUSQUEDA ES " + search_query_ready.length);
      console.log("VALOR ENCONTRADO ES " +valorEncontrado)
      console.log("el valor de RESULTADO " + resultado)

      console.log("la busqueda y el resultado son encontrados?" + (resultado.toString().length === search_query_ready.length))

      console.log("esto es un numero? " + resultado.toString().length)
      console.log(search_query_ready.length + ' y esto es un string?')
        if(valorEncontrado.toString().length === search_query_ready.length){
          rowsResultsSearch[i].classList.remove("is-hidden");
          console.log('esto se da cuando el ' + i +' es igual a rowResultSearch')
        }else {
          rowsResultsSearch[i].classList.add("is-hidden")
          console.log('el indice '+ i + " es false!!!"
            // + rowsResultsSearch[i].textContent.toLowerCase().match(search_query_RegExp).length + ' ' + search_query_ready.length
          )
        }
    } else {
      rowsResultsSearch[i].classList.add("is-hidden")
      console.log('el indice '+ i + " es false!!!"
       // + rowsResultsSearch[i].textContent.toLowerCase().match(search_query_RegExp).length + ' ' + search_query_ready.length
      )
    }
  }



  }

// function searchARow(){
//   const rowsResultsSearch = document.querySelectorAll('.row')
//   let search_query = document.getElementById("searchboxAllRows").value;
// }



//A little delay
let typingTimer;
let typeInterval = 500;
let searchInput = document.getElementById('searchboxAllRows');


document.addEventListener('DOMContentLoaded', function(event) {
  const btn = document.getElementById('searchButton');
  btn.addEventListener('click', event => {
    // inputIngresado.innerHTML = ("")
    if (searchInput.value.length > 2) {

      clearTimeout(typingTimer);
      typingTimer = setTimeout(liveSearchAllRows, typeInterval);
    } else {
      console.log(" ")
    }
  })
});


// searchButton.addEventListener('click', () => {
  // inputIngresado.innerHTML = ("")
  // if (searchInput.value.length > 2) {
  //
  // clearTimeout(typingTimer);
  // typingTimer = setTimeout(liveSearchAllRows, typeInterval);
  // } else {
  //   console.log(" ")
  // }
// });

