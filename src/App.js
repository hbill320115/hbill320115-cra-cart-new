import { useReducer } from "react";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Cart from "./components/Cart";
import { CartContext , cartReducer,cartInit} from "./store";


function App() {
  const reducer = useReducer(cartReducer,cartInit) //代入store裡

  return (
    <CartContext.Provider value={reducer}>
      <Navbar></Navbar>
      <div className="container mt-4">
        <div className="row">
          {/* 左側 */}
          <div className="col-md-7">
            <Products></Products>
          </div>
          {/* 右側 */}
          <div className="col-md-5">
            <Cart></Cart>
          </div>
        </div>
      </div>
    </CartContext.Provider>
  );
}


export default App;

