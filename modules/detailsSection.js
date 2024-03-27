// Function to fetch details and display in the details section
import {selectedStock} from './listSection.js'

export function getDetails() {
  const detailsRequest = fetch(`https://stocks3.onrender.com/api/stocks/getstocksprofiledata`);
  const detailsSection = document.querySelector('.detailsSection');
  detailsSection.innerHTML = '';

  detailsRequest.then((response) => {
      return response.json();
  }).then((data) => {
      const list = data.stocksProfileData;
      const stocksData = list[0];

      for (const key in stocksData) {
          if (key === selectedStock) {
              const summary = document.createElement('p');
              summary.textContent = stocksData[key].summary;
              summary.style.color = 'white';
              detailsSection.appendChild(summary);
          }
      }
  }).catch((error) => {
      console.log(error);
  });
}
