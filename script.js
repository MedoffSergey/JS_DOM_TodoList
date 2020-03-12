const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];


(function(arrOfTasks) {
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  // Elemnts UI
  const listContainer = document.querySelector( //  создадим контейнер в который мы добавляем tasks в html разметке
    '.tasks-list-section .list-group',
  );

  const form = document.forms['addTask'];       // dom elements form и 2 input
  const inputTitle = form.elements['title'];
  const inputBody = form.elements['body'];

  // Events
  renderAllTasks(objOfTasks);                                 //вызво функции
  form.addEventListener('submit', onFormSubmitHandler);       // повесим обработчик событий
  listContainer.addEventListener('click', onDeletehandler );  //повесим клики на весь список

  function renderAllTasks(tasksList) {
    if (!tasksList) {                                   // проверим передался ли список задач
      console.error('Передайте список задач!');
      return;
    }

    const fragment = document.createDocumentFragment();  // создадим фрагмени для заполнения
    Object.values(tasksList).forEach(task => {           // Object.values возвращает массив, на каждую итерацию цикла мы получим отдельную задачу
      const li = listItemTemplate(task);                 // сгенерируем разметку
      fragment.appendChild(li);
    });
    listContainer.appendChild(fragment);  // тут мы добавляем задачу
  }

  function listItemTemplate({ _id, title, body } = {}) {  // диструктаризация объекта task установим по умолчанию пустой обьект
    const li = document.createElement('li');              // создадим li
    li.classList.add(                                     // стилизуем li с bootstrap class
      'list-group-item',
      'd-flex',
      'align-items-center',
      'flex-wrap',
      'mt-2',
    );
    li.setAttribute('data-task-id', _id);                 // добавим атрибут id

    const span = document.createElement('span');          // создадим спан
    span.textContent = title;                             //  text-content для span
    span.style.fontWeight = 'bold';                       //  стиль жирный

    const deleteBtn = document.createElement('button');   // создадим кнопку
    deleteBtn.textContent = 'X';                // текст кнопки
    deleteBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');  //  стилизуем btn с bootstrap class

    const article = document.createElement('p');          // создадим артикл
    article.textContent = body;                           // text-content для артикл
    article.classList.add('mt-2', 'w-100');               //  стилизуем артикл с bootstrap class

    li.appendChild(span);                                 //  добавим в const li элементы
    li.appendChild(deleteBtn);
    li.appendChild(article);

    return li;                                            //  вернем обьект
  }

  function onFormSubmitHandler(e) {
    e.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;

    if (!titleValue || !bodyValue) {
      alert('Пожалуйста введите title и body');
      return;
    }

    const task = createNewTask(titleValue, bodyValue);  // тут получаем копию новой задачи
    const listItem = listItemTemplate(task);            // создаем dom шаблон на основе новой новой задачи
    listContainer.insertAdjacentElement('afterbegin', listItem);  //добавим в самое начало задач
    form.reset(); //очистим форму input
  }

  function createNewTask(title, body) {   //создади один обьект задачи из инпутов
    const newTask = {
      title,
      body,
      completed: false,
      _id: `task-${Math.random()}`, // сгенерируем рандомный id
    };

    objOfTasks[newTask._id] = newTask;  //добавим задачу в список задач

    return { ...newTask };  // возвращаем копию новой задачи
  }

  function deleteTask(id) {
    const { title } = objOfTasks[id];      // получение title шз обьекта
    const isConfirm = confirm(`Точно вы хотите удалить задачу: ${title}`);  // окно true/false
    if (!isConfirm) return isConfirm;
    delete objOfTasks[id];
    return isConfirm;
  }

  function deleteTaskFromHtml(confirmed, el) {                // функция удаления html
    if (!confirmed) return;                                   // Если false return
    el.remove();                                              // Если true удаляем задачу
  }

  function onDeletehandler({ target }) {                       // event.target
    if (target.classList.contains('delete-btn')) {             //если наш event.target сожержит 'delete-btn'
      const parent = target.closest('[data-task-id]');         // ищем родителя
      const id = parent.dataset.taskId;                        // получим id из родителя
      const confirmed = deleteTask(id);                        // получив id вызов функции которой надо удалить
      deleteTaskFromHtml(confirmed, parent);                   // удалим html разметку
    }
  }

})(tasks);
