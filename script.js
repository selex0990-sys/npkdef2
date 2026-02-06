// script.js

const presets = {
  programming: {
    title: 'Основы программирования',
    subtitle: 'Изучите основы разработки ПО',
    chapters: [
      {
        name: 'Введение',
        description: 'Основные понятия',
        icon: 'fa-book',
        lessons: [
          {name: 'Что такое программирование', description: 'Определение', duration: 15, type: 'text'},
          {name: 'Первая программа', description: 'Hello World', duration: 20, type: 'practice'}
        ]
      },
      {
        name: 'Переменные и типы данных',
        description: 'Базовые элементы',
        icon: 'fa-code',
        lessons: []
      }
    ]
  },
  design: {
    title: 'Основы дизайна',
    subtitle: 'UI/UX принципы',
    chapters: [
      {
        name: 'Введение в дизайн',
        description: 'Основы',
        icon: 'fa-paint-brush',
        lessons: []
      }
    ]
  },
  language: {
    title: 'Изучение английского',
    subtitle: 'Базовый курс',
    chapters: [
      {
        name: 'Алфавит и произношение',
        description: 'Основы',
        icon: 'fa-language',
        lessons: []
      }
    ]
  },
  business: {
    title: 'Основы бизнеса',
    subtitle: 'Предпринимательство',
    chapters: [
      {
        name: 'Идея бизнеса',
        description: 'Генерация идей',
        icon: 'fa-chart-line',
        lessons: []
      }
    ]
  },
  empty: {
    title: 'Новый хендбук',
    subtitle: 'Добавьте описание',
    chapters: []
  }
};

function getFileIcon(type) {
  switch (type) {
    case 'document': return 'fas fa-file-pdf';
    case 'archive': return 'fas fa-file-archive';
    case 'image': return 'fas fa-file-image';
    case 'code': return 'fas fa-file-code';
    default: return 'fas fa-file';
  }
}

function updatePreview() {
  document.getElementById('preview-title').textContent = handbook.title || 'Новый хендбук';
  document.getElementById('preview-subtitle').textContent = handbook.subtitle || 'Добавьте описание';
  document.getElementById('preview-author').textContent = handbook.author ? 'Автор: ' + handbook.author : '';
  document.getElementById('preview-date').textContent = handbook.date ? handbook.date : '';
  document.documentElement.style.setProperty('--primary', handbook.primaryColor);
  document.documentElement.style.setProperty('--secondary', handbook.secondaryColor);
  const cover = document.getElementById('handbook-cover');
  const coverImageContainer = document.getElementById('cover-image-container');
  const coverPattern = document.getElementById('cover-pattern');
  cover.style.background = '';
  coverImageContainer.style.display = 'none';
  coverPattern.style.display = 'none';
  if (handbook.coverType === 'gradient') {
    cover.style.background = `linear-gradient(135deg, ${handbook.primaryColor}, ${handbook.secondaryColor})`;
  } else if (handbook.coverType === 'pattern') {
    coverPattern.style.display = 'block';
  } else if (handbook.coverType === 'image' && handbook.coverImage) {
    coverImageContainer.style.backgroundImage = `url(${handbook.coverImage})`;
    coverImageContainer.style.backgroundSize = 'cover';
    coverImageContainer.style.display = 'block';
  }
  const contentContainer = document.getElementById('content-container');
  contentContainer.innerHTML = '';
  handbook.chapters.forEach(chapter => {
    const chapterElem = document.createElement('div');
    chapterElem.classList.add('chapter');
    chapterElem.innerHTML = `
      <h2><i class="${chapter.icon}"></i> ${chapter.name}</h2>
      <p>${chapter.description}</p>
    `;
    const lessonsList = document.createElement('div');
    lessonsList.classList.add('lessons');
    chapter.lessons.forEach(lesson => {
      const lessonElem = document.createElement('div');
      lessonElem.classList.add('lesson');
      lessonElem.innerHTML = `
        <h3>${lesson.name}</h3>
        <p>${lesson.description}</p>
        <span>${lesson.duration} минут</span>
        <span Type: ${lesson.type}</span>
      `;
      lessonsList.appendChild(lessonElem);
    });
    chapterElem.appendChild(lessonsList);
    contentContainer.appendChild(chapterElem);
  });
  const interactiveContainer = document.getElementById('interactive-container');
  interactiveContainer.innerHTML = '';
  handbook.interactive.forEach(item => {
    const itemElem = document.createElement('div');
    itemElem.classList.add('interactive-item', item.type);
    itemElem.innerHTML = item.content;
    interactiveContainer.appendChild(itemElem);
  });
  const filesSection = document.getElementById('files-section');
  const filesList = document.getElementById('files-list');
  filesList.innerHTML = '';
  if (handbook.files.length > 0) {
    filesSection.style.display = 'block';
    handbook.files.forEach(file => {
      const fileElem = document.createElement('div');
      fileElem.classList.add('file-item');
      fileElem.innerHTML = `
        <i class="${getFileIcon(file.type)}"></i>
        <span>${file.name}</span>
        <p>${file.description}</p>
      `;
      filesList.appendChild(fileElem);
    });
  } else {
    filesSection.style.display = 'none';
  }
  document.getElementById('chapters-count').textContent = handbook.chapters.length + ' глав';
  const lessonsCount = handbook.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0);
  document.getElementById('lessons-count').textContent = lessonsCount + ' уроков';
  document.getElementById('files-count').textContent = handbook.files.length + ' файлов';
  if (handbook.chapters.length > 0 || handbook.interactive.length > 0 || handbook.files.length > 0) {
    document.getElementById('empty-state').style.display = 'none';
  } else {
    document.getElementById('empty-state').style.display = 'block';
  }
}

function updateChaptersList() {
  const chaptersList = document.getElementById('chapters-list');
  chaptersList.innerHTML = '';
  handbook.chapters.forEach((chapter, index) => {
    const chapterItem = document.createElement('div');
    chapterItem.classList.add('chapter-item');
    if (index === handbook.currentChapter) {
      chapterItem.classList.add('active');
    }
    chapterItem.innerHTML = `
      <i class="${chapter.icon}"></i>
      <span>${chapter.name}</span>
    `;
    chapterItem.addEventListener('click', () => {
      handbook.currentChapter = index;
      document.getElementById('current-chapter-name').textContent = chapter.name;
      updateChaptersList();
      updateLessonsList();
    });
    chaptersList.appendChild(chapterItem);
  });
  if (handbook.currentChapter === -1 && handbook.chapters.length > 0) {
    handbook.currentChapter = 0;
    document.getElementById('current-chapter-name').textContent = handbook.chapters[0].name;
    updateChaptersList();
    updateLessonsList();
  }
}

function updateLessonsList() {
  const lessonsList = document.getElementById('lessons-list');
  lessonsList.innerHTML = '';
  if (handbook.currentChapter === -1) return;
  handbook.chapters[handbook.currentChapter].lessons.forEach((lesson, index) => {
    const lessonItem = document.createElement('div');
    lessonItem.classList.add('lesson-item');
    lessonItem.innerHTML = `
      <i class="fas fa-file-alt"></i>
      <span>${lesson.name}</span>
    `;
    lessonsList.appendChild(lessonItem);
  });
}

function downloadFile(content, filename, type) {
  const blob = new Blob([content], {type});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function generateHandbookHTML() {
  let html = `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${handbook.title}</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    :root {
      --primary: ${handbook.primaryColor};
      --secondary: ${handbook.secondaryColor};
    }
    body {
      font-family: sans-serif;
      color: #333;
    }
    .cover {
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      height: 300px;
      color: white;
      text-align: center;
      padding: 50px;
    }
    .content {
      padding: 20px;
    }
  </style>
</head>
<body>
  <div class="cover">
    <h1>${handbook.title}</h1>
    <p>${handbook.subtitle}</p>
    <p>Автор: ${handbook.author}</p>
    <p>Дата: ${handbook.date}</p>
  </div>
  <div class="content">
  `;
  handbook.chapters.forEach(chapter => {
    html += `
      <h2><i class="${chapter.icon}"></i> ${chapter.name}</h2>
      <p>${chapter.description}</p>
    `;
    chapter.lessons.forEach(lesson => {
      html += `
        <h3>${lesson.name}</h3>
        <p>${lesson.description}</p>
      `;
    });
  });
  handbook.interactive.forEach(item => {
    html += item.content;
  });
  if (handbook.files.length > 0) {
    html += `<h2>Файлы</h2>`;
    handbook.files.forEach(file => {
      html += `<p>${file.name}</p>`;
    });
  }
  html += `
  </div>
</body>
</html>
  `;
  return html;
}

document.addEventListener('DOMContentLoaded', () => {
  const startOptions = document.querySelectorAll('.start-option');
  const templatesContainer = document.getElementById('templates-container');
  const importContainer = document.getElementById('import-container');
  let selectedTemplate = null;
  startOptions.forEach(option => {
    option.addEventListener('click', () => {
      startOptions.forEach(o => o.classList.remove('active'));
      option.classList.add('active');
      templatesContainer.style.display = 'none';
      importContainer.style.display = 'none';
      if (option.id === 'option-template') {
        templatesContainer.style.display = 'block';
      } else if (option.id === 'option-import') {
        importContainer.style.display = 'block';
      }
    });
  });
  const templateCards = document.querySelectorAll('.template-card');
  templateCards.forEach(card => {
    card.addEventListener('click', () => {
      templateCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      selectedTemplate = card.dataset.template;
    });
  });
  const startCreatingBtn = document.getElementById('start-creating');
  startCreatingBtn.addEventListener('click', () => {
    const activeOption = document.querySelector('.start-option.active');
    if (activeOption.id === 'option-template' && selectedTemplate) {
      Object.assign(handbook, presets[selectedTemplate]);
    } else if (activeOption.id === 'option-import') {
      const importOption = document.querySelector('.import-option.active');
      if (importOption && importOption.id === 'import-json') {
        document.getElementById('json-file').click();
      } else {
        // text import
      }
    }
    document.getElementById('handbook-title').value = handbook.title;
    document.getElementById('handbook-subtitle').value = handbook.subtitle;
    document.getElementById('handbook-author').value = handbook.author;
    document.getElementById('primary-color').value = handbook.primaryColor;
    document.getElementById('secondary-color').value = handbook.secondaryColor;
    document.getElementById('start-modal').style.display = 'none';
    document.getElementById('main-interface').style.display = 'flex';
    updatePreview();
    updateChaptersList();
    updateLessonsList();
  });
  const jsonFile = document.getElementById('json-file');
  jsonFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      handbook = JSON.parse(e.target.result);
      startCreatingBtn.click();
    };
    reader.readAsText(file);
  });
  const importOptions = document.querySelectorAll('.import-option');
  importOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      importOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
    });
  });
  document.getElementById('handbook-title').addEventListener('input', (e) => {
    handbook.title = e.target.value;
    updatePreview();
  });
  document.getElementById('handbook-subtitle').addEventListener('input', (e) => {
    handbook.subtitle = e.target.value;
    updatePreview();
  });
  document.getElementById('handbook-author').addEventListener('input', (e) => {
    handbook.author = e.target.value;
    updatePreview();
  });
  document.getElementById('primary-color').addEventListener('input', (e) => {
    handbook.primaryColor = e.target.value;
    updatePreview();
  });
  document.getElementById('secondary-color').addEventListener('input', (e) => {
    handbook.secondaryColor = e.target.value;
    updatePreview();
  });
  const coverOptions = document.querySelectorAll('.cover-option');
  coverOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      coverOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      handbook.coverType = opt.dataset.cover;
      if (handbook.coverType === 'image') {
        document.getElementById('cover-image').click();
      }
      updatePreview();
    });
  });
  document.getElementById('cover-image').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handbook.coverImage = e.target.result;
        updatePreview();
      };
      reader.readAsDataURL(file);
    }
  });
  document.getElementById('add-chapter-btn').addEventListener('click', () => {
    document.getElementById('chapter-modal').style.display = 'flex';
  });
  document.getElementById('cancel-chapter').addEventListener('click', () => {
    document.getElementById('chapter-modal').style.display = 'none';
  });
  document.getElementById('close-chapter-modal').addEventListener('click', () => {
    document.getElementById('chapter-modal').style.display = 'none';
  });
  const chapterIconOptions = document.querySelectorAll('.icon-selector .icon-option');
  chapterIconOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      chapterIconOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
    });
  });
  document.getElementById('save-chapter').addEventListener('click', () => {
    const name = document.getElementById('chapter-name').value;
    const description = document.getElementById('chapter-description').value;
    let icon = 'fa-book';
    chapterIconOptions.forEach(opt => {
      if (opt.classList.contains('active')) {
        icon = opt.dataset.icon;
      }
    });
    handbook.chapters.push({
      name,
      description,
      icon,
      lessons: []
    });
    updateChaptersList();
    updatePreview();
    document.getElementById('chapter-modal').style.display = 'none';
    document.getElementById('chapter-name').value = '';
    document.getElementById('chapter-description').value = '';
    chapterIconOptions[0].classList.add('active');
    chapterIconOptions.forEach((opt, idx) => {
      if (idx > 0) opt.classList.remove('active');
    });
  });
  document.getElementById('add-lesson-btn').addEventListener('click', () => {
    if (handbook.currentChapter === -1) {
      alert('Сначала добавьте главу');
      return;
    }
    document.getElementById('lesson-modal').style.display = 'flex';
  });
  document.getElementById('cancel-lesson').addEventListener('click', () => {
    document.getElementById('lesson-modal').style.display = 'none';
  });
  document.getElementById('close-lesson-modal').addEventListener('click', () => {
    document.getElementById('lesson-modal').style.display = 'none';
  });
  const lessonTypeOptions = document.querySelectorAll('.lesson-type-selector .type-option');
  lessonTypeOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      lessonTypeOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
    });
  });
  document.getElementById('save-lesson').addEventListener('click', () => {
    const name = document.getElementById('lesson-name').value;
    const description = document.getElementById('lesson-description').value;
    const duration = document.getElementById('lesson-duration').value;
    let type = 'text';
    lessonTypeOptions.forEach(opt => {
      if (opt.classList.contains('active')) {
        type = opt.dataset.type;
      }
    });
    handbook.chapters[handbook.currentChapter].lessons.push({
      name,
      description,
      duration,
      type
    });
    updateLessonsList();
    updatePreview();
    document.getElementById('lesson-modal').style.display = 'none';
    document.getElementById('lesson-name').value = '';
    document.getElementById('lesson-description').value = '';
    document.getElementById('lesson-duration').value = '30';
    lessonTypeOptions[0].classList.add('active');
    lessonTypeOptions.forEach((opt, idx) => {
      if (idx > 0) opt.classList.remove('active');
    });
  });
  const interactiveElements = document.querySelectorAll('.interactive-element');
  interactiveElements.forEach(el => {
    el.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', el.dataset.type);
    });
  });
  const handbookContent = document.getElementById('handbook-content');
  handbookContent.addEventListener('dragover', (e) => {
    e.preventDefault();
  });
  handbookContent.addEventListener('drop', (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('text/plain');
    switch (type) {
      case 'quiz':
        document.getElementById('quiz-modal').style.display = 'flex';
        quizData = {
          title: 'Проверочный тест',
          description: 'Проверьте свои знания',
          questions: [
            {
              text: '',
              answers: [
                {text: '', correct: true},
                {text: '', correct: false}
              ]
            }
          ]
        };
        document.getElementById('quiz-title').value = quizData.title;
        document.getElementById('quiz-description').value = quizData.description;
        updateQuizModal();
        break;
     case 'code':
        handbook.interactive.push({
          type: 'code',
          content: '<div class="code-editor"><textarea placeholder="Напишите код здесь"></textarea></div>'
        });
        updatePreview();
        break;
      case 'file':
        document.getElementById('file-modal').style.display = 'flex';
        break;
    }
  });
  let quizData = {
    title: 'Проверочный тест',
    description: 'Проверьте свои знания',
    questions: [
      {
        text: 'Что означает аббревиатура HTML?',
        answers: [
          {text: 'Hyper Text Markup Language', correct: true},
          {text: 'High Tech Modern Language', correct: false},
          {text: 'Hyper Transfer Markup Language', correct: false}
        ]
      }
    ]
  };
  function updateQuizModal() {
    const container = document.getElementById('quiz-questions-container');
    container.innerHTML = '';
    quizData.questions.forEach((q, qIndex) => {
      const qElem = document.createElement('div');
      qElem.classList.add('quiz-question');
      qElem.dataset.questionIndex = qIndex;
      qElem.innerHTML = `
        <div class="question-header">
          <div class="question-number">Вопрос ${qIndex + 1}</div>
          <button class="btn-icon delete-question" title="Удалить вопрос">
            <i class="fas fa-trash"></i>
          </button>
        </div>
        <div class="control-group">
          <label class="control-label">Текст вопроса</label>
          <input type="text" class="question-text" value="${q.text}">
        </div>
        <div class="control-group">
          <label class="control-label">Варианты ответов</label>
          <div class="answer-options"></div>
          <button class="btn btn-small add-answer" data-question-index="${qIndex}">
            <i class="fas fa-plus"></i> Добавить вариант
          </button>
        </div>
      `;
      const answerOptions = qElem.querySelector('.answer-options');
      q.answers.forEach((a, aIndex) => {
        const aElem = document.createElement('div');
        aElem.classList.add('answer-option');
        aElem.innerHTML = `
          <div class="answer-input-group">
            <input type="radio" name="question-${qIndex}-correct" value="${aIndex}" ${a.correct ? 'checked' : ''}>
            <input type="text" class="answer-text" value="${a.text}">
            <button class="btn-icon remove-answer" title="Удалить вариант">
              <i class="fas fa-times"></i>
            </button>
          </div>
        `;
        answerOptions.appendChild(aElem);
      });
      container.appendChild(qElem);
    });
    document.querySelectorAll('.delete-question').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const qIndex = parseInt(e.target.closest('.quiz-question').dataset.questionIndex);
        quizData.questions.splice(qIndex, 1);
        updateQuizModal();
      });
    });
    document.querySelectorAll('.add-answer').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const qIndex = parseInt(e.target.dataset.questionIndex);
        quizData.questions[qIndex].answers.push({text: '', correct: false});
        updateQuizModal();
      });
    });
    document.querySelectorAll('.remove-answer').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const aOption = e.target.closest('.answer-option');
        const qElem = aOption.closest('.quiz-question');
        const qIndex = parseInt(qElem.dataset.questionIndex);
        const aIndex = Array.from(qElem.querySelectorAll('.answer-option')).indexOf(aOption);
        quizData.questions[qIndex].answers.splice(aIndex, 1);
        updateQuizModal();
      });
    });
    document.querySelectorAll('.question-text').forEach(input => {
      input.addEventListener('input', (e) => {
        const qIndex = parseInt(e.target.closest('.quiz-question').dataset.questionIndex);
        quizData.questions[qIndex].text = e.target.value;
      });
    });
    document.querySelectorAll('.answer-text').forEach(input => {
      input.addEventListener('input', (e) => {
        const aOption = e.target.closest('.answer-option');
        const qElem = aOption.closest('.quiz-question');
        const qIndex = parseInt(qElem.dataset.questionIndex);
        const aIndex = Array.from(qElem.querySelectorAll('.answer-option')).indexOf(aOption);
        quizData.questions[qIndex].answers[aIndex].text = e.target.value;
      });
    });
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        const qIndex = parseInt(e.target.name.split('-')[1]);
        const aIndex = parseInt(e.target.value);
        quizData.questions[qIndex].answers.forEach((a, i) => {
          a.correct = i === aIndex;
        });
      });
    });
  }
  document.getElementById('quiz-title').addEventListener('input', (e) => {
    quizData.title = e.target.value;
  });
  document.getElementById('quiz-description').addEventListener('input', (e) => {
    quizData.description = e.target.value;
  });
  document.getElementById('add-question-btn').addEventListener('click', () => {
    quizData.questions.push({
      text: '',
      answers: [
        {text: '', correct: true},
        {text: '', correct: false}
      ]
    });
    updateQuizModal();
  });
  document.getElementById('save-quiz').addEventListener('click', () => {
    let quizHTML = `
      <div class="quiz">
        <h3>${quizData.title}</h3>
        <p>${quizData.description}</p>
        <form>
    `;
    quizData.questions.forEach((q, qIndex) => {
      quizHTML += `
        <div class="question">
          <p>${q.text}</p>
        `;
      q.answers.forEach((a, aIndex) => {
        quizHTML += `
          <label>
            <input type="radio" name="q${qIndex}">
            ${a.text}
          </label>
        `;
      });
      quizHTML += `</div>`;
    });
    quizHTML += `
          <button type="submit">Submit</button>
        </form>
      </div>
    `;
    handbook.interactive.push({
      type: 'quiz',
      content: quizHTML
    });
    updatePreview();
    document.getElementById('quiz-modal').style.display = 'none';
  });
  document.getElementById('cancel-quiz').addEventListener('click', () => {
    document.getElementById('quiz-modal').style.display = 'none';
  });
  document.getElementById('close-quiz-modal').addEventListener('click', () => {
    document.getElementById('quiz-modal').style.display = 'none';
  });
  document.getElementById('cancel-file').addEventListener('click', () => {
    document.getElementById('file-modal').style.display = 'none';
  });
  document.getElementById('close-file-modal').addEventListener('click', () => {
    document.getElementById('file-modal').style.display = 'none';
  });
  const fileTypeOptions = document.querySelectorAll('.file-type-selector .file-type-option');
  fileTypeOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      fileTypeOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
    });
  });
  document.getElementById('save-file').addEventListener('click', () => {
    const name = document.getElementById('file-name').value;
    const description = document.getElementById('file-description').value;
    let type = 'document';
    fileTypeOptions.forEach(opt => {
      if (opt.classList.contains('active')) {
        type = opt.dataset.type;
      }
    });
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handbook.files.push({
          name: name || file.name,
          description,
          type,
          data: e.target.result,
          filename: file.name
        });
        updatePreview();
      };
      reader.readAsDataURL(file);
    } else {
      handbook.files.push({
        name,
        description,
        type
      });
      updatePreview();
    }
    document.getElementById('file-modal').style.display = 'none';
  });
  document.getElementById('file-upload-area').addEventListener('click', () => {
    document.getElementById('file-input').click();
  });
  document.getElementById('file-input').addEventListener('change', (e) => {
    const selectedFiles = document.getElementById('selected-files');
    selectedFiles.innerHTML = '';
    Array.from(e.target.files).forEach(file => {
      const div = document.createElement('div');
      div.textContent = file.name;
      selectedFiles.appendChild(div);
    });
  });
  document.getElementById('export-btn').addEventListener('click', () => {
    document.getElementById('export-modal').style.display = 'flex';
  });
  document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('export-modal').style.display = 'none';
  });
  document.getElementById('export-html').addEventListener('click', () => {
    const html = generateHandbookHTML();
    downloadFile(html, 'handbook.html', 'text/html');
    document.getElementById('export-modal').style.display = 'none';
  });
  document.getElementById('export-json').addEventListener('click', () => {
    const json = JSON.stringify(handbook, null, 2);
    downloadFile(json, 'handbook.json', 'application/json');
    document.getElementById('export-modal').style.display = 'none';
  });
  document.getElementById('export-pdf').addEventListener('click', () => {
    window.print();
    document.getElementById('export-modal').style.display = 'none';
  });
  document.getElementById('save-btn').addEventListener('click', () => {
    const json = JSON.stringify(handbook, null, 2);
    downloadFile(json, 'project.json', 'application/json');
  });
  document.getElementById('share-btn').addEventListener('click', () => {
    alert('Share functionality not implemented');
  });
  document.getElementById('reset-btn').addEventListener('click', () => {
    handbook = {
      title: 'Новый хендбук',
      subtitle: 'Добавьте описание',
      author: '',
      date: new Date().toLocaleDateString('ru-RU'),
      primaryColor: '#2F80ED',
      secondaryColor: '#6FCF97',
      coverType: 'gradient',
      coverImage: null,
      chapters: [],
      currentChapter: -1,
      interactive: [],
      files: [],
      features: handbook.features
    };
    updatePreview();
    updateChaptersList();
    updateLessonsList();
  });
  document.getElementById('preview-toggle').addEventListener('click', () => {
    const elem = document.getElementById('handbook');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  });
  document.getElementById('toggle-editor').addEventListener('click', () => {
    const content = document.getElementById('handbook-content');
    content.contentEditable = content.contentEditable === 'true' ? 'false' : 'true';
  });
  document.getElementById('quick-start-btn').addEventListener('click', () => {
    document.getElementById('quickstart-modal').style.display = 'flex';
  });
  document.getElementById('cancel-quickstart').addEventListener('click', () => {
    document.getElementById('quickstart-modal').style.display = 'none';
  });
  document.getElementById('close-quickstart').addEventListener('click', () => {
    document.getElementById('quickstart-modal').style.display = 'none';
  });
  const quickstartOptions = document.querySelectorAll('.quickstart-option');
  let selectedPreset = null;
  quickstartOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      quickstartOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      selectedPreset = opt.dataset.preset;
    });
  });
  document.getElementById('apply-quickstart').addEventListener('click', () => {
    if (selectedPreset) {
      Object.assign(handbook, presets[selectedPreset]);
      document.getElementById('handbook-title').value = handbook.title;
      document.getElementById('handbook-subtitle').value = handbook.subtitle;
      updatePreview();
      updateChaptersList();
      updateLessonsList();
    }
    document.getElementById('quickstart-modal').style.display = 'none';
  });
  document.getElementById('new-handbook-btn').addEventListener('click', () => {
    document.getElementById('start-modal').style.display = 'flex';
  });
  document.getElementById('manage-chapters').addEventListener('click', () => {
    alert('Manage chapters not implemented');
  });
  document.getElementById('import-lessons').addEventListener('click', () => {
    alert('Import lessons not implemented');
  });
});
// script.js

let handbook = {
  title: 'Новый хендбук',
  subtitle: 'Добавьте описание',
  author: '',
  date: new Date().toLocaleDateString('ru-RU'),
  primaryColor: '#2F80ED',
  secondaryColor: '#6FCF97',
  coverType: 'gradient',
  coverImage: null,
  chapters: [],
  currentChapter: -1,
  interactive: [],
  files: [],
  features: {
    threeD: true,
    progress: true,
    drag: false,
    dark: false
  }
};

function getFileIcon(type) {
  switch (type) {
    case 'document': return 'fas fa-file-pdf';
    case 'archive': return 'fas fa-file-archive';
    case 'image': return 'fas fa-file-image';
    case 'code': return 'fas fa-file-code';
    default: return 'fas fa-file';
  }
}

function updatePreview() {
  document.getElementById('preview-title').textContent = handbook.title || 'Новый хендбук';
  document.getElementById('preview-subtitle').textContent = handbook.subtitle || 'Добавьте описание';
  document.getElementById('preview-author').textContent = handbook.author ? 'Автор: ' + handbook.author : '';
  document.getElementById('preview-date').textContent = handbook.date ? handbook.date : '';
  document.documentElement.style.setProperty('--primary', handbook.primaryColor);
  document.documentElement.style.setProperty('--secondary', handbook.secondaryColor);
  
  const cover = document.getElementById('handbook-cover');
  const coverImageContainer = document.getElementById('cover-image-container');
  const coverPattern = document.getElementById('cover-pattern');
  
  cover.style.background = '';
  coverImageContainer.style.display = 'none';
  coverPattern.style.display = 'none';
  
  if (handbook.coverType === 'gradient') {
    cover.style.background = `linear-gradient(135deg, ${handbook.primaryColor}, ${handbook.secondaryColor})`;
  } else if (handbook.coverType === 'pattern') {
    coverPattern.style.display = 'block';
  } else if (handbook.coverType === 'image' && handbook.coverImage) {
    coverImageContainer.style.backgroundImage = `url(${handbook.coverImage})`;
    coverImageContainer.style.backgroundSize = 'cover';
    coverImageContainer.style.display = 'block';
  }
  
  const contentContainer = document.getElementById('content-container');
  contentContainer.innerHTML = '';
  
  handbook.chapters.forEach(chapter => {
    const chapterElem = document.createElement('div');
    chapterElem.classList.add('chapter');
    chapterElem.innerHTML = `
      <h2><i class="${chapter.icon}"></i> ${chapter.name}</h2>
      <p>${chapter.description}</p>
    `;
    
    const lessonsList = document.createElement('div');
    lessonsList.classList.add('lessons');
    
    chapter.lessons.forEach(lesson => {
      const lessonElem = document.createElement('div');
      lessonElem.classList.add('lesson');
      lessonElem.innerHTML = `
        <h3>${lesson.name}</h3>
        <p>${lesson.description}</p>
        <span>${lesson.duration} минут</span>
        <span>Тип: ${lesson.type}</span>
      `;
      lessonsList.appendChild(lessonElem);
    });
    
    chapterElem.appendChild(lessonsList);
    contentContainer.appendChild(chapterElem);
  });
  
  const interactiveContainer = document.getElementById('interactive-container');
  interactiveContainer.innerHTML = '';
  
  handbook.interactive.forEach(item => {
    const itemElem = document.createElement('div');
    itemElem.classList.add('interactive-item', item.type);
    itemElem.innerHTML = item.content;
    interactiveContainer.appendChild(itemElem);
  });
  
  const filesSection = document.getElementById('files-section');
  const filesList = document.getElementById('files-list');
  filesList.innerHTML = '';
  
  if (handbook.files.length > 0) {
    filesSection.style.display = 'block';
    handbook.files.forEach((file, index) => {
      const fileElem = document.createElement('div');
      fileElem.classList.add('file-item');
      fileElem.dataset.fileIndex = index;
      fileElem.innerHTML = `
        <div class="file-icon">
          <i class="${getFileIcon(file.type)}"></i>
        </div>
        <div class="file-info">
          <div class="file-name">${file.name}</div>
          <div class="file-description">${file.description}</div>
          <div class="file-size">${formatFileSize(file.size)}</div>
        </div>
        <button class="btn-icon download-file-btn" title="Скачать файл" data-file-index="${index}">
          <i class="fas fa-download"></i>
        </button>
      `;
      filesList.appendChild(fileElem);
    });
  } else {
    filesSection.style.display = 'none';
  }
  
  document.getElementById('chapters-count').textContent = handbook.chapters.length + ' глав';
  const lessonsCount = handbook.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0);
  document.getElementById('lessons-count').textContent = lessonsCount + ' уроков';
  document.getElementById('files-count').textContent = handbook.files.length + ' файлов';
  
  if (handbook.chapters.length > 0 || handbook.interactive.length > 0 || handbook.files.length > 0) {
    document.getElementById('empty-state').style.display = 'none';
  } else {
    document.getElementById('empty-state').style.display = 'block';
  }
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Байт';
  const k = 1024;
  const sizes = ['Байт', 'КБ', 'МБ', 'ГБ'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function updateChaptersList() {
  const chaptersList = document.getElementById('chapters-list');
  chaptersList.innerHTML = '';
  
  handbook.chapters.forEach((chapter, index) => {
    const chapterItem = document.createElement('div');
    chapterItem.classList.add('chapter-item');
    if (index === handbook.currentChapter) {
      chapterItem.classList.add('active');
    }
    chapterItem.innerHTML = `
      <i class="${chapter.icon}"></i>
      <span>${chapter.name}</span>
    `;
    
    chapterItem.addEventListener('click', () => {
      handbook.currentChapter = index;
      document.getElementById('current-chapter-name').textContent = chapter.name;
      updateChaptersList();
      updateLessonsList();
    });
    
    chaptersList.appendChild(chapterItem);
  });
  
  if (handbook.currentChapter === -1 && handbook.chapters.length > 0) {
    handbook.currentChapter = 0;
    document.getElementById('current-chapter-name').textContent = handbook.chapters[0].name;
    updateChaptersList();
    updateLessonsList();
  }
}

function updateLessonsList() {
  const lessonsList = document.getElementById('lessons-list');
  lessonsList.innerHTML = '';
  
  if (handbook.currentChapter === -1) return;
  
  handbook.chapters[handbook.currentChapter].lessons.forEach((lesson, index) => {
    const lessonItem = document.createElement('div');
    lessonItem.classList.add('lesson-item');
    lessonItem.innerHTML = `
      <i class="fas fa-file-alt"></i>
      <span>${lesson.name}</span>
    `;
    lessonsList.appendChild(lessonItem);
  });
}

function downloadFile(content, filename, type) {
  const blob = new Blob([content], {type});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function generateHandbookHTML() {
  let html = `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${handbook.title}</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    :root {
      --primary: ${handbook.primaryColor};
      --secondary: ${handbook.secondaryColor};
    }
    body {
      font-family: sans-serif;
      color: #333;
    }
    .cover {
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      height: 300px;
      color: white;
      text-align: center;
      padding: 50px;
    }
    .content {
      padding: 20px;
    }
  </style>
</head>
<body>
  <div class="cover">
    <h1>${handbook.title}</h1>
    <p>${handbook.subtitle}</p>
    <p>Автор: ${handbook.author}</p>
    <p>Дата: ${handbook.date}</p>
  </div>
  <div class="content">
  `;
  
  handbook.chapters.forEach(chapter => {
    html += `
      <h2><i class="${chapter.icon}"></i> ${chapter.name}</h2>
      <p>${chapter.description}</p>
    `;
    
    chapter.lessons.forEach(lesson => {
      html += `
        <h3>${lesson.name}</h3>
        <p>${lesson.description}</p>
      `;
    });
  });
  
  handbook.interactive.forEach(item => {
    html += item.content;
  });
  
  if (handbook.files.length > 0) {
    html += `<h2>Файлы</h2>`;
    handbook.files.forEach(file => {
      html += `<p>${file.name}</p>`;
    });
  }
  
  html += `
  </div>
</body>
</html>
  `;
  return html;
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  // Начальное окно
  const startOptions = document.querySelectorAll('.start-option');
  const templatesContainer = document.getElementById('templates-container');
  const importContainer = document.getElementById('import-container');
  let selectedTemplate = null;
  
  startOptions.forEach(option => {
    option.addEventListener('click', () => {
      startOptions.forEach(o => o.classList.remove('active'));
      option.classList.add('active');
      templatesContainer.style.display = 'none';
      importContainer.style.display = 'none';
      
      if (option.id === 'option-template') {
        templatesContainer.style.display = 'block';
      } else if (option.id === 'option-import') {
        importContainer.style.display = 'block';
      }
    });
  });
  
  const templateCards = document.querySelectorAll('.template-card');
  templateCards.forEach(card => {
    card.addEventListener('click', () => {
      templateCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      selectedTemplate = card.dataset.template;
    });
  });
  
  const startCreatingBtn = document.getElementById('start-creating');
  startCreatingBtn.addEventListener('click', () => {
    const activeOption = document.querySelector('.start-option.active');
    
    if (activeOption.id === 'option-template' && selectedTemplate) {
      Object.assign(handbook, presets[selectedTemplate]);
    } else if (activeOption.id === 'option-import') {
      const importOption = document.querySelector('.import-option.active');
      if (importOption && importOption.id === 'import-json') {
        document.getElementById('json-file').click();
      }
      return;
    }
    
    initializeEditor();
  });
  
  const jsonFile = document.getElementById('json-file');
  jsonFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        Object.assign(handbook, importedData);
        initializeEditor();
      } catch (error) {
        alert('Ошибка при загрузке файла: неверный формат JSON');
      }
    };
    reader.readAsText(file);
  });
  
  const importOptions = document.querySelectorAll('.import-option');
  importOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      importOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
    });
  });
  
  // Основные настройки
  document.getElementById('handbook-title').addEventListener('input', (e) => {
    handbook.title = e.target.value;
    updatePreview();
  });
  
  document.getElementById('handbook-subtitle').addEventListener('input', (e) => {
    handbook.subtitle = e.target.value;
    updatePreview();
  });
  
  document.getElementById('handbook-author').addEventListener('input', (e) => {
    handbook.author = e.target.value;
    updatePreview();
  });
  
  document.getElementById('primary-color').addEventListener('input', (e) => {
    handbook.primaryColor = e.target.value;
    updatePreview();
  });
  
  document.getElementById('secondary-color').addEventListener('input', (e) => {
    handbook.secondaryColor = e.target.value;
    updatePreview();
  });
  
  const coverOptions = document.querySelectorAll('.cover-option');
  coverOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      coverOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      handbook.coverType = opt.dataset.cover;
      
      if (handbook.coverType === 'image') {
        document.getElementById('cover-image').click();
      } else {
        handbook.coverImage = null;
        updatePreview();
      }
    });
  });
  
  document.getElementById('cover-image').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Проверка размера файла (макс 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Максимальный размер файла 5MB');
      e.target.value = '';
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      handbook.coverImage = e.target.result;
      updatePreview();
    };
    reader.readAsDataURL(file);
  });
  
  // Добавление главы
  document.getElementById('add-chapter-btn').addEventListener('click', () => {
    resetChapterModal();
    document.getElementById('chapter-modal').style.display = 'flex';
  });
  
  document.getElementById('cancel-chapter').addEventListener('click', () => {
    document.getElementById('chapter-modal').style.display = 'none';
  });
  
  document.getElementById('close-chapter-modal').addEventListener('click', () => {
    document.getElementById('chapter-modal').style.display = 'none';
  });
  
  const chapterIconOptions = document.querySelectorAll('.icon-selector .icon-option');
  chapterIconOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      chapterIconOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
    });
  });
  
  document.getElementById('save-chapter').addEventListener('click', () => {
    const name = document.getElementById('chapter-name').value.trim();
    const description = document.getElementById('chapter-description').value.trim();
    
    if (!name) {
      alert('Введите название главы');
      return;
    }
    
    let icon = 'fa-book';
    chapterIconOptions.forEach(opt => {
      if (opt.classList.contains('active')) {
        icon = opt.dataset.icon;
      }
    });
    
    handbook.chapters.push({
      name,
      description,
      icon,
      lessons: []
    });
    
    updateChaptersList();
    updatePreview();
    document.getElementById('chapter-modal').style.display = 'none';
  });
  
  // Добавление урока
  document.getElementById('add-lesson-btn').addEventListener('click', () => {
    if (handbook.currentChapter === -1) {
      alert('Сначала добавьте главу');
      return;
    }
    resetLessonModal();
    document.getElementById('lesson-modal').style.display = 'flex';
  });
  
  document.getElementById('cancel-lesson').addEventListener('click', () => {
    document.getElementById('lesson-modal').style.display = 'none';
  });
  
  document.getElementById('close-lesson-modal').addEventListener('click', () => {
    document.getElementById('lesson-modal').style.display = 'none';
  });
  
  const lessonTypeOptions = document.querySelectorAll('.lesson-type-selector .type-option');
  lessonTypeOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      lessonTypeOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
    });
  });
  
  document.getElementById('save-lesson').addEventListener('click', () => {
    const name = document.getElementById('lesson-name').value.trim();
    const description = document.getElementById('lesson-description').value.trim();
    const duration = parseInt(document.getElementById('lesson-duration').value);
    
    if (!name) {
      alert('Введите название урока');
      return;
    }
    
    let type = 'text';
    lessonTypeOptions.forEach(opt => {
      if (opt.classList.contains('active')) {
        type = opt.dataset.type;
      }
    });
    
    handbook.chapters[handbook.currentChapter].lessons.push({
      name,
      description,
      duration: duration || 30,
      type
    });
    
    updateLessonsList();
    updatePreview();
    document.getElementById('lesson-modal').style.display = 'none';
  });
  
  // Интерактивные элементы - Drag and Drop
  const interactiveElements = document.querySelectorAll('.interactive-element');
  interactiveElements.forEach(el => {
    el.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', el.dataset.type);
    });
  });
  
  const handbookContent = document.getElementById('handbook-content');
  handbookContent.addEventListener('dragover', (e) => {
    e.preventDefault();
  });
  
  handbookContent.addEventListener('drop', (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('text/plain');
    
    switch (type) {
      case 'quiz':
        resetQuizModal();
        document.getElementById('quiz-modal').style.display = 'flex';
        break;
      case 'code':
        handbook.interactive.push({
          type: 'code',
          content: '<div class="code-editor"><textarea placeholder="Напишите код здесь"></textarea></div>'
        });
        updatePreview();
        break;
      case 'video':
        const videoUrl = prompt('Введите URL видео:');
        if (videoUrl) {
          handbook.interactive.push({
            type: 'video',
            content: `<div class="video-container"><iframe src="${videoUrl}" allowfullscreen></iframe></div>`
          });
          updatePreview();
        }
        break;
      case 'file':
        resetFileModal();
        document.getElementById('file-modal').style.display = 'flex';
        break;
    }
  });
  
  // Тест (Quiz)
  let quizData = {
    title: 'Проверочный тест',
    description: 'Проверьте свои знания',
    questions: [
      {
        text: 'Что означает аббревиатура HTML?',
        answers: [
          {text: 'Hyper Text Markup Language', correct: true},
          {text: 'High Tech Modern Language', correct: false},
          {text: 'Hyper Transfer Markup Language', correct: false}
        ]
      }
    ]
  };
  
  function resetQuizModal() {
    document.getElementById('quiz-title').value = 'Проверочный тест';
    document.getElementById('quiz-description').value = 'Проверьте свои знания';
    updateQuizModal();
  }
  
  function updateQuizModal() {
    const container = document.getElementById('quiz-questions-container');
    container.innerHTML = '';
    
    quizData.questions.forEach((q, qIndex) => {
      const qElem = document.createElement('div');
      qElem.classList.add('quiz-question');
      qElem.dataset.questionIndex = qIndex;
      qElem.innerHTML = `
        <div class="question-header">
          <div class="question-number">Вопрос ${qIndex + 1}</div>
          <button class="btn-icon delete-question" type="button" title="Удалить вопрос">
            <i class="fas fa-trash"></i>
          </button>
        </div>
        <div class="control-group">
          <label class="control-label">Текст вопроса</label>
          <input type="text" class="question-text" value="${q.text}" placeholder="Введите вопрос">
        </div>
        <div class="control-group">
          <label class="control-label">Варианты ответов</label>
          <div class="answer-options"></div>
          <button class="btn btn-small add-answer" type="button" data-question-index="${qIndex}">
            <i class="fas fa-plus"></i> Добавить вариант
          </button>
        </div>
      `;
      
      const answerOptions = qElem.querySelector('.answer-options');
      q.answers.forEach((a, aIndex) => {
        const aElem = document.createElement('div');
        aElem.classList.add('answer-option');
        aElem.innerHTML = `
          <div class="answer-input-group">
            <input type="radio" name="question-${qIndex}-correct" value="${aIndex}" ${a.correct ? 'checked' : ''}>
            <input type="text" class="answer-text" value="${a.text}" placeholder="Вариант ответа">
            <button class="btn-icon remove-answer" type="button" title="Удалить вариант">
              <i class="fas fa-times"></i>
            </button>
          </div>
        `;
        answerOptions.appendChild(aElem);
      });
      
      container.appendChild(qElem);
    });
    
    // Добавление обработчиков для вопросов
    container.querySelectorAll('.delete-question').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const qIndex = parseInt(e.target.closest('.quiz-question').dataset.questionIndex);
        quizData.questions.splice(qIndex, 1);
        updateQuizModal();
      });
    });
    
    container.querySelectorAll('.add-answer').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const qIndex = parseInt(e.target.dataset.questionIndex);
        quizData.questions[qIndex].answers.push({text: '', correct: false});
        updateQuizModal();
      });
    });
    
    container.querySelectorAll('.remove-answer').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const aOption = e.target.closest('.answer-option');
        const qElem = aOption.closest('.quiz-question');
        const qIndex = parseInt(qElem.dataset.questionIndex);
        const aIndex = Array.from(qElem.querySelectorAll('.answer-option')).indexOf(aOption);
        quizData.questions[qIndex].answers.splice(aIndex, 1);
        updateQuizModal();
      });
    });
    
    container.querySelectorAll('.question-text').forEach(input => {
      input.addEventListener('input', (e) => {
        const qIndex = parseInt(e.target.closest('.quiz-question').dataset.questionIndex);
        quizData.questions[qIndex].text = e.target.value;
      });
    });
    
    container.querySelectorAll('.answer-text').forEach(input => {
      input.addEventListener('input', (e) => {
        const aOption = e.target.closest('.answer-option');
        const qElem = aOption.closest('.quiz-question');
        const qIndex = parseInt(qElem.dataset.questionIndex);
        const aIndex = Array.from(qElem.querySelectorAll('.answer-option')).indexOf(aOption);
        quizData.questions[qIndex].answers[aIndex].text = e.target.value;
      });
    });
    
    container.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        const qIndex = parseInt(e.target.name.split('-')[1]);
        const aIndex = parseInt(e.target.value);
        quizData.questions[qIndex].answers.forEach((a, i) => {
          a.correct = i === aIndex;
        });
      });
    });
  }
  
  document.getElementById('add-question-btn').addEventListener('click', () => {
    quizData.questions.push({
      text: '',
      answers: [
        {text: '', correct: true},
        {text: '', correct: false}
      ]
    });
    updateQuizModal();
  });
  
  document.getElementById('save-quiz').addEventListener('click', () => {
    let quizHTML = `
      <div class="quiz">
        <h3>${quizData.title}</h3>
        <p>${quizData.description}</p>
        <form class="quiz-form">
    `;
    
    quizData.questions.forEach((q, qIndex) => {
      quizHTML += `
        <div class="question">
          <p><strong>Вопрос ${qIndex + 1}:</strong> ${q.text}</p>
        `;
      
      q.answers.forEach((a, aIndex) => {
        quizHTML += `
          <label class="answer-label">
            <input type="radio" name="q${qIndex}" value="${aIndex}">
            ${a.text}
          </label>
        `;
      });
      
      quizHTML += `</div>`;
    });
    
    quizHTML += `
          <button type="button" class="btn submit-quiz">Проверить ответы</button>
        </form>
      </div>
    `;
    
    handbook.interactive.push({
      type: 'quiz',
      content: quizHTML
    });
    
    updatePreview();
    document.getElementById('quiz-modal').style.display = 'none';
  });
  
  document.getElementById('cancel-quiz').addEventListener('click', () => {
    document.getElementById('quiz-modal').style.display = 'none';
  });
  
  document.getElementById('close-quiz-modal').addEventListener('click', () => {
    document.getElementById('quiz-modal').style.display = 'none';
  });
  
  // Файлы - исправленная функция
  function resetFileModal() {
    document.getElementById('file-name').value = '';
    document.getElementById('file-description').value = '';
    document.getElementById('file-input').value = '';
    document.getElementById('selected-files').innerHTML = '';
    
    // Сброс типа файла на первый вариант
    fileTypeOptions.forEach((opt, idx) => {
      if (idx === 0) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });
  }
  
  document.getElementById('cancel-file').addEventListener('click', () => {
    document.getElementById('file-modal').style.display = 'none';
    resetFileModal();
  });
  
  document.getElementById('close-file-modal').addEventListener('click', () => {
    document.getElementById('file-modal').style.display = 'none';
    resetFileModal();
  });
  
  const fileTypeOptions = document.querySelectorAll('.file-type-selector .file-type-option');
  fileTypeOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      fileTypeOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
    });
  });
  
  // Обработка загрузки файла
  document.getElementById('save-file').addEventListener('click', async () => {
    const name = document.getElementById('file-name').value.trim();
    const description = document.getElementById('file-description').value.trim();
    const fileInput = document.getElementById('file-input');
    const files = fileInput.files;
    
    if (files.length === 0) {
      alert('Пожалуйста, выберите файл');
      return;
    }
    
    if (!name) {
      alert('Введите название файла');
      return;
    }
    
    let type = 'document';
    fileTypeOptions.forEach(opt => {
      if (opt.classList.contains('active')) {
        type = opt.dataset.type;
      }
    });
    
    // Обработка каждого выбранного файла
    Array.from(files).forEach(file => {
      // Проверка размера файла (макс 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(`Файл "${file.name}" превышает максимальный размер 10MB`);
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        handbook.files.push({
          name: name || file.name,
          description,
          type,
          data: e.target.result,
          size: file.size,
          filename: file.name,
          mimeType: file.type
        });
        
        updatePreview();
        updateFilesManager();
      };
      reader.readAsDataURL(file);
    });
    
    document.getElementById('file-modal').style.display = 'none';
    resetFileModal();
  });
  
  // Загрузка файла через drag and drop
  const fileUploadArea = document.getElementById('file-upload-area');
  const fileInput = document.getElementById('file-input');
  
  fileUploadArea.addEventListener('click', () => {
    fileInput.click();
  });
  
  fileUploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    fileUploadArea.classList.add('dragover');
  });
  
  fileUploadArea.addEventListener('dragleave', () => {
    fileUploadArea.classList.remove('dragover');
  });
  
  fileUploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    fileUploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      fileInput.files = files;
      updateSelectedFiles();
    }
  });
  
  fileInput.addEventListener('change', updateSelectedFiles);
  
  function updateSelectedFiles() {
    const selectedFiles = document.getElementById('selected-files');
    selectedFiles.innerHTML = '';
    
    Array.from(fileInput.files).forEach(file => {
      const fileSize = formatFileSize(file.size);
      const fileType = file.type || 'unknown';
      
      const div = document.createElement('div');
      div.classList.add('selected-file');
      div.innerHTML = `
        <i class="fas fa-file"></i>
        <span class="file-name">${file.name}</span>
        <span class="file-size">${fileSize}</span>
      `;
      selectedFiles.appendChild(div);
    });
  }
  
  // Скачивание файлов
  document.addEventListener('click', (e) => {
    if (e.target.closest('.download-file-btn')) {
      const fileIndex = parseInt(e.target.closest('.download-file-btn').dataset.fileIndex);
      const file = handbook.files[fileIndex];
      
      if (file && file.data) {
        // Создаем ссылку для скачивания
        const link = document.createElement('a');
        link.href = file.data;
        link.download = file.filename || file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  });
  
  // Управление файлами
  function updateFilesManager() {
    const filesManagerList = document.getElementById('files-manager-list');
    filesManagerList.innerHTML = '';
    
    handbook.files.forEach((file, index) => {
      const fileElem = document.createElement('div');
      fileElem.classList.add('file-manager-item');
      fileElem.innerHTML = `
        <div class="file-info">
          <i class="${getFileIcon(file.type)}"></i>
          <div>
            <div class="file-name">${file.name}</div>
            <div class="file-details">${formatFileSize(file.size)} • ${file.type}</div>
          </div>
        </div>
        <div class="file-actions">
          <button class="btn-icon download-manager-file" data-file-index="${index}" title="Скачать">
            <i class="fas fa-download"></i>
          </button>
          <button class="btn-icon delete-file" data-file-index="${index}" title="Удалить">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;
      filesManagerList.appendChild(fileElem);
    });
    
    document.getElementById('total-files-count').textContent = `Всего файлов: ${handbook.files.length}`;
  }
  
  document.getElementById('add-file-direct').addEventListener('click', () => {
    resetFileModal();
    document.getElementById('file-modal').style.display = 'flex';
  });
  
  document.getElementById('close-files-manager').addEventListener('click', () => {
    document.getElementById('files-manager-modal').style.display = 'none';
  });
  
  document.getElementById('close-files-manager-btn').addEventListener('click', () => {
    document.getElementById('files-manager-modal').style.display = 'none';
  });
  
  // Обработка удаления файлов в менеджере
  document.addEventListener('click', (e) => {
    if (e.target.closest('.delete-file')) {
      const fileIndex = parseInt(e.target.closest('.delete-file').dataset.fileIndex);
      if (confirm('Удалить этот файл?')) {
        handbook.files.splice(fileIndex, 1);
        updatePreview();
        updateFilesManager();
      }
    }
    
    if (e.target.closest('.download-manager-file')) {
      const fileIndex = parseInt(e.target.closest('.download-manager-file').dataset.fileIndex);
      const file = handbook.files[fileIndex];
      
      if (file && file.data) {
        const link = document.createElement('a');
        link.href = file.data;
        link.download = file.filename || file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  });
  
  // Экспорт
  document.getElementById('export-btn').addEventListener('click', () => {
    document.getElementById('export-modal').style.display = 'flex';
  });
  
  document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('export-modal').style.display = 'none';
  });
  
  document.getElementById('export-html').addEventListener('click', () => {
    const html = generateHandbookHTML();
    downloadFile(html, `${handbook.title || 'handbook'}.html`, 'text/html');
    document.getElementById('export-modal').style.display = 'none';
  });
  
  document.getElementById('export-json').addEventListener('click', () => {
    const json = JSON.stringify(handbook, null, 2);
    downloadFile(json, `${handbook.title || 'handbook'}.json`, 'application/json');
    document.getElementById('export-modal').style.display = 'none';
  });
  
  document.getElementById('export-pdf').addEventListener('click', () => {
    alert('Для экспорта в PDF используйте функцию печати браузера (Ctrl+P)');
    document.getElementById('export-modal').style.display = 'none';
  });
  
  // Другие функции
  document.getElementById('save-btn').addEventListener('click', () => {
    const json = JSON.stringify(handbook, null, 2);
    downloadFile(json, 'project.json', 'application/json');
  });
  
  document.getElementById('share-btn').addEventListener('click', () => {
    const json = JSON.stringify(handbook, null, 2);
    const encoded = btoa(unescape(encodeURIComponent(json)));
    const shareUrl = `${window.location.origin}${window.location.pathname}?data=${encoded}`;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('Ссылка скопирована в буфер обмена! Поделитесь ей с другими.');
    }).catch(err => {
      alert('Ошибка при копировании ссылки: ' + err);
    });
  });
  
  document.getElementById('reset-btn').addEventListener('click', () => {
    if (confirm('Вы уверены? Все несохраненные изменения будут потеряны.')) {
      handbook = {
        title: 'Новый хендбук',
        subtitle: 'Добавьте описание',
        author: '',
        date: new Date().toLocaleDateString('ru-RU'),
        primaryColor: '#2F80ED',
        secondaryColor: '#6FCF97',
        coverType: 'gradient',
        coverImage: null,
        chapters: [],
        currentChapter: -1,
        interactive: [],
        files: [],
        features: handbook.features
      };
      
      document.getElementById('handbook-title').value = handbook.title;
      document.getElementById('handbook-subtitle').value = handbook.subtitle;
      document.getElementById('handbook-author').value = handbook.author;
      document.getElementById('primary-color').value = handbook.primaryColor;
      document.getElementById('secondary-color').value = handbook.secondaryColor;
      
      updatePreview();
      updateChaptersList();
      updateLessonsList();
    }
  });
  
  document.getElementById('preview-toggle').addEventListener('click', () => {
    const elem = document.getElementById('handbook');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  });
  
  document.getElementById('toggle-editor').addEventListener('click', () => {
    const content = document.getElementById('handbook-content');
    content.contentEditable = content.contentEditable === 'true' ? 'false' : 'true';
    alert(content.contentEditable === 'true' ? 'Режим правки включен' : 'Режим правки выключен');
  });
  
  // Быстрый старт
  document.getElementById('quick-start-btn').addEventListener('click', () => {
    document.getElementById('quickstart-modal').style.display = 'flex';
  });
  
  document.getElementById('cancel-quickstart').addEventListener('click', () => {
    document.getElementById('quickstart-modal').style.display = 'none';
  });
  
  document.getElementById('close-quickstart').addEventListener('click', () => {
    document.getElementById('quickstart-modal').style.display = 'none';
  });
  
  const quickstartOptions = document.querySelectorAll('.quickstart-option');
  let selectedPreset = null;
  
  quickstartOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      quickstartOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      selectedPreset = opt.dataset.preset;
    });
  });
  
  document.getElementById('apply-quickstart').addEventListener('click', () => {
    if (selectedPreset) {
      Object.assign(handbook, presets[selectedPreset]);
      document.getElementById('handbook-title').value = handbook.title;
      document.getElementById('handbook-subtitle').value = handbook.subtitle;
      updatePreview();
      updateChaptersList();
      updateLessonsList();
    }
    document.getElementById('quickstart-modal').style.display = 'none';
  });
  
  document.getElementById('new-handbook-btn').addEventListener('click', () => {
    document.getElementById('start-modal').style.display = 'flex';
  });
  
  document.getElementById('manage-chapters').addEventListener('click', () => {
    alert('Управление главами еще в разработке');
  });
  
  document.getElementById('import-lessons').addEventListener('click', () => {
    alert('Импорт уроков еще в разработке');
  });
  
  // Вспомогательные функции
  function initializeEditor() {
    document.getElementById('handbook-title').value = handbook.title;
    document.getElementById('handbook-subtitle').value = handbook.subtitle;
    document.getElementById('handbook-author').value = handbook.author;
    document.getElementById('primary-color').value = handbook.primaryColor;
    document.getElementById('secondary-color').value = handbook.secondaryColor;
    
    document.getElementById('start-modal').style.display = 'none';
    document.getElementById('main-interface').style.display = 'flex';
    
    updatePreview();
    updateChaptersList();
    updateLessonsList();
    updateFilesManager();
  }
  
  function resetChapterModal() {
    document.getElementById('chapter-name').value = '';
    document.getElementById('chapter-description').value = '';
    chapterIconOptions[0].classList.add('active');
    chapterIconOptions.forEach((opt, idx) => {
      if (idx > 0) opt.classList.remove('active');
    });
  }
  
  function resetLessonModal() {
    document.getElementById('lesson-name').value = '';
    document.getElementById('lesson-description').value = '';
    document.getElementById('lesson-duration').value = '30';
    lessonTypeOptions[0].classList.add('active');
    lessonTypeOptions.forEach((opt, idx) => {
      if (idx > 0) opt.classList.remove('active');
    });
  }
  
  // Инициализация при первой загрузке
  updatePreview();
});
const darkToggle = document.getElementById('enable-dark');

// загрузка сохранённого состояния
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    darkToggle.checked = true;
}

darkToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark');

    if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});
// Добавьте этот код в конец файла script.js, перед закрывающей скобкой

// Функция для переключения ночного режима
function toggleDarkMode() {
    const isDarkMode = document.getElementById('enable-dark').checked;
    document.body.classList.toggle('dark', isDarkMode);
    
    // Сохраняем состояние в объект handbook
    handbook.features.dark = isDarkMode;
    
    // Сохраняем в localStorage для сохранения между сессиями
    if (isDarkMode) {
        localStorage.setItem('handbook-dark-mode', 'true');
        // Обновляем цвета для темной темы
        document.documentElement.style.setProperty('--bg-primary', '#1a1a2e');
        document.documentElement.style.setProperty('--bg-secondary', '#16213e');
        document.documentElement.style.setProperty('--text-primary', '#ffffff');
        document.documentElement.style.setProperty('--text-secondary', '#b0b0b0');
        document.documentElement.style.setProperty('--border-color', '#2d3748');
    } else {
        localStorage.removeItem('handbook-dark-mode');
        // Возвращаем стандартные цвета
        document.documentElement.style.setProperty('--bg-primary', '#ffffff');
        document.documentElement.style.setProperty('--bg-secondary', '#f8f9fa');
        document.documentElement.style.setProperty('--text-primary', '#333333');
        document.documentElement.style.setProperty('--text-secondary', '#666666');
        document.documentElement.style.setProperty('--border-color', '#e0e0e0');
    }
    
    // Обновляем стили модальных окон
    updateModalStyles();
}

// Функция для обновления стилей модальных окон
function updateModalStyles() {
    const modals = document.querySelectorAll('.modal-content');
    const isDark = document.body.classList.contains('dark');
    
    modals.forEach(modal => {
        if (isDark) {
            modal.style.backgroundColor = '#1a1a2e';
            modal.style.color = '#ffffff';
        } else {
            modal.style.backgroundColor = '';
            modal.style.color = '';
        }
    });
}

// Функция для загрузки сохраненной темы
function loadSavedTheme() {
    const savedDarkMode = localStorage.getItem('handbook-dark-mode');
    
    if (savedDarkMode === 'true') {
        document.getElementById('enable-dark').checked = true;
        toggleDarkMode();
    } else {
        // Проверяем системные настройки пользователя
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // Если пользователь предпочитает темную тему в системе
            document.getElementById('enable-dark').checked = true;
            toggleDarkMode();
        }
    }
}

// Добавьте этот код в обработчик DOMContentLoaded, после всех других обработчиков событий
document.addEventListener('DOMContentLoaded', () => {
    // ... существующий код ...
    
    // Загружаем сохраненную тему
    loadSavedTheme();
    
    // Добавляем обработчик для чекбокса ночного режима
    document.getElementById('enable-dark').addEventListener('change', toggleDarkMode);
    
    // Обновляем состояние чекбокса при сбросе
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            // Не сбрасываем ночной режим при сбросе, сохраняем текущий выбор пользователя
            setTimeout(() => {
                document.getElementById('enable-dark').checked = handbook.features.dark;
                toggleDarkMode();
            }, 100);
        });
    }
    
    // Обновляем состояние чекбокса при импорте
    const jsonFile = document.getElementById('json-file');
    if (jsonFile) {
        jsonFile.addEventListener('change', (e) => {
            setTimeout(() => {
                document.getElementById('enable-dark').checked = handbook.features.dark;
                toggleDarkMode();
            }, 100);
        });
    }
});

// Обновляем функцию updatePreview для применения ночного режима
// Добавьте этот код внутрь функции updatePreview
function updatePreview() {
    // ... существующий код до обновления preview ...
    
    // Применяем ночной режим к preview
    const handbookPreview = document.getElementById('handbook');
    if (handbookPreview) {
        if (handbook.features.dark) {
            handbookPreview.classList.add('dark-mode');
            handbookPreview.style.setProperty('--preview-bg', '#1a1a2e');
            handbookPreview.style.setProperty('--preview-text', '#ffffff');
        } else {
            handbookPreview.classList.remove('dark-mode');
            handbookPreview.style.setProperty('--preview-bg', '');
            handbookPreview.style.setProperty('--preview-text', '');
        }
    }
    

}

