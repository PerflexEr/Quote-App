const template = `
  <style>
    @import url('quote-fetcher.css');
  </style>
  
  <blockquote data-quote>The quote:</blockquote>
  <h1 data-character>Author</h1>
`;

class QuoteFetcher extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = template;
  }

  async connectedCallback() {
    this.refresh()

    document.addEventListener('click' , () => {
      this.refresh()
    })
  }

  async refresh(){
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    this.shadowRoot.querySelector('[data-character]').textContent = data.author;
    this.shadowRoot.querySelector('[data-quote]').textContent = data.content;
  }

  static get observedAttributes() {
    return ['data-character', 'data-quote'];
  }

  attributeChangedCallback(attr, prev, value) {
    this[attr](value, this.shadowRoot.querySelector(`[${attr}]`));
  }

  ['data-character'](value, el) {
    el.textContent = value;
  }

  ['data-quote'](value, el) {
    el.textContent = value;
  }
}

customElements.define('quote-fetcher', QuoteFetcher);
