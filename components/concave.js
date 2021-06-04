import { LitElement, css, html, unsafeCSS } from 'lit-element';

class MyElement extends LitElement {

    static get properties() {
        return{
            // variables for data related to article
            category: {type: String, attribute: false},   
            // business/technology/health/etc
            title: {type: String},      
            content: {type: String},
            author: {type: String},
            publisher: {type: String},
            url: {type: URL},           // url to the article
            cover: {type: String},       // cover image for the article
        };
    }

    constructor() {
        super();
        this.category = "business";
        this.counter = -1;
        this.fetchData();
    }

    static get styles() {
        // external css variables
        // --bg_lvl1
        // --bg_lvl2
        // --bg_lvl3
        // --shadow
        // --text_lvl2
        // --text_lvl1
        return css ` 
            * {
                transition: .4s;
            }
            :host {
                border-radius: 10px;
                overflow: hidden;
                background-color: var(--bg_lvl2);
                box-shadow: 10px 10px 15px var(--shadow);
            }
            a {
                text-decoration: none;
            }       

            section {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-flow: column;
                width: 50vh;
            }

            section header {
                background-color: rgb(41, 98, 255);
                text-align: center;
                font-weight: bold;
                font-size: 20px;
                color: white;
                padding: 1rem;
                width: 100%;
            }

            section select {
                margin: 1rem;
                width: 80%;
                color: var(--text_lvl1);
                text-align: center;
                height: 40px;
                border: none;
                font-size: 14px;
                border-bottom: 1px solid grey;
                background-color: var(--bg_lvl2);
            }

            section figure {
                height: 300px;
                width: 100%;
                margin: 0;
                position: relative;
                background-image: url(${unsafeCSS(this.cover)});
                background-repeat: no-repeat;   
                background-position: center;
                background-size: cover;
            }

            section figure span {
                position: absolute;
                width: 95%;
                padding: 1rem;
                bottom: 0;
                color: white;
                font-size: 20px;
                font-weight: bold;
                background-image: linear-gradient(transparent,rgba(0, 0, 0, 0.801))
            }

            section article, footer {
                padding: 2em;
                box-sizing: border-box;
            }

            section article {
                padding-bottom: 0;
                color: var(--text_lvl1);
            }

            section article > span {
                margin: 1rem 0 0 0;
                text-align: center;
                width: 100%;
                color: var(--text_lvl2);
                display: inline-block;
            }

            section footer {
                display: flex;
                width: 100%;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            section footer > a {
                width: 100%;
                height: 40px;
                line-height: 40px;
                font-weight: bold;
                text-transform: uppercase;
                border-radius: 5px;
                text-align: center;
                color: white;
            }

            section footer > #readMore {
                margin-bottom: 1rem;
                background-color: #1BC000;
            }

            section footer > #next {
                background-color: #E21B00;
            }
        `;
    }

    // Fetchs data from the news api
    fetchData() {
        // updating url based on user's choosen category
        this.title = 'Fetching Data...';
        this.content = 'Loading...';
        this.author = '';
        this.publisher = '';
        this.url = '';
        this.cover = '';
        this.fetchURL = `https://newsapi.org/v2/top-headlines?country=in&pageSize=50&category=${this.category}&apiKey=e61aa301fa3a4f76bd6c4387776a575e`;
        fetch(this.fetchURL)
        .then(response => response.json())
        .then(response => {
            // storing over 50 articles inside a variable to reduce api hits
            this.data = response;   
            this.setData();
        // for updating data inside the component
        }
        );
    }

    // Updates data if user isn't intrested in the article
    setData() {
        // cycles through fetched articles inside an array
        this.counter++;
        let artcInfo = this.data.articles[this.counter];

        // checking to see if enough data is present
        if (!artcInfo.urlToImage || (!artcInfo.content || !artcInfo.description)){
            // if not the  move to next article
            this.setData();
            return;
        }
        // if data is there then update the component
        this.title = artcInfo.title;
        this.content = artcInfo.content ? artcInfo.content : artcInfo.description;
        this.author = artcInfo.author ? artcInfo.author : '-';
        this.publisher = artcInfo.source.name;
        this.url = artcInfo.url;
        this.cover = artcInfo.urlToImage;
    }
    
    // Updates category fo articles once the user chooses another
    updateChoice() {
        this.category = this.shadowRoot.querySelector('select').value;
        this.counter = -1;
        this.fetchData();
    }
    
    render() {
        return html `
        <section>
        <header>CONCAVE</header>
            <select @change="${this.updateChoice}" name="" id="">
                <option value="business" selected>Business</option>
                <option value="entertainment">Entertainment</option>
                <option value="health">Health</option>
                <option value="science">Science</option>
                <option value="sports">Sports</option>
                <option value="technology">Technology</option>
            </select>
            <figure style="background-image:url(${this.cover})">
                <span>
                    ${this.title}
                </span>
            </figure>
            <article>
                ${this.content}
                <span>
                    ${this.author} | ${this.publisher}
                </span>
            </article>
            <footer>
                <a href="${this.url}" target="_blank" id="readMore">Read More</a>
                <a @click=${this.setData} href="#" id="next">Not Intrested</a>
            </footer>
    </section>
        `
    }
};

customElements.define('concave-client', MyElement);