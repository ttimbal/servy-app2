/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/pages/**/*.{js,ts,jsx,tsx}",
        "./src/**/components/**/*.{js,ts,jsx,tsx}",
        "./src/**/components/*.{js,ts,jsx,tsx}",
        "./src/**/components/layouts/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        minWidth: {
            '1/3': '33.333333%;',
        },
        extend: {
            colors: {
                theme: {
                    primary: {
                        DEFAULT: "#020018",
                        light: "#3022BC",
                    },
                    dark: {
                        gray:"#212121",
                    },

                    gray:"#E3E2E8",
                }
            }
        },
    },
    plugins: [],
}
