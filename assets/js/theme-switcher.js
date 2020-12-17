// Select the button
const btn = document.getElementById("theme-switch");
// Check for dark mode preference at the OS level
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// const currentTheme = localStorage.getItem("theme");
// var theme = currentTheme;
// const themes = {
//     dark: 'jtebert-dark',
//     light: 'jtebert'
// }
// // Get the user's theme preference from local storage, if it's available
// const currentTheme = localStorage.getItem("theme");
// var theme = currentTheme;
// console.log('current theme', currentTheme)

// // If the user's preference in localStorage is dark...
// if (currentTheme == dark_theme) {
//     // ...let's toggle the .dark-theme class on the body
//     jtd.setTheme(dark_theme);
//     // Otherwise, if the user's preference in localStorage is light...
// } else if (currentTheme == light_theme) {
//     // ...let's toggle the .light-theme class on the body
//     jtd.setTheme(light_theme);
// };
// // console.log(jtd.getTheme())

console.log('current theme:', theme)

function switch_theme() {
    if (theme == 'dark') {
        jtd.setTheme(themes.light);
        theme = 'light';
    }
    else {
        // currently light; set to dark
        jtd.setTheme(themes.dark);
        theme = 'dark';
    }
    // Finally, let's save the current preference to localStorage to keep using it
    localStorage.setItem("theme", theme);
    console.log("theme", theme)
    other_theme = theme == 'dark' ? 'light' : 'dark';
    btn.innerHTML = 'Change to ' + other_theme + ' theme';
}

btn.addEventListener("click", function () {
    // If the user's OS setting is dark and matches our .dark-mode class...
    if (theme == 'dark') {
        jtd.setTheme(themes.light);
        theme = 'light';
    }
    else {
        // currently light; set to dark
        jtd.setTheme(themes.dark);
        theme = 'dark';
    }
    // Finally, let's save the current preference to localStorage to keep using it
    localStorage.setItem("theme", theme);
    console.log("theme", theme)
    other_theme = theme == 'dark' ? 'light' : 'dark';
    btn.innerHTML = 'Change to ' + other_theme + ' theme';
});