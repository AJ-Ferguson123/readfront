export const checkedLoggedIn = () => {
    const token = localStorage.getItem('token')
    return token
}