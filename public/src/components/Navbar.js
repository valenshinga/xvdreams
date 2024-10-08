const Navbar = (actualPage) => {
    const body = document.querySelector('body')
    const navbar = document.createElement('header')
    navbar.classList.add('header-navbar')
    navbar.innerHTML = `
        <nav class="nav-navbar">
			<div class="left-part-navbar">
				<img src="../images/image_transparent.png" alt="" class="image-navbar">
				<ul class="navbar-list">
					<li><button class="navbar-item"><i class="fa-solid fa-house-chimney"></i>Inicio</button></li>
					<li><button class="navbar-item">Gestion</button></li>
					<li><button class="navbar-item">Asistencia</button></li>
				</ul>
				<button class="toggle-btn">
					<span class="line1 line"></span>
					<span class="line2 line"></span>
					<span class="line3 line"></span>
				</button>

			</div>
			<div class="right-part-navbar">
				<input type="search" class="input-search" placeholder="Search"/>
				<button class="search-btn" id="search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
			</div>
		</nav>`

        body.appendChild(navbar)
}

export default Navbar