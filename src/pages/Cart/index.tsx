import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, total, removeItemCart, addItemCart } = useContext(CartContext);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <h1 className="font-medium text-2xl text-center my-4">Meu carrinho</h1>

      {cart.length == 0 && (
        <div className="flex items-center flex-col">
          <p className="text-2xl">Ops não tem nada adicionado no carrinho</p>
          <Link to="/"><button className="bg-amber-200 rounded-2xl p-2 my-2 cursor-pointer">Voltar menu de compras</button></Link>
        </div>
      )}

      {cart.map((item) => (
        <section
          key={item.id}
          className="flex items-center justify-between border-b-2 border-gray-300 py-3"
        >
          <img src={item.cover} alt={item.title} className="w-28" />

          <strong>
            Preço:{" "}
            {item.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </strong>

          <div className="flex items-center justify-center gap-3">
            <button onClick={() => removeItemCart(item)} className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center">
              -
            </button>
            {item.amount}
            <button onClick={() => addItemCart(item)} className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center">
              +
            </button>
          </div>

          <strong className="float-right">
            SubTotal:{" "}
            {item.total.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </strong>
        </section>
      ))}

      {cart.length !== 0 && (
        <p className="font-bold mt-4">Total: {total}</p>
      )}
    </div>
  );
};

export default Cart;
