const currentStockInfo = document.querySelector('.currentStockInfo');

export function setChartTitle(name, profit, value) {
  currentStockInfo.innerHTML = '';
  const stockName = document.createElement('h2');
  stockName.className = 'stockName';
  stockName.textContent = name;
  stockName.style.marginLeft = '20px';

  const stockProfit = document.createElement('h2');
  stockProfit.className = 'stockProfit';
  stockProfit.textContent = profit + '%';
  stockProfit.style.marginLeft = '20px';
  profit <= 0 ? stockProfit.style.color='red':stockProfit.style.color='green';

  const stockValue = document.createElement('h2');
  stockValue.className = 'stockValue';
  stockValue.textContent = '$' + value;
  stockValue.style.marginLeft = '20px';

  currentStockInfo.appendChild(stockName);
  currentStockInfo.appendChild(stockProfit);
  currentStockInfo.appendChild(stockValue);  
}
