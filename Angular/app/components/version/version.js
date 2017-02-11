'use strict';

angular.module('angularWorkshop.version', [
  'angularWorkshop.version.interpolate-filter',
  'angularWorkshop.version.version-directive'
])

.value('version', '0.1');
