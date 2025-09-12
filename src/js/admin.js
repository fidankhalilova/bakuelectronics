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


fetchProducts("products", (data) => {
    renderProductsHTML(data);
    console.log(data);
});

fetchProducts("products", (data) => {
    renderDataProductsHTML(data);
    console.log(data);
});

function deleteItem(id) {
    axios.delete(`${LOCAL_BASE}/products/${products?.id}`)
        .then(() => {
            const row = btn.parentNode.parentNode;
            row.parentNode.removeChild(row);
            console.log(`Product ${id} deleted successfully`);
        })
        .catch(error => {
            console.error("Failed to delete:", error);
        });
}

const fileInput = document.getElementById("dropzoneFile");
const preview = document.getElementById("preview");

// fileInput.addEventListener("click", function () {
//     const file = fileInput.files[0];
//     if (!file) return;

//     const reader = new FileReader();

//     reader.onload = function (event) {
//         const base64String = event.target.result;
//         console.log("Base64:", base64String);

//         preview.src = base64String;

//         fetch("http://localhost:3000/upload", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ image: base64String })
//         })
//             .then(res => res.json())
//             .then(data => console.log("Uploaded:", data))
//             .catch(err => console.error(err));
//     };

//     reader.readAsDataURL(file);
// });

// const BASE_URL = "http://localhost:3000/products"; // JSON server products endpoint

// const form = document.getElementById("products");
// const tableBody = document.getElementById("productsDataSection-c");
// const dropzoneFile = document.getElementById("dropzoneFile");

// let editId = null; // if not null, we are editing

// // -------- 0. Handle image upload (Base64) ----------
// let uploadedImage = "";

// dropzoneFile.addEventListener("change", () => {
//     const file = dropzoneFile.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//         uploadedImage = reader.result; // Base64 string
//     };
//     if (file) reader.readAsDataURL(file);
// });

// // -------- 1. Handle form submit ----------
// form.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const newProduct = {
//         title: document.getElementById("title").value,
//         image: uploadedImage,
//         original: document.getElementById("original").value,
//         discounted: document.getElementById("discounted").value
//     };

//     try {
//         if (editId) {
//             // update existing product
//             await axios.put(`${BASE_URL}/${editId}`, newProduct);
//             editId = null;
//         } else {
//             // create new product
//             await axios.post(BASE_URL, newProduct);
//         }
//         form.reset();
//         uploadedImage = "";
//         loadProducts();
//     } catch (error) {
//         console.error("Error saving product:", error);
//     }
// });

// // -------- 2. Load products into table ----------
// async function loadProducts() {
//     try {
//         const res = await axios.get(BASE_URL);
//         const products = res.data;

//         tableBody.innerHTML = "";
//         products.forEach((product) => {
//             const tr = document.createElement("tr");

//             tr.innerHTML = `
//         <td class="px-6 py-4 whitespace-nowrap">${product.title}</td>
//         <td class="px-6 py-4 whitespace-nowrap">${product.original}</td>
//         <td class="px-6 py-4 whitespace-nowrap">${product.discounted}</td>
//         <td class="px-6 py-4 whitespace-nowrap">-</td>
//         <td class="px-6 py-4 whitespace-nowrap flex gap-2">
//           <button class="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-500" onclick="deleteItem(${product.id})">Delete</button>
//           <button class="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-500" onclick="editItem(${product.id})">Edit</button>
//         </td>
//       `;
//             tableBody.appendChild(tr);
//         });
//     } catch (error) {
//         console.error("Error loading products:", error);
//     }
// }

// // -------- 3. Delete product ----------
// async function deleteItem(id) {
//     try {
//         await axios.delete(`${BASE_URL}/${id}`);
//         loadProducts();
//     } catch (error) {
//         console.error("Error deleting product:", error);
//     }
// }

// // -------- 4. Edit product ----------
// async function editItem(id) {
//     try {
//         const res = await axios.get(`${BASE_URL}/${id}`);
//         const product = res.data;

//         document.getElementById("title").value = product.title;
//         document.getElementById("original").value = product.original;
//         document.getElementById("discounted").value = product.discounted;
//         uploadedImage = product.image; // keep existing image

//         editId = product.id;
//         window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to form
//     } catch (error) {
//         console.error("Error editing product:", error);
//     }
// }

// // Initialize
// loadProducts();

// // expose functions to window so inline onclick works
// window.deleteItem = deleteItem;
// window.editItem = editItem;
