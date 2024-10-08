
const Loading = () => {
    const body = document.querySelector('body')
    const loadingDiv = document.createElement('div')
    loadingDiv.classList.add('loading-div')
    loadingDiv.innerHTML = `<h2 class="loading-title">Loading ...</h2>
    <img src="" alt="" class="loading-image"/>`
    body.appendChild(loadingDiv)

}

export default Loading