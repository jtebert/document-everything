// Get the user's theme preference from local storage, if it's available
const currentTheme = localStorage.getItem("theme");
var theme = currentTheme;
console.log('current theme', currentTheme)

const themes = {
    dark: 'jtebert-dark',
    light: 'jtebert'
}

// If the user's preference in localStorage is dark...
if (currentTheme == 'dark') {
    // ...let's toggle the .dark-theme class on the body
    jtd.setTheme(themes.dark);
    theme = 'dark'
    // Otherwise, if the user's preference in localStorage is light...
} else {
    // ...let's toggle the .light-theme class on the body
    jtd.setTheme(themes.light);
    theme = 'light'
};
// console.log(jtd.getTheme())