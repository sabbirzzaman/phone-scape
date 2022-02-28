// https://openapi.programming-hero.com/api/phones?search=iphone
// https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089

console.log('haha');

const loadPhone = async () => {
    const searchInput = document.getElementById('search-input');
    const keyword = searchInput.value;

    const url = `https://openapi.programming-hero.com/api/phones?search=${keyword}`;
    const res = await fetch(url);
    const data = await res.json();

    displayPhone(data);
};

const displayPhone = (phones) => {
    console.log(phones);
};
