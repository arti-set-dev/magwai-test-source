import axios from "axios";
import { cardTemplete } from "../components/cardTempete.js";

const getTotalPages = (totalCards, limit) => {
    return Math.ceil(totalCards / limit);
}

const btnLoad = document.querySelector('[data-load]');
const cardsList = document.querySelector('.cards__list');
const errorText = document.querySelector('.cards__error');

const totalCards = btnLoad.dataset.total;
const initialCards = btnLoad.dataset.initial;
const limitCards = btnLoad.dataset.limit;

let page = 1;

class PostService {
    static async getPosts(page, limit) {
        try {
            return await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _limit: limit,
                    _page: page
                }
            });
        } catch (error) {
            console.log(error)
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    btnLoad.querySelector('span').textContent = 'Загружаем...';
    const res = PostService.getPosts(page, initialCards);

    res.then(res => {
        res.data.map(card => {
            cardsList?.insertAdjacentHTML('beforeend', cardTemplete(card));
            btnLoad.querySelector('span').textContent = 'ЗАГРУЗИТЬ ЕЩЕ';
            page = 2;
        })
    }).catch(res => {
        btnLoad.querySelector('span').textContent = 'Попробовать снова';
        errorText.classList.add('show');
    })

    btnLoad?.addEventListener('click', () => {
        page++;
        btnLoad.querySelector('span').textContent = 'загружаем...';

        if (page <= getTotalPages(totalCards, limitCards)) {
            const res = PostService.getPosts(page, limitCards);

            res.then(res => {
                res.data.map(card => {
                    cardsList?.insertAdjacentHTML('beforeend', cardTemplete(card));
                    btnLoad.querySelector('span').textContent = 'ЗАГРУЗИТЬ ЕЩЕ';
                })
            }).catch(res => {
                btnLoad.querySelector('span').textContent = 'Попробовать снова';
            })
        } else {
            btnLoad.disabled = true;
            btnLoad.querySelector('span').textContent = 'Достигнут лимит';
        }
    })
})
