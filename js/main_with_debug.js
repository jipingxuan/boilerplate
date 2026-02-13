/* script by Linzheng Yu*/

var cityPop = [
  { city: 'Madison', population: 233209 },
  { city: 'Milwaukee', population: 594833 },
  { city: 'Green Bay', population: 104057 },
  { city: 'Superior', population: 27244 }
];

// run after page loads
document.addEventListener('DOMContentLoaded', function () {
  cities();            // build base table
  addColumns(cityPop); // add city size
  addEvents();         // hover click
  debugAjax();         // load GeoJSON
});

function cities() {
  // create and insert table
  var table = document.createElement('table');

  var headerRow = document.createElement('tr');
  headerRow.insertAdjacentHTML('beforeend', '<th>City</th><th>Population</th>');
  table.appendChild(headerRow);

  cityPop.forEach(function (d) {
    table.insertAdjacentHTML(
      'beforeend',
      '<tr><td>' + d.city + '</td><td>' + d.population + '</td></tr>'
    );
  });

  document.querySelector('#myDiv').appendChild(table);
}

function addColumns(cityPop) {
  // add city size to each row
  document.querySelectorAll('tr').forEach(function (row, i) {
    if (i === 0) {
      row.insertAdjacentHTML('beforeend', '<th>City Size</th>');
    } else {
      var pop = cityPop[i - 1].population;
      var citySize = pop < 100000 ? 'Small' : pop <500000 ? 'Medium' : 'Large';
      row.insertAdjacentHTML('beforeend', '<td>' + citySize + '</td>');
    }
  });
}

function addEvents() {
  var table = document.querySelector('table');
  if (!table) return;

  table.addEventListener('mouseover', function () {
    // random background color
    var color =
      'rgb(' +
      Math.round(Math.random() * 255) + ',' +
      Math.round(Math.random() * 255) + ',' +
      Math.round(Math.random() * 255) + ')';

    table.style.backgroundColor = color;
  });

  table.addEventListener('click', function () {
    alert('Hey, you clicked me!');
  });
}

// Week 4: Web Data and Debugging 2 (AJAX)

function debugCallback(myData) {
  // write data to page
  document.querySelector('#myDiv').insertAdjacentHTML(
    'beforeend',
    '<br>GeoJSON data:<br>' + JSON.stringify(myData)
  );
}

function debugAjax() {
  // fetch GeoJSON file
  fetch('data/MegaCities.geojson')
    .then(function (response) {
      // parse JSON
      return response.json();
    })
    .then(function (json) {
      // send to callback
      debugCallback(json);
    })
    .catch(function (err) {
      console.error('GeoJSON load error:', err);
    });
}