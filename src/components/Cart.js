import { useContext } from "react";
import { CartContext } from "../store";

export default function Cart() {
  const [state, dispatch] = useContext(CartContext);

  return (
    <div className="bg-light p-3">
      {/* {JSON.stringify(state.cartList)} //此段拿來檢查是否有正確傳入JSON*/}
      <table className="table align-middle bg-light">
        <tbody>
          {state.cartList.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <button type="button" className="btn btn-sm"
                    onClick={
                      ()=>{
                        dispatch({
                          type:'REMOVE_CART_ITEM',
                          payload:{
                            ...item,
                          }
                        })
                      }
                    }
                    >X</button>
                </td>
                <td>
                  <img src={item.img} className="table-image" alt="..." />
                </td>
                <td>
                  {item.title}
                  <br />
                  <small className="text-muted">NT$ {item.price}</small>
                </td>
                <td>
                  <select name="" id="" className="form-select" 
                  value={item.quantity} 
                  onChange={(e)=>{
                    e.preventDefault();
                    const qty =  parseInt(e.target.value) ; //把字串數字轉換純數字
                    dispatch({
                      type: 'Change_CART_QUANTITY',
                      payload:{
                        ...item,
                        qty
                      }
                    })
                  }}> {/* 與數量綁定 */}
                    {/* 建立數量下拉選單，(Array(數字) 直接建立空的陣列) */}
                    {[...Array(20)].map((_,i)=>{ {/* 只需要用到index，所以參數1隨便帶就好 */}
                      return (
                        <option value={i+1} key={i}>{i+1}</option> //數量不會有0所以要+1讓索引從1開始
                      )
                    })} 

                  </select>
                </td>
                <td className="text-end">NT$ {item.price * item.quantity}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5} className="text-end">
              總金額 NT$ {state.total}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
