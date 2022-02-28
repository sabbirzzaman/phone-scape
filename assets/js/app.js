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

    phoneDetails(data.data);
};

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
            phoneDetailsBtn.setAttribute(
                'onclick',
                `loadDetails('${phone.slug}')`
            );

            // Append element child
            phoneItem.appendChild(phoneImage);
            phoneItem.appendChild(phoneTitle);
            phoneItem.appendChild(phoneBrand);
            phoneItem.appendChild(phoneDetailsBtn);

            phonesContainer.appendChild(phoneItem);
        });
    }
};

// Detail bar toggle
const detailBarToggle = (isOpen) => {
    // Select elements
    const body = document.body;
    const detailsContainer = document.getElementById('details');

    // Add class and style element
    if (!isOpen) {
        body.classList.remove('no-scroll');
        detailsContainer.style.transform = 'translateX(-100%)';
    } else {
        body.classList.add('no-scroll');
        detailsContainer.style.transform = 'translateX(-5%)';
    }
};

// display phone details
const phoneDetails = (details) => {
    // Open details bar toggle
    detailBarToggle(true);

    // Select elements
    const detailImage = document.getElementById('detail-image');
    const detailName = document.getElementById('name');
    const detailRelease = document.getElementById('release-date');
    const detailStorage = document.getElementById('storage');
    const detailDisplay = document.getElementById('d-size');
    const detailChipSet = document.getElementById('chip-set');
    const detailMemory = document.getElementById('memory');

    // Set attributes
    detailImage.setAttribute('src', details.image)

    // Set Inner text
    detailName.innerText = details.name;
    detailRelease.innerText = details.releaseDate;
    detailStorage.innerText = details.mainFeatures.storage;
    detailDisplay.innerText = details.mainFeatures.displaySize;
    detailChipSet.innerText = details.mainFeatures.chipSet;
    detailMemory.innerText = details.mainFeatures.memory;
};

// Close phone details bar
document.getElementById('close-btn').addEventListener('click', () => {
    detailBarToggle(false);
});
