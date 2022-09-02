const menudata = async () => {
    const response = await fetch(' https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();
    return data;
}

setfullmanu = async () => {
    const data = await menudata();
    const menu = document.getElementById('allmenu');
    const menuarray = [];

    for (const section of data.data.news_category) {
        if (menuarray.indexOf(section.category_name)) {
            menuarray.push(section.category_name);
            const li = document.createElement('li');
            li.innerHTML =
        }
    }
}