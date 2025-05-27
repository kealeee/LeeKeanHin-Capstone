
import './App.css'

function StockFormTitle() {
  return (
    <h1 className="stock-title">
      Finance Dashboard 📈 
    </h1>
  );
}


function StockCode(){
  return <input type="text" placeholder="Stock Symbol, e.g. AAPL" className="input-field"/>;
}

function StockQuantity(){
  return <input type="number" placeholder="Purchase Quantity" className="input-field"/>;
}

function StockBuyPrice(){
  return <input type="number" placeholder="Purchase Price in USD" className="input-field"/>;
}

function AddStockButton(){
  return <button className='add-stock-btn'>Add Stock</button>;
}

function StockList() {
  return (
    <>
      <h2 className="stock-list-title">
        Stock List 📊 
      </h2>
      <p> No stocks added yet.</p>
    </>
  );
}


function StockFormSection() {
  return (
    <div className="stock-form-section">
      <StockFormTitle />
      <div className="stock-form-fields">
        <StockCode />
        <StockQuantity />
        <StockBuyPrice />
        <AddStockButton />
      </div>
      <StockList />
    </div>
  );
}


function App() {
  return (
  <div>
        <StockFormSection />
  </div>
  );

}

export default App
