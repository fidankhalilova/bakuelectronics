const token = localStorage.getItem("token");
const privateRoutes = ["checkout.html", "add-to-cart.html", "admin.html"]

if (!token) {
    if (
        !window.location.href.includes("login.html")
    ) {
        window.location.href = "./login.html";
    }
}

if (!token) {
    privateRoutes.forEach((route) => {
        if (
            !window.location.href.includes(route)
        ) {
            window.location.href = "./login.html";
        }
    })
}