const buttonElement = document.getElementById('add-button');
const listElement = document.getElementById('list');
const inputNameElement = document.getElementById('name-input');
const inputTextElement = document.getElementById('text-input');

const comments = [
    {
        name: 'Глеб Фокин',
        date: '12.02.22 12:18',
        text: 'Это будет первый комментарий на этой странице',
    },
    {
        name: 'Варвара Н.',
        date: '13.02.22 19:22',
        text: 'Мне нравится как оформлена эта страница! ❤',
    },
]

//рендер данных
const renderComments = () => {
    const commentsHtml = comments.map((comment) => {
        return `<li class="comment">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">0</span>
            <button class="like-button"></button>
          </div>
        </div>
  `
    }).join('');
    listElement.innerHTML = commentsHtml;
}

renderComments();

//Инициализация лайков
const initButtonLikeListeners = () => {
    const likeButtonElements = document.querySelectorAll('.like-button');
    for (const likeButtonElement of likeButtonElements) {
        likeButtonElement.addEventListener('click', () => {
            console.log('1');
        })
    }
}

//initEventListeners();
initButtonLikeListeners();

//Включение и выключение кнопки "Написать"
buttonElement.disabled = true;
inputNameElement.addEventListener('input', () => {
    inputTextElement.addEventListener('input', () => {
        buttonElement.disabled = false;
    })
})

//Обработка события при нажатии на кнопку Enter - добавление комментария
document.addEventListener('keyup', (e) => {
    if (e.code === 'Enter') {
        buttonElement.click();
    }
})

//Обработка события при нажатии на кнопку "Написать" - добавление комментария
buttonElement.addEventListener('click', () => {
    //создание текущей даты в необходимом формате
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: 'numeric',
        minute: '2-digit',
    };
    currentDate = new Date().toLocaleDateString('ru-RU', options).replace(',', '');



    //Добавление нового элемента
    comments.push(
        {
            name: inputNameElement.value,
            date: currentDate,
            text: inputTextElement.value,
        }
    )
    console.log(comments);
    renderComments();
    initButtonLikeListeners();



    //очистка форм ввода
    inputNameElement.value = '';
    inputTextElement.value = '';
    buttonElement.disabled = true;
})