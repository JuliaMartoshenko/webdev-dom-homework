const buttonElement = document.getElementById('add-button');
const listElement = document.getElementById('list');
const inputNameElement = document.getElementById('name-input');
const inputTextElement = document.getElementById('text-input');
comments = [];

//Запрос данных из API
fetch('https://webdev-hw-api.vercel.app/api/v1/yuliya-martoshenko/comments', {
    method: 'GET',
})
    .then((response) => {
        return response.json();
    })
    .then((responseData) => {
        comments = responseData.comments.map((comment) => {
            return {
                name: comment.author.name,
                date: new Date(comment.date),
                text: comment.text,
                likes: comment.likes,
                isLike: comment.isLiked,
            }
        });
        console.log(comments);
        renderComments();
    })

//рендер данных
const renderComments = () => {
    const commentsHtml = comments.map((comment, index) => {
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
            <span class="likes-counter">${comment.likes}</span>
            <button data-index=${index} class=${comment.isLike ? "'like-button -active-like'" : "'like-button'"}></button>
          </div>
        </div>
  `
    }).join('');
    listElement.innerHTML = commentsHtml;
}

//Инициализация лайков
const initButtonLikeListeners = () => {
    const likeButtonElements = document.querySelectorAll('.like-button');
    for (const likeButtonElement of likeButtonElements) {
        likeButtonElement.addEventListener('click', () => {
            event.stopPropagation();
            const index = likeButtonElement.dataset.index;
            comments[index].isLike ? comments[index].likes-- : comments[index].likes++;
            comments[index].isLike = !comments[index].isLike;
            renderComments();
            initButtonLikeListeners();
        })
    }
}

renderComments();
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


    //Добавление нового элемента в список
    comments.push(
        {
            name: inputNameElement.value
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;"),
            date: currentDate,
            text: inputTextElement.value
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;"),
            likes: 0,
            isLike: false,
        }
    )
    renderComments();
    initButtonLikeListeners();


    //очистка форм ввода
    inputNameElement.value = '';
    inputTextElement.value = '';
    buttonElement.disabled = true;
})