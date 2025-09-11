const AuthHTTP = axios.create({
    baseURL: "https://dummyjson.com/",
});

const AuthLogin = (endpoint, payload) => {
    return AuthHTTP.post(endpoint, payload).then((res) => res.data);
};

const LoginForm = document.querySelector("#loginForm");
const UsernameInput = document.querySelector("#username");
const PassInput = document.querySelector("#password");

LoginForm && LoginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = {
        username: UsernameInput.value,
        password: PassInput.value,
    };

    try {
        const data = await AuthLogin("auth/login", payload);

        console.log("Login success:", data);

        localStorage.setItem("token", data.accessToken);

        window.location.href = "./index.html";
    } catch (err) {
        console.error("Login failed:", err);
        alert("Invalid username or password");
    }
});
