'use strict';

System.register(['angular', 'lodash'], function (_export, _context) {
  "use strict";

  var angular, _;

  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_lodash) {
      _ = _lodash.default;
    }],
    execute: function () {

      angular.module('grafana.directives').directive('netxmsObjectList', function () {

        return {
          restrict: 'E',
          scope: {
            getList: '&',
            selectedItem: '=',
            name: '@',
            inputPlaceholder: '@',
            onSelection: '&'
          },
          template: '<div class="netxms-object-list">' + '<input type="text"' + 'spellcheck="false"' + 'name="{{name}}"' + 'placeholder="{{inputPlaceholder}}"' + 'ng-model="inputValue"' + 'ng-change="inputChange()"' + 'ng-focus="inputFocus()"' + 'ng-blur="inputBlur($event)"' + 'class="gf-form-input' + ' width-25"' + 'input>' + '<ul ng-show="dropdownVisible">' + '<li ng-repeat="item in dropdownItems"' + 'ng-click="selectItem(item)"' + 'ng-mouseenter="setActive($index)"' + 'ng-mousedown="dropdownPressed()"' + 'ng-class="{\'active\': activeItemIndex === $index}"' + '>' + '<span>{{item.name}}</span>' + '</li>' + '</ul>' + '</div>',
          link: function link(scope, element) {
            var pressedDropdown = false;
            scope.activeItemIndex = 0;
            scope.inputValue = scope.selectedItem ? scope.selectedItem.name : '';
            scope.dropdownVisible = false;

            scope.$watch('dropdownItems', function (newValue, oldValue) {
              if (!angular.equals(newValue, oldValue)) scope.setActive(0);
            });

            scope.$watch('selectedItem', function (newValue, oldValue) {
              if (!angular.equals(newValue, oldValue)) {
                if (newValue) {
                  scope.inputValue = newValue.name;
                  scope.onSelection();
                }
              }
            });

            scope.setActive = function (itemIndex) {
              scope.activeItemIndex = itemIndex;
            };

            scope.inputChange = function () {
              scope.selectedItem = {};
              getFilteredList(scope.inputValue);
              showDropdown();
            };

            scope.inputFocus = function () {
              getFilteredList();
              scope.setActive(0);
              showDropdown();
            };

            scope.inputBlur = function (event) {
              if (pressedDropdown) {
                pressedDropdown = false;
                return;
              }
              hideDropdown();
            };

            scope.dropdownPressed = function () {
              pressedDropdown = true;
            };

            scope.selectItem = function (item) {
              scope.selectedItem = item;
              hideDropdown();
            };

            var getFilteredList = function getFilteredList(filterString) {
              scope.getList().then(function (items) {
                scope.dropdownItems = _.filter(items, function (item) {
                  return filterString == null ? true : item.name.toLowerCase().includes(filterString.toLowerCase());
                });
              });
            };

            var showDropdown = function showDropdown() {
              scope.dropdownVisible = true;
            };

            var hideDropdown = function hideDropdown() {
              scope.dropdownVisible = false;
            };

            var selectPreviousItem = function selectPreviousItem() {
              var prevIndex = scope.activeItemIndex - 1;
              if (prevIndex >= 0) scope.setActive(prevIndex);
            };

            var selectNextItem = function selectNextItem() {
              var nextIndex = scope.activeItemIndex + 1;
              if (nextIndex < scope.dropdownItems.length) scope.setActive(nextIndex);
            };

            var selectActiveItem = function selectActiveItem() {
              if (scope.activeItemIndex >= 0 && scope.activeItemIndex < scope.dropdownItems.length) scope.selectItem(scope.dropdownItems[scope.activeItemIndex]);
            };

            element.bind("keydown keypress", function (event) {
              switch (event.which) {
                case 38:
                  //up
                  scope.$apply(selectPreviousItem);
                  break;
                case 40:
                  //down
                  scope.$apply(selectNextItem);
                  break;
                case 13:
                  // return
                  if (scope.dropdownVisible && scope.dropdownItems && scope.dropdownItems.length > 0) {
                    event.preventDefault();
                    scope.$apply(selectActiveItem);
                  }
                  break;
              }
            });
          }
        };
      });
    }
  };
});
//# sourceMappingURL=netxms_objects_list_directive.js.map
