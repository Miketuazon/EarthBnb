import './Loader.css'
// window.addEventListener("load", () => {
//     const loader = document.querySelector(".loader");

//     loader.classList.add("loader-hidden");

//     loader.addEventListener("transitionend", () => {
//         document.body.removeChild("loader");
//     })
// })

function LoaderIcon() {
    window.addEventListener("load", () => {
        const loader = document.querySelector(".loader");

        loader.classList.add("loader-hidden");

        loader.addEventListener("transitionend", () => {
            document.body.removeChild("loader");
        })
    })

    return (
        <div className='loader'>Loading...</div>
    )
}

export default LoaderIcon
