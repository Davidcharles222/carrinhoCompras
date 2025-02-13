import { BsCartPlus } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { ProductProps } from "../Home";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CartDetails = () => {
  const [product, setProduct] = useState<ProductProps>();

  const { addItemCart } = useContext(CartContext);
  const navigate = useNavigate()

  const { id } = useParams();

  useEffect(() => {
    async function getProduct() {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    }

    getProduct();
  }, [id]);

  const handleAddItem = (product: ProductProps) => {
    toast.success("Produto adicionado no carrinho.");
    addItemCart(product)
    navigate('/cart')
  };

  return (
    <div>
      <main className="w-full max-w-7xl px-4 mx-auto my-6">
        {product && (
          <section className="w-full">
            <div className="flex flex-col lg:flex-row">
              <img
                className="flex-1 w-full max-h-72 object-contain" //flex-1 disputa espaço de 1 na tela, se tem 2 div pega metade exata, object-contain faz com que a largura se adeque a altura da imagem
                src={product?.cover}
                alt={product?.title}
              />

              <div className="flex-1">
                <p className="font-bold text-2xl mt-4 mb-2">{product?.title}</p>
                <p className="my-4">{product?.description}</p>
                <strong className="text-zinc-700/90 text-xl">
                  {product?.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                  <button
                    onClick={() => handleAddItem(product)}
                    className="bg-zinc-900 p-1 rounded ml-3"
                  >
                    <BsCartPlus size={20} color="#fff" />
                  </button>
                </strong>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default CartDetails;
