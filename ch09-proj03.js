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

function showUserDetails(userId) {
    const user = usersData.find(user => user.id.toString() === userId);
    if (user && user.user && Array.isArray(user.portfolio)) {
        const userDetailsForm = document.querySelector('.UserForm .userEntry');
        userDetailsForm.querySelector('#firstname').value = user.user.firstname;
        userDetailsForm.querySelector('#lastname').value = user.user.lastname;
        userDetailsForm.querySelector('#email').value = user.user.email;
        userDetailsForm.querySelector('#address').value = user.user.address;
        userDetailsForm.querySelector('#city').value = user.user.city;
        const portfolioSection = document.querySelector('.Portfolio');
        const portfolioListContainer = document.querySelector('.Portfolio .StockList');
        portfolioListContainer.innerHTML = '';
        const heading = document.createElement("h2");
        heading.innerHTML = "Portfolio";
        portfolioListContainer.appendChild(heading);

        user.portfolio.forEach(stock => {
            const listPortfolio = document.createElement('div');
            listPortfolio.id = 'listPortfolio';

            const stockSymbol = document.createElement('h3');
            stockSymbol.textContent = `${stock.symbol}`;
            listPortfolio.appendChild(stockSymbol);
            
            const stockOwned = document.createElement('h3');
            stockOwned.textContent = `${stock.owned}`;
            listPortfolio.appendChild(stockOwned);

            const viewButton = document.createElement('button');
            viewButton.className = 'stock-entry';
            viewButton.textContent = 'View';
            viewButton.dataset.symbol = stock.symbol;
            listPortfolio.appendChild(viewButton);
            portfolioListContainer.appendChild(listPortfolio);
        });
        detailsSection.style.display = 'block';

    } else {
        console.error('User data is missing or the portfolio is not an array');
    }

});