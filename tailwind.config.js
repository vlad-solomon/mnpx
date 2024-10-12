/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            boxShadow: {
                "custom-drop-shadow":
                    "0 25px 50px 0 rgba(0,0,0,0.55), inset 0 0 100px 50px rgba(0,0,0,0.55)",
            },
        },
    },
    plugins: [],
};
