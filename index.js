NEWS_URL = 'https://newsapi.org/v2/top-headlines?country=in&pageSize=1&category=business&apiKey=e61aa301fa3a4f76bd6c4387776a575e'

fetch(NEWS_URL)
    .then(response => response.json())
    .then(data => data.articles[0])
    .then(data => {
    newsCard = document.createElement('news-article');
    
    newsCard.setAttribute('author', data.author ? data.author : ' ');
    newsCard.setAttribute('publication', data.source.name);
    newsCard.setAttribute('title', data.title);
    newsCard.setAttribute('desc', data.description);
    newsCard.setAttribute('artc_url', data.url);
    newsCard.setAttribute('artc_bg', data.urlToImage);
    
    document.getElementById('body').appendChild(newsCard);
    })
    //   API DATA OUTLINE
    //     "source": {
    //       "id": null,
    //       "name": "Moneycontrol"
    //     },
    //     "author": null,
    //     "title": "Edelweiss General Insurance employees can now work from anywhere - Moneycontrol.com",
    //     "description": "Employees whose physical presence is not required in office, will be able to work from anywhere permanently, even once offices begin to reopen.",
    //     "url": "https://www.moneycontrol.com/news/business/economy/edelweiss-general-insurance-launches-work-from-anywhere-policy-6983101.html",
    //     "urlToImage": "https://images.moneycontrol.com/static-mcnews/2020/08/Online-770x433.png",
    //     "publishedAt": "2021-06-03T08:27:53Z",
    //     "content": "Edelweiss General Insurance has launched a work-from-anywhere (WFA) policy for its employees.\r\nThis will be a hybrid work model that aims to empower and enable employees with their choice of workspac… [+1120 chars]"   