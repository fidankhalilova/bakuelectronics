let LOCAL_BASE = "http://localhost:3000";

let products = document.querySelector('#products');

products && products.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);
    let data = Object.fromEntries(formData);

    let endpoint = form.id = "products";

    axios.post(`${LOCAL_BASE}/${endpoint}`, data)
        .then(response => {
            console.log("Saved:", response.data);
        })
        .catch(error => {
            console.error("Error:", error);
        })
        .finally(() => {
            console.log("Fetch completed!");
        });
}

function fetchProducts(url, cb) {
    axios.get(`${LOCAL_BASE}/${url}`)
        .then((response) => {
            cb(response.data);
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            console.log("FETCH COMPLETED!");
        });
}

let ProductFetchHTMLData = document.querySelector('#productsSection');
let ProductDataFetchHTMLData = document.querySelector('#productsDataSection-c');
let ProductCartFetchHTMLData = document.querySelector('#addToCart-c');

const renderProductsHTML = (products) => {
    products.forEach((product) => {
        const productHtml = `<div id="product" class="relative flex flex-col items-center mt-[-160px]">
                    <div id="productImg" class="relative z-10 top-56">
                        <img src="https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2FinventImages%2Fapple-iphone-16-pro-128gb-natural-titanium-2.jpg&w=828&q=75"
                            alt="" class="w-[250px] object-cover relative z-3 rounded-xl border border-[#e1e1e1]">
                        <div class="flex flex-row justify-between items-center ">
                            <div id="discount"
                                class="bg-[#EA2427] px-2 py-2 text-[12px] font-medium text-white absolute z-4 top-2 left-2 rounded-lg">
                                -90₼</div>
                            <div id="share"
                                class="bg-[#f5f5f5] absolute z-4 top-2 right-2 px-3 py-2 rounded-lg text-black font-meidum text-[14px]">
                                <i class="ri-share-line"></i>
                            </div>
                        </div>
                    </div>
                    <div id="productContext"
                        class="bg-[#f5f5f5] w-[300px] h-[460px] rounded-2xl flex flex-col items-center justify-start">
                        <div class="relative mt-60 w-[250px] gap-3">
                            <div id="productLikesComments" class="flex flex-row gap-3">
                                <div id="likes" class="flex flex-row gap-1">
                                    <i class="ri-star-fill text-[14px] text-[#EA2427]"></i>
                                    <p class="text-[14px]">0</p>
                                </div>
                                <div id="comments" class="flex flex-row gap-1">
                                    <i class="ri-chat-3-line text-[14px] text-[#EA2427]"></i>
                                    <p class="text-[14px]">0 rəy</p>
                                </div>
                            </div>
                            <div id="productName">
                                <h3 class="text-[16px] mt-1">${product?.title ?? "No Name"}</h3>
                            </div>
                            <div id="productPriceCredit" class="flex flex-row gap-2 mt-5">
                                <div id="discountedPrice">
                                    <p class="text-[14px] text-[#787a7d] font-semibold line-through">${Math.round(product?.original * 100) / 100 ?? "None"}₼</p>
                                    <p class="text-[18px] text-[#333] font-semibold">${Math.round(product?.original * 100) / 100 ?? "None"}₼</p>
                                </div>
                                <div id="creditPrice" class="ml-4 pl-6 border-l border-l-[#787a7d]">
                                    <p class="text-[14px] text-[#787a7d] font-semibold">18 ay</p>
                                    <p class="text-[18px] text-[#333] font-semibold">${Math.round((product?.discounted / 18) * 100) / 100 ?? "None"}₼</p>
                                </div>
                            </div>
                            <div id="addtocartButtons" class="flex flex-row justify-between mt-3">
                                <div
                                    class="text-[16px] px-4 py-3 rounded-xl bg-[#dcdbdb] text-[#272727df] duration-200 hover:cursor-pointer hover:bg-[#3c3c3cdf] hover:text-[#f5f5f5] w-[190px] flex items-center justify-center">
                                    <i class="ri-shopping-basket-2-fill text-[18px] mr-2"></i> Səbətə
                                    əlavə et
                                </div>
                                <i
                                    class="ri-heart-line text-[20px] px-4 py-3 rounded-xl bg-[#dcdbdb] text-[#272727df] items-center duration-200 hover:cursor-pointer hover:bg-[#3c3c3cdf] hover:text-[#f5f5f5]"></i>
                            </div>
                        </div>
                    </div>
                </div>`
        ProductFetchHTMLData.innerHTML += productHtml;
    });
};

const renderDataProductsHTML = (products) => {
    products.forEach((product) => {
        const productDataHtml = `<tr>
                            <td class="px-6 py-4 whitespace-nowrap">${product?.title ?? "No Name"}</td>
                            <td class="px-6 py-4 whitespace-nowrap">${Math.round(product?.original * 100) / 100 ?? "None"}</td>
                            <td class="px-6 py-4 whitespace-nowrap">${Math.round(product?.original * 100) / 100 ?? "None"}</td>
                            <td class="px-6 py-4 whitespace-nowrap">${Math.round((product?.discounted / 18) * 100) / 100 ?? "None"}</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <button
                                    class="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out" onclick="deleteItem(${product.id}, this)">Delete</button>
                            </td>
                        </tr>`
        ProductDataFetchHTMLData.innerHTML += productDataHtml;
    });
};

const renderCartProductsHTML = (products) => {
    products.forEach((product) => {
        const productCartHtml = `<tr>
                                    <td class="py-4">
                                        <div class="flex items-center">
                                            <span class="font-semibold">${product?.title ?? "No Name"}</span>
                                        </div>
                                    </td>
                                    <td class="py-4">${Math.round(product?.original * 100) / 100 ?? "None"}</td>
                                    <td class="py-4">
                                        <div class="flex items-center">
                                            <button class="border rounded-md py-2 px-4 mr-2">-</button>
                                            <span class="text-center w-10">1</span>
                                            <button class="border rounded-md py-2 px-4 ml-2">+</button>
                                        </div>
                                    </td>
                                    <td class="py-4">${Math.round(product?.original * 100) / 100 ?? "None"}</td>
                                </tr>`
        ProductCartFetchHTMLData.innerHTML += productCartHtml;
    });
};

fetchProducts("products", (data) => {
    renderProductsHTML(data);
    console.log(data);
});

fetchProducts("products", (data) => {
    renderDataProductsHTML(data);
    console.log(data);
});
fetchProducts("products", (data) => {
    renderCartProductsHTML(data);
    console.log(data);
});

function deleteItem(id, btn) {
    axios.delete(`${LOCAL_BASE}/products/${products?.id}`)
        .then(() => {
            // remove row visually
            const row = btn.parentNode.parentNode;
            row.parentNode.removeChild(row);
            console.log(`Product ${id} deleted successfully`);
        })
        .catch(error => {
            console.error("Failed to delete:", error);
        });
}



const ToTop = document.querySelector("#tothetop");
document.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        ToTop.style.display = "flex";
    }
    else {
        ToTop.style.display = "none";
    }
});

ToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})