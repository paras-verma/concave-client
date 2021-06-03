import { LitElement, css, html, unsafeCSS } from 'lit-element';

class MyElement extends LitElement {

    static get properties() {
        return{
            category: {type: String},
            title: {type: String},
            content: {type: String},
            author: {type: String},
            publisher: {type: String},
            url: {type: URL},
            cover: {type: String},
        };
    }

    constructor() {
        super();
        this.category = "business";
        this.counter = -1;
        this.fetchData();
    }

    static get styles() {
        return css ` 
            a {
                text-decoration: none;
            }       

            section {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-flow: column;
                width: 50vh;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 5px 10px 30px rgba(0, 0, 0, 0.085);
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
                text-align: center;
                height: 40px;
                border: none;
                font-size: 14px;
                border-bottom: 1px solid grey;
            }

            section figure {
                height: 300px;
                width: 100%;
                margin: 0;
                position: relative;
                background-image: url(https://images.livemint.com/img/2021/06/03/600x338/_ABH0064-kaqB--621x414@LiveMint_1622730986371.JPG);
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
            }

            section article > span {
                margin: 1rem 0 0 0;
                text-align: center;
                width: 100%;
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

    fetchData() {
        console.log(this.fetchURL)
        this.fetchURL = `https://newsapi.org/v2/top-headlines?country=in&pageSize=50&category=${this.category}&apiKey=e61aa301fa3a4f76bd6c4387776a575e`;
        fetch(this.fetchURL)
        .then(response => response.json())
        .then(response => {
            this.data = response;
            console.log(this.data);
            this.setData();}
        );
    }

    setData() {
        this.counter++;
        this.title = this.data.articles[this.counter].title;
        this.content = this.data.articles[this.counter].content;
        this.author = this.data.articles[this.counter].author ? this.data.articles[this.counter].author : '-';
        this.publisher = this.data.articles[this.counter].source.name;
        this.url = this.data.articles[this.counter].url;
        this.cover = this.data.articles[this.counter].urlToImage;
    }

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
                <option value="business">Business</option>
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