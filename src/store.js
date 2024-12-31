// 跨元件使用商店
import { createContext } from "react";

export const cartInit ={
    cartList:[],
  };




export const cartReducer = (state, action) => {
  const cartList = [...state.cartList];
  // 判斷購物車是否有相同產品
  // #1.先取得當前購物車的目標品項的索引
  const index = cartList.findIndex((item) => item.id === action.payload.id);
  switch (action.type) {
    case "ADD_TO_CART":
      if (index === -1) {
        // 還未加入到購物車所以沒有索引，值為-1
        cartList.push(action.payload); //push產品到購物車
      } else {
        cartList[index].quantity += action.payload.quantity; //在Products設定預設值為1
      }
      return {
        ...state,
        cartList,
        total: calculateTotalPrice(cartList),
      };
    // 根據下拉的數量變更總價
    case "Change_CART_QUANTITY":
      cartList[index].quantity = action.payload.qty;
      return {
        ...state,
        cartList,
        total: calculateTotalPrice(cartList),
      };
    case "REMOVE_CART_ITEM":
      cartList.splice(index, 1);
      return {
        ...state,
        cartList,
        total: calculateTotalPrice(cartList),
      };
    default:
      return state;
  }
};
// 數字加總函式
function calculateTotalPrice(cartList) {
  return cartList
    .map((item) => item.quantity * item.price)
    .reduce((a, b) => a + b, 0);
}
export const CartContext = createContext({});
