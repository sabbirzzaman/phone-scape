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

// Display phone data
const displayPhone = (phones) => {
    // Select phone container
    const phonesContainer = document.getElementById('all-phones');

    phones.data.forEach((phone) => {
        searchInput.value = '';

        // Create Elements
        const phoneItem = document.createElement('div');
        const phoneImage = document.createElement('img');
        const phoneTitle = document.createElement('h3');
        const phoneBrand = document.createElement('p');
        const phoneDetailsBtn = document.createElement('button');

        // Set inner text
        phoneDetailsBtn.innerText = 'Details';

        // Set class and attribute
        phoneItem.classList.add('item');
        phoneImage.setAttribute('src', phone.image);

        // Append element child
        phoneItem.appendChild(phoneImage);
        phoneItem.appendChild(phoneTitle);
        phoneItem.appendChild(phoneBrand);
        phoneItem.appendChild(phoneDetailsBtn);

        phonesContainer.appendChild(phoneItem);
    });
};
