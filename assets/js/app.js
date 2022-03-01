// Select global Items
const searchInput = document.getElementById('search-input');
const loadingSpinner = document.getElementById('loading-spinner');

// Load phone data
const loadPhone = async () => {
    // Display spinner
    loadingSpinner.style.display = 'block';

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
        // Hide spinner
        loadingSpinner.style.display = 'none';

        // Empty search error
        knowledge.innerText = 'Please input a search keyword';
    } else if (!phones.status) {
        // Hide spinner
        loadingSpinner.style.display = 'none';

        // Not founded error
        knowledge.innerText = 'Sorry, No phone founded';
    } else {
        // Add phone count
        knowledge.innerText = `Showing search result for '${keyword}'`;

        const phoneDisplay = phones.data.slice(0, 20);

        // Display phone item
        phoneDisplay.forEach((phone) => {
            // Hide spinner
            loadingSpinner.style.display = 'none';

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
        detailsContainer.style.transform = 'translateY(100%)';
    } else {
        body.classList.add('no-scroll');
        detailsContainer.style.transform = 'translateY(5%)';
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
    const phoneSensor = document.getElementById('sensor');
    const wlan = document.getElementById('wlan');
    const bluetooth = document.getElementById('bluetooth');
    const gps = document.getElementById('gps');
    const nfc = document.getElementById('nfc');
    const radio = document.getElementById('radio');
    const usb = document.getElementById('usb');

    // Set attributes
    detailImage.setAttribute('src', details.image);

    // Set Inner text
    detailName.innerText = details.name;
    if (!details.releaseDate) {
        detailRelease.innerText = 'Release Date Not Available';
    } else {
        detailRelease.innerText = details.releaseDate;
    }
    detailStorage.innerText = details.mainFeatures.storage;
    detailDisplay.innerText = details.mainFeatures.displaySize;
    detailChipSet.innerText = details.mainFeatures.chipSet;
    detailMemory.innerText = details.mainFeatures.memory;

    const allSensor = details.mainFeatures.sensors;
    phoneSensor.innerText = `${allSensor.toString().replaceAll(',', ', ')}`;

    if (details.others) {
        wlan.innerText = details.others.WLAN;
        bluetooth.innerText = details.others.Bluetooth;
        gps.innerText = details.others.GPS;
        nfc.innerText = details.others.NFC;
        radio.innerText = details.others.Radio;
        usb.innerText = details.others.USB;
    } else {
        wlan.innerText = 'No Data Founded';
        bluetooth.innerText = 'No Data Founded';
        gps.innerText = 'No Data Founded';
        nfc.innerText = 'No Data Founded';
        radio.innerText = 'No Data Founded';
        usb.innerText = 'No Data Founded';
    }
};

// Close phone details bar
document.getElementById('close-btn').addEventListener('click', () => {
    detailBarToggle(false);
});
