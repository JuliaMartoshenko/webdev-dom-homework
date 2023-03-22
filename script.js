const buttonElement = document.getElementById('add-button');
    const listElement = document.getElementById('list');
    const inputNameElement = document.getElementById('name-input');
    const inputTextElement = document.getElementById('text-input');

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

      //изменение html
      const oldHtml = listElement.innerHTML;
      listElement.innerHTML = oldHtml + `<li class="comment">
          <div class="comment-header">
            <div>${inputNameElement.value}</div>
            <div>${currentDate}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${inputTextElement.value}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">0</span>
              <button class="like-button"></button>
            </div>
          </div>
    `;
    
    //очистка форм ввода
    inputNameElement.value = '';
    inputTextElement.value = '';
    buttonElement.disabled = true;
    })