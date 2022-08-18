// Основний модуль/The main module
import gulp from 'gulp';

// Імпорт шляхів/Import paths
import { path } from './gulp/config/path.js';

//Імп-т загальних плагінів/Importing Shared Plugins
import { plugins } from './gulp/config/plugins.js';

// Передаєм значення в глобальну перемінну/Passing values ​​to a global variable
global.app = {
  path: path,
  gulp: gulp,
  plugins: plugins,
};

// Імпорт задач/Import tasks
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';

// Слухач за змінами в файлах/File change watcher
function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

const mainTasks = gulp.parallel(copy, html, scss, js, images);

//Формування сценаріїв виконаних задач/Building scenarios for executing tasks
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);

// Експорт сценаріїв/Export scripts
export { dev };
export { build };

// Виконання сценарію за замовчуванням/Executing the Default Script
gulp.task('default', dev);
