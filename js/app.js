// const newsCategories = async () => {
//     const url = 'https://openapi.programming-hero.com/api/news/categories';
//     const res = await fetch(url);
//     const data = await res.json();

//     //return data;
//     displayNewsCategories(data.data.news_category);
// }

// const displayNewsCategories = (data) => {
//     const newsCategory = document.getElementById('news-category');

//     data.forEach(category => {
//         //console.log(category);
//         const { category_name } = category;
//         const newsDiv = document.createElement('div');
//         newsDiv.classList.add('col');
//         newsDiv.innerHTML = `
//         <button class="block p-3" href="#" onclick="loadNewsData('${category.category_id}')" >${category_name}</button>`;
//         newsCategory.appendChild(newsDiv);
//     });
// }
const loadMenuData = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();
    return data;
}

setFullMenu = async () => {
    const data = await loadMenuData();
    // console.log(data)
    const menu = document.getElementById('allMenu');
    const menuArray = [];

    for (const section of data.data.news_category) {
        if (menuArray.indexOf(section.category_name) === -1) {
            menuArray.push(section.category_name);
            const li = document.createElement('li');
            li.innerHTML = `<button onclick="loadNewsData('${section.category_id}')" id="">${section.category_name}</button>`;
            menu.appendChild(li);
        }
    }
}
loadMenuData()
setFullMenu()

const loadNewsData = id => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    // console.log(url);
    // `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => showNewsData(data.data))
}
// Default Homepage
loadNewsData("04")

const showNewsData = newses => {
    // console.log(newses[0])
    const viewData = document.getElementById('showNews');
    viewData.innerHTML = ``;
    for (const news of newses) {
        // console.log(news._id)
        const createDiv = document.createElement('div');
        createDiv.innerHTML = `
            <div class="card lg:card-side bg-base-100 shadow-xl my-10">
                <figure><img class="object-contain" src="${news.thumbnail_url}" alt=""></figure>
                <div class="card-body">
                    <h2 class="card-title">${news.title}</h2>
                    <p>${news.details.slice(0, 500)}...</p>
                    <div class="card-actions justify-between">
                        <div class="flex">
                            <figure><img class="object-contain w-12 rounded-full" src="${news.author.img}" alt=""></figure>
                            <div class="ml-2">
                                <p>${news.author.name === null ? "No data Available" : news.author.name}</p>
                                <p>${news.author.published_date === null ? "No data Available" : news.author.published_date}</p>
                            </div>
                        </div>
                        <div class="ml-2">
                                <p>Views: ${news.total_view > 0 ? news.total_view : "No Data Available"}</p>
                            </div>

                        <label onclick="viewnewsDetails('${news._id}')" for="my-modal-3" class="btn modal-button">Details</label>
                    
                    </div>
                </div>
            </div>`
        viewData.appendChild(createDiv)
    }

}

viewnewsDetails = async (id) => {
    // const url = `https://openapi.programming-hero.com/api/news/${id}`
    // console.log(url);
    const response = await fetch(`https://openapi.programming-hero.com/api/news/${id}`);
    const datas = await response.json();
    for (const data of datas.data) {
        details = data.details;
        author = data.author;
        thumb = data.image_url;
        // console.log(data.details);
    }
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = ``;
    modalBody.innerHTML = `
    <h2>Author: ${author.name === "system" ? "No data Available" : author.name}</h2>
    <img src="${author.img}">
    <p>Published Date: ${author.published_date}</p>
    <img src="${thumb}">
    <p class="py-4">${details}</p>
    `
}