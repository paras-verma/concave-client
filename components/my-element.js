import { LitElement, css, html, unsafeCSS } from 'lit-element';

class MyElement extends LitElement {
    static get properties() {
        return{
            title: {type: String},
            desc: {type: String},
            author: {type: String},
            publication: {type: String},
            artc_url: {type: URL},
            artc_bg: {type: String},
        };
    }

    static get styles() {
        return css `
            :host:before {
                content: 'New Article Card';
                color: white;
                background-color: rgb(41, 98, 255);
                padding: .5rem;
                border-radius: 5px;
                font-weight: bold;
            }

            :host {
                margin: 2em;
            }

            section {
                margin-top: 1rem;
                width: 50vh;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 5px 10px 30px rgba(0, 0, 0, 0.085);
            }

            section header {
                height: 150px;
                background-color: red;
                background-repeat: no-repeat;
                background-position: center;
                background-size: cover;
                text-align: bottom;
                position: relative;
            }

            section header span {
                position: absolute;
                width: 100%;
                padding: 1rem;
                bottom: 0;
                color: white;
                font-size: 26px;
                font-weight: bold;
                background-image: linear-gradient(transparent,black)
            }

            section article, footer {
                padding: 1em;
                box-sizing: border-box;
            }

            section footer {
                filter: opacity(.6);
            }
        `;
    }
    
    render() {
        return html `
        <section>
            <header style='background-image:url(${this.artc_bg})'>
                <span>
                ${this.title}
                </span>
            </header>
            <article>
                ${this.desc}
            </article>
            <footer>${this.author} | 
                <a href="${this.artc_url}">
                ${this.publication}
                </a>
            </footer>
        </section>
        `
    }
};

customElements.define('news-article', MyElement);