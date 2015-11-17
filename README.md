# gulp-mcs
[mcss](https://github.com/leeluolee/mcss) plugin for gulp

## Installation

install package with NPM and add it to your development dependencies:

`npm install --save-dev gulp-mcs`

## Usage

```js
var mcss = require('gulp-mcs');

gulp.task('mcss', function() {
    gulp.src('./mcss/*.mcss')
        .pipe(mcss({
            // other options: https://github.com/leeluolee/mcss
        }))
        .pipe(gulp.dest('./css'))
})
```
