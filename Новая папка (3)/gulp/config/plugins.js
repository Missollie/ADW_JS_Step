import replace from 'gulp-replace'; // Поиск и замена
import plumber from 'gulp-plumber'; // Обработка ошибок
import notify from 'gulp-notify'; // Сообщения (подсказки)
import browsersync from 'browser-sync'; // Локальный сервер
import newer from 'gulp-newer'; // Проверка обновления
import concat from 'gulp-concat'; // Объединение несколько файлов в один (css, js)

// Экспорт объекта
export const plugins = {
  replace: replace,
  plumber: plumber,
  notify: notify,
  browsersync: browsersync,
  newer: newer,
  concat: concat,
};
