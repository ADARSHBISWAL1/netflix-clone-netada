// --- 1. MOCK DATA (Simulating TMDB API) --- //
// Base URL for Images (Using absolute URLs from TVMaze now)
const imageUrl = '';

// Stable real poster paths downloaded from an open API
const mockOriginals = [
    {"name":"Under the Dome","poster_path":"https://static.tvmaze.com/uploads/images/medium_portrait/610/1525272.jpg"},
    {"name":"Person of Interest","poster_path":"https://static.tvmaze.com/uploads/images/medium_portrait/163/407679.jpg"},
    {"name":"Bitten","poster_path":"https://static.tvmaze.com/uploads/images/medium_portrait/0/15.jpg"},
    {"name":"Arrow","poster_path":"https://static.tvmaze.com/uploads/images/medium_portrait/143/358967.jpg"},
    {"name":"True Detective","poster_path":"https://static.tvmaze.com/uploads/images/medium_portrait/490/1226764.jpg"},
    {"name":"The 100","poster_path":"https://static.tvmaze.com/uploads/images/medium_portrait/477/1194981.jpg"},
    {"name":"Homeland","poster_path":"https://static.tvmaze.com/uploads/images/medium_portrait/498/1245275.jpg"},
    {"name":"Glee","poster_path":"https://static.tvmaze.com/uploads/images/medium_portrait/0/73.jpg"},
    {"name":"Revenge","poster_path":"https://static.tvmaze.com/uploads/images/medium_portrait/82/206879.jpg"},
    {"name":"Grimm","poster_path":"https://static.tvmaze.com/uploads/images/medium_portrait/69/174906.jpg"}
];

const mockTrending = [
    {"name":"Gotham","poster_path":"https://static.tvmaze.com/uploads/images/medium_portrait/189/474715.jpg"},
    {"name":"Lost Girl","poster_path":"https://static.tvmaze.com/uploads/images/medium_portrait/0/137.jpg"},
    {"name":"The Flash","poster_path":"https://static.tvmaze.com/uploads/images/medium_portrait/448/1121792.jpg"},
    {"name":"Continuum","poster_path":"https://static.tvmaze.com/uploads/images/medium_portrait/0/184.jpg"},
    {"name":"Constantine","poster_path":"https://static.tvmaze.com/uploads/images/medium_portrait/0/154.jpg"},
    {"name":"Penny Dreadful","poster_path":"https://static.tvmaze.com/uploads/images/medium_portrait/48/122260.jpg"},
    {"name":"The Amazing Race","poster_path":"https://static.tvmaze.com/uploads/images/medium_portrait/587/1468637.jpg"},
    {"name":"Supernatural","poster_path":"https://static.tvmaze.com/uploads/images/medium_portrait/445/1114097.jpg"},
    {"name":"The Strain","poster_path":"https://static.tvmaze.com/uploads/images/medium_portrait/444/1111710.jpg"},
    {"name":"The Last Ship","poster_path":"https://static.tvmaze.com/uploads/images/medium_portrait/164/412464.jpg"}
];

const mockCategories = [
    { title: 'NETADA ORIGINALS', data: mockOriginals, isLargeRow: true },
    { title: 'Trending Now', data: mockTrending, isLargeRow: false },
    { title: 'Top Rated', data: mockOriginals.slice().reverse(), isLargeRow: false },
    { title: 'Action Movies', data: mockTrending.slice(2).concat(mockTrending.slice(0, 2)), isLargeRow: false },
    { title: 'Comedy Movies', data: mockOriginals.slice(3).concat(mockOriginals.slice(0, 3)), isLargeRow: false },
    { title: 'Horror Movies', data: mockTrending.slice().reverse(), isLargeRow: false }
];

// --- 2. DOM ELEMENTS --- //
const navbar = document.getElementById('navbar');
const rowsContainer = document.getElementById('rows-container');

// --- 3. EVENT LISTENERS --- //
// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Navigation Links Interaction
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent jump to top
        navLinks.forEach(l => l.classList.remove('active'));
        e.target.classList.add('active');
    });
});

// Hero Buttons
const playBtn = document.querySelector('.btn-play');
const infoBtn = document.querySelector('.btn-info');

if (playBtn) {
    playBtn.addEventListener('click', () => alert('Playing: Stranger Things'));
}
if (infoBtn) {
    infoBtn.addEventListener('click', () => alert('More Info: Stranger Things'));
}

// --- 4. RENDER ROWS --- //
function renderRows() {
    // Clear container
    rowsContainer.innerHTML = '';

    mockCategories.forEach(category => {
        // Create Row Container
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');

        // Create Title
        const titleEl = document.createElement('h2');
        titleEl.classList.add('row-title');
        titleEl.textContent = category.title;
        rowDiv.appendChild(titleEl);

        // Create Posters Container
        const rowPostersDiv = document.createElement('div');
        rowPostersDiv.classList.add('row-posters');

        // Populate Posters
        category.data.forEach(movie => {
            const imgEl = document.createElement('img');
            imgEl.classList.add('row-poster');
            
            // Add 'large' class if it's the Originals row
            if (category.isLargeRow) {
                imgEl.classList.add('large');
            }

            imgEl.src = imageUrl + movie.poster_path;
            imgEl.alt = movie.name;

            // Optional: Error handling if the path breaks (fallback to a placeholder)
            imgEl.onerror = function() {
                this.src = 'https://placehold.co/300x450/141414/FFFFFF.png?text=' + encodeURIComponent(movie.name);
            };

            rowPostersDiv.appendChild(imgEl);
        });

        rowDiv.appendChild(rowPostersDiv);
        rowsContainer.appendChild(rowDiv);
    });
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    renderRows();
});
