window.addEventListener('DOMContentLoaded', (event) => {
  const tableRows = document.querySelectorAll('.results tbody tr');
  tableRows.forEach(row => {
    const priceCell = row.querySelector('td:nth-child(3)');
    if (priceCell.textContent.includes('(Taken)')) {
      priceCell.classList.add('price-taken');
    } else if (priceCell.textContent.includes('(Protected)')) {
      priceCell.classList.add('price-protected');
    }
  });
});

// Fetch and parse the CSV file
Papa.parse('teams.csv', {
  header: true, // Assuming the first row in the CSV file contains the column headers
  download: true,
  complete: function (results) {
    // Access the parsed CSV data
    var teamsData = results.data;
    // Use the teamsData to generate HTML elements dynamically
    // and populate your web pages with the team information

    // Retrieve the table bodies for the "Taken" and "Protected" tables
    const takenTableBody = document.querySelector('.taken-table tbody');
    const protectedTableBody = document.querySelector('.protected-table tbody');

    // Iterate over the teamsData array
    teamsData.forEach(team => {
      const position = team.Position;
      const name = team.Team;
      const price = team.Price;

      // Create table row for the team and populate the data
      const row = document.createElement('tr');
      const positionCell = document.createElement('td');
      const nameCell = document.createElement('td');
      const priceCell = document.createElement('td');

      positionCell.textContent = position;
      nameCell.textContent = name;
      priceCell.textContent = price;

      row.appendChild(positionCell);
      row.appendChild(nameCell);
      row.appendChild(priceCell);

      // Determine whether it's a "Taken" or "Protected" team
      if (price.includes('Taken')) {
        row.classList.add('price-taken');
        takenTableBody.appendChild(row);
      } else if (price.includes('Protected')) {
        row.classList.add('price-protected');
        protectedTableBody.appendChild(row);
      }
    });
  }
});
