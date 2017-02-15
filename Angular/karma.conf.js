//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './app',

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-mocks/angular-mocks.js',  
      'bower_components/ng-file-upload/ng-file-upload.js',
      'app.js',
      'services/pagination.service.js',
      'directives/*.js',
      'components/version/*.js',
      'services/articles.service.js',
      'components/pagination/*.js',
      'components/articles/*.js',
      'services/*.js'
      //'components/**/*.js',
      //'view*/**/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
