export const cardTemplete = (props) => {
    const { title, body } = props;

    return `
        <li class="cards__item">
            <article class="card">
                <a href="#">
                    <picture class="card__picture">
                        <source srcset="img/card-image.avif" type="image/avif">
                        <img loading="lazy" src="img/card-image.webp" class="card__image" width="320" height="185"
                            alt="bridge">
                    </picture>
                </a>
                <div class="card__content">
                    <a href="#" class="card__tag">bridge</a>
                    <a href="#">
                        <h3 class="card__title">${title}</h3>
                    </a>
                    <p class="card__text">
                        ${body}
                    </p>
                    <div class="card__autor">
                        Posted by <b>Eugenia,</b> on <time datetime="2019-07-24">July  24, 2019</time>
                    </div>
                    <a href="#" class="btn-second">Continue reading</a>
                </div>
            </article>
        </li>
    `
}
