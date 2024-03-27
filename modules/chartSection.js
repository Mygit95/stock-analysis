import {selectedStock} from './listSection.js'

let periodValue = '5y';

export function getChartData() {
  const stocksDataRequest = fetch(`https://stocks3.onrender.com/api/stocks/getstocksdata`);

  stocksDataRequest.then((response) => {
    return response.json();
  }).then((data) => {
    const response = data;
    const stockData = response.stocksData[0];

    for (const stock in stockData) {

      if (stock === selectedStock) {

          const list = stockData[stock];

          for(const key in list) {

            if(periodValue === key) {
              createChart(list[key], selectedStock);
              break;
            }

          }
          break;
      }
    }
  });
}


    // Extract data
    let stockChart;

    function createChart(data, name) {
        const ctx = document.getElementById('stockChart').getContext('2d');
        if (stockChart) {
            stockChart.destroy();
        }
        stockChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.timeStamp.map(timestamp => new Date(timestamp * 1000)),
                datasets: [{
                    label: name,
                    data: data.value,
                    borderColor: 'blue',
                    backgroundColor: 'rgba(0, 0, 255, 0.1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        display: false
                    }],
                    yAxes: [{
                        display: false
                    }]
                },
                legend: {
                    display: false
                }
            }
        });
    }
    
    const oneMonth = getButton('btn1Month');
    oneMonth.addEventListener('click', function() {
        setButtonColor();
        oneMonth.style.backgroundColor = 'green';
        periodValue = '1mo';
        getChartData();
    });

    const threeMonth = getButton('btn3Month');
    threeMonth.addEventListener('click', function() {
        setButtonColor();
        threeMonth.style.backgroundColor = 'green';
        periodValue = '3mo';
        getChartData();
    });

    const oneYear = getButton('btn1Year');
    oneYear.addEventListener('click', function() {
        setButtonColor();
        oneYear.style.backgroundColor = 'green';
        periodValue = '1y';
        getChartData();
    });

    const fiveYear = document.getElementById('btn5Year');
    fiveYear.addEventListener('click', function() {
        setButtonColor();
        fiveYear.style.backgroundColor = 'green';
        periodValue = '5y';
        getChartData();
    });

    function getButton(idName) {
      return document.getElementById(idName);
    }

    function setButtonColor() {
      const buttons = document.querySelectorAll('button');
                
      buttons.forEach((item) => {
          item.style.backgroundColor = '#012169';
      });
    }

    getChartData();