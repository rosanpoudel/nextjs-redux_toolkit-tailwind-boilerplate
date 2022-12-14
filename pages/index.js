import Head from "next/head";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.productsSlice);

  const fetchData = async () => {
    const res = await fetch("http://localhost:4000/orders/all");
    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    dispatch(fetchProducts());
    fetchData();
  }, []);
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-5">
        <div className="mt-8  mx-auto px-8">
          {status === "loading" && products.length === 0 ? (
            <div className="p-5 mt-8 grid grid-cols-6 gap-6">
              {Array(20)
                .fill()
                .map((key) => (
                  <div
                    role="status"
                    className="p-4 max-w-sm rounded border border-gray-200 shadow animate-pulse md:p-6 dark:border-gray-700"
                    key={key}
                  >
                    <div className="flex justify-center items-center mb-4 h-32 bg-gray-300 rounded dark:bg-gray-700">
                      <svg
                        className="w-12 h-12 text-gray-200 dark:text-gray-600"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 640 512"
                      >
                        <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                      </svg>
                    </div>
                    <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-44 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>

                    <span className="sr-only">Loading...</span>
                  </div>
                ))}
            </div>
          ) : (
            <div className="p-5 mt-8 grid grid-cols-6 gap-6">
              {products.map((product) => {
                return (
                  <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <a href="#" className="p-5">
                      <img
                        className="rounded-t-lg object-contain h-48 w-96"
                        src={product.image}
                        alt=""
                      />
                    </a>
                    <div className="p-5">
                      <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate ...">
                          {product.title}
                        </h5>
                      </a>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-6 text-justify">
                        {product.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
