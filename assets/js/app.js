// Select global Items
const searchInput = document.getElementById('search-input');

// Load phone data
const loadPhone = async () => {
    const keyword = searchInput.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${keyword}`;
    const res = await fetch(url);
    const data = await res.json();

    displayPhone(data);
};

// load phone details
const loadDetails = async (slug) => {
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    const res = await fetch(url);
    const data = await res.json();

    phoneDetails(data);
}

// Display phone data
const displayPhone = (phones) => {
    // Select phone container
    const phonesContainer = document.getElementById('all-phones');
    const knowledge = document.getElementById('knowledge');

    // Search Keyword
    const keyword = searchInput.value;

    // Clear search input and element content
    searchInput.value = '';
    phonesContainer.textContent = '';

    if (keyword === '') {
        // Empty search error
        knowledge.innerText = 'Please input a search keyword';
    } else if (!phones.status) {
        // Not founded error
        knowledge.innerText = 'Sorry, No phone founded';
    } else {
        // Add phone count
        knowledge.innerText = `Showing search result for '${keyword}'`;

        // Display phone item
        phones.data.forEach((phone) => {
            // Create Elements
            const phoneItem = document.createElement('div');
            const phoneImage = document.createElement('img');
            const phoneTitle = document.createElement('h3');
            const phoneBrand = document.createElement('p');
            const phoneDetailsBtn = document.createElement('button');

            // Set inner text
            phoneDetailsBtn.innerText = 'Details';
            phoneTitle.innerText = phone.phone_name;
            phoneBrand.innerText = phone.brand;

            // Set class and attribute
            phoneItem.classList.add('item');
            phoneImage.setAttribute('src', phone.image);
            phoneDetailsBtn.setAttribute('onclick', `loadDetails('${phone.slug}')`)

            // Append element child
            phoneItem.appendChild(phoneImage);
            phoneItem.appendChild(phoneTitle);
            phoneItem.appendChild(phoneBrand);
            phoneItem.appendChild(phoneDetailsBtn);

            phonesContainer.appendChild(phoneItem);
        });
    }
};

const phoneDetails = (details) => {
    const body = document.body;
    const detailsContainer = document.getElementById('details');

    body.classList.add('no-scroll')
    detailsContainer.style.transform = 'translateX(-5%)';
}

document.getElementById('close-btn').addEventListener('click', () => {
    const body = document.body;
    const detailsContainer = document.getElementById('details');

    body.classList.remove('no-scroll')
    detailsContainer.style.transform = 'translateX(-100%)';
})