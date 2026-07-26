export function themeSwitch() {
    let theme = localStorage.getItem("theme") || "light"

    if (theme == "light"){
        document.body.classList.add("darkmode")
        document.querySelector(".wallpaper-video").src = "assets/videos/dark-mode.webm"
        localStorage.setItem("theme","dark")
    } else {
        document.body.classList.remove("darkmode")
        document.querySelector(".wallpaper-video").src = "assets/videos/light-mode.webm"
        localStorage.setItem("theme","light")
    }
}