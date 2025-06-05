
import { useEffect, useState } from 'react';
import './App.css'


function StockFormTitle() {
  return (
    <h1 className="stock-title">
      Finance Dashboard 📈 
    </h1>
  );
}


function StockCode({symbol, setSymbol}){
  return (
    <input 
      type="text" 
      placeholder="Stock Symbol, e.g. AAPL" 
      className="input-field"
      value={symbol}
      onChange={(event) => setSymbol(event.target.value.toUpperCase())}
    />
  );
}

function StockQuantity({quantity, setQuantity}){
  return (
    <input 
      type="number" 
      placeholder="Purchase Quantity" 
      className="input-field"
      value={quantity}
      onChange={(event) => setQuantity(Number(event.target.value))}
    />
  );
}

function StockBuyPrice({purchasePrice, setPurchasePrice}){
    return (
    <input 
      type="number" 
      placeholder="Purchase Price in USD" 
      className="input-field"
      value={purchasePrice}
      onChange={(event) => setPurchasePrice(Number(event.target.value))}
    />
  );

}

function AddStockButton({onAddStock}){
  return <button className='add-stock-btn' onClick={onAddStock}>Add Stock</button>;
}

function StockList({ stockList }) {
  return (
    <>
      <h2 className="stock-list-title">Stock List 📊</h2>
      {stockList.length === 0 ? (
        <p>No stocks added yet.</p>
      ) : (
        <ul>
          {stockList.map((stock, index) => (
            <li key={index}>
              <span style={{ fontWeight: 'bold' }}>Symbol: {stock.symbol}</span><br />
              Quantity: {stock.quantity}<br />
              Purchase Price: ${stock.purchasePrice}<br />
              Current Price: ${stock.currentPrice.toFixed(2)}<br />
              <span style={{ color: stock.profitLoss >= 0 ? 'green' : 'red', fontWeight: 'bold' }}>
                Profit/Loss: {stock.profitLoss >= 0 ? '+' : '-'}${Math.abs(stock.profitLoss).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function addStock() {
  console.log('Adding stock:', { symbol, quantity, purchasePrice });
  if (!symbol || !quantity || !purchasePrice) {
    console.log('Missing fields');
    return;
  }
  setStockList([...stockList, { symbol, quantity, purchasePrice }]);
  setSymbol("");
  setQuantity("");
  setPurchasePrice("");
}

function StockFormSection({ stockList, setStockList }) {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!triggerFetch || !symbol) return;

    setIsLoading(true);
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=HA3IS3PZYRGXGVVG`)
      .then((response) => response.json())
      .then((data) => {
        if (!data['Global Quote'] || !data['Global Quote']['05. price']) {
          throw new Error('Invalid stock symbol');
        }
        const currentPrice = parseFloat(data['Global Quote']['05. price']);
        const profitLoss = (currentPrice - purchasePrice) * quantity;
        setStockList([
          ...stockList,
          { symbol, quantity, purchasePrice, currentPrice, profitLoss }
        ]);
        setSymbol("");
        setQuantity("");
        setPurchasePrice("");
      })
      .catch((error) => {
        alert('Failed to fetch data. Please check the stock symbol.');
        console.error(error);
      })
      .finally(() => {
        setTriggerFetch(false);
        setIsLoading(false);
      });
  }, [triggerFetch, symbol, quantity, purchasePrice, stockList]);

  function addStock() {
    if (!symbol || !quantity || !purchasePrice) {
      alert('Please fill all fields');
      return;
    }
    setTriggerFetch(true); // Trigger API fetch
  }

  return (
    <div className="stock-form-section">
      <StockFormTitle />
      <div className="stock-form-fields">
        <StockCode symbol={symbol} setSymbol={setSymbol} />
        <StockQuantity quantity={quantity} setQuantity={setQuantity} />
        <StockBuyPrice purchasePrice={purchasePrice} setPurchasePrice={setPurchasePrice} />
        <AddStockButton onAddStock={addStock} />
      </div>
      {isLoading && <p className="loading-text">Loading...</p>}
    </div>
  );
}



function App() {
  const [stockList, setStockList] = useState([]);

  return (
    <div>
      <StockFormSection stockList={stockList} setStockList={setStockList} />
      <StockList stockList={stockList} />
    </div>
  );
}

export default App
