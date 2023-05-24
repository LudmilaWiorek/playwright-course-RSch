
export const isDesktopViewport = (page) => {
    const size = page.viewportSize() //metoda dot. wymiarów strony! możemy określić, czy aplikacja jest na mobile, czy na desktop
    return size.width >= 600 //pixels
    //return true or false
}