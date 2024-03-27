import { getDetails } from './detailsSection.js';
import { getChartData } from './chartSection.js';
import { setChartTitle } from './chartTitle.js';

const stocks = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'PYPL', 'TSLA', 'JPM', 'NVDA', 'NFLX', 'DIS'];
const listSection = document.querySelector('.listSection');
const currentStockInfo = document.querySelector('.currentStockInfo');

export let selectedStock = 'AAPL';

// Function to fetch data and populate the list section
async function populateListSection() {
    try {
        const response = await fetch(`https://stocks3.onrender.com/api/stocks/getstockstatsdata`);
        const stocksData = await response.json();

        stocks.forEach(stock => {
            const stockData = stocksData.stocksStatsData[0][stock];
            const bookValue = stockData.bookValue.toFixed(3);
            const profit = stockData.profit.toFixed(2);

            const innerDiv = document.createElement('div');
            innerDiv.style.display = 'flex';
            innerDiv.style.flexDirection = 'row';

            const button = document.createElement('button');
            button.style.backgroundColor = '#012169';
            button.style.width = '60px';
            button.style.height = '30px';
            button.textContent = stock;
            button.style.color = 'white';
            button.style.marginTop = '10px';
            button.style.fontFamily='Times New Roman'

            if(stock === 'AAPL') {
                setChartTitle(selectedStock, stockData.profit, stockData.bookValue);
            }

            button.addEventListener('click', function(){
                selectedStock = stock;
                setChartTitle(selectedStock, stockData.profit, stockData.bookValue);
                getDetails();
                getChartData();
            });

            const par1 = document.createElement('p');
            par1.textContent = '$' + bookValue;
            par1.style.color = 'white';
            par1.style.marginLeft = '20px';

            const par2 = document.createElement('p');
            par2.textContent = profit + '%';
            par2.style.color = profit <= 0 ? 'red' : 'lightgreen';
            par2.style.marginLeft = '20px';

            innerDiv.appendChild(button);
            innerDiv.appendChild(par1);
            innerDiv.appendChild(par2);

            listSection.appendChild(innerDiv);
        });
        //For the first load
        getDetails();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Initial call to populate the list section
populateListSection();
