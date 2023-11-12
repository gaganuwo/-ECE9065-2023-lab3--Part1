document.addEventListener('DOMContentLoaded', () => {
    const usersData = JSON.parse(userContent); 
    const stocksData = JSON.parse(stockContent); 
    const detailsSection = document.querySelector('section.Details');
    const stockList = document.querySelector("#listPortfolio");
    detailsSection.style.display = 'none';
    const userListUl = document.querySelector('.UserList ul');

    usersData.forEach(user => {
        const userLi = document.createElement('li');
        userLi.textContent = user.user.lastname + ',' + user.user.firstname;
        userLi.dataset.id = user.id;
        userListUl.appendChild(userLi);
    });

    let clickedId;
    userListUl.addEventListener('click', event => {
        clickedId = event.target.dataset.id;
        if (clickedId) {
            showUserDetails(clickedId);
        }
    });

    document.querySelector('.Portfolio').addEventListener('click', event => {
        if (event.target.classList.contains('stock-entry')) {
            const stockSymbol = event.target.dataset.symbol;
            showStockDetails(stockSymbol);
        }
    });


});