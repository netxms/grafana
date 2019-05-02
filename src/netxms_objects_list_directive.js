import angular from 'angular';
import _ from 'lodash';

angular.module('grafana.directives').directive('netxmsObjectList', function()
{

   return {
      restrict: 'E',
      scope:
         {
            getList: '&',
            selectedItem: '=',
            name: '@',
            inputPlaceholder: '@',
            onSelection: '&'
         },
      template: '<div class="netxms-object-list">' +
         '<input type="text"' +
         'spellcheck="false"' +
         'name="{{name}}"' +
         'placeholder="{{inputPlaceholder}}"' +
         'ng-model="inputValue"' +
         'ng-change="inputChange()"' +
         'ng-focus="inputFocus()"' +
         'ng-blur="inputBlur($event)"' +
         'class="gf-form-input' +
         ' width-25"' +
         'autocomplete="off"' +
         'input>' +
         '<ul ng-show="dropdownVisible">' +
         '<li ng-repeat="item in dropdownItems"' +
         'ng-click="selectItem(item)"' +
         'ng-mouseenter="setActive($index)"' +
         'ng-mousedown="dropdownPressed()"' +
         'ng-class="{\'active\': activeItemIndex === $index}"' +
         '>' +
         '<span>{{item.name}}</span>' +
         '</li>' +
         '</ul>' +
         '</div>',
      link: function(scope, element)
      {
         var pressedDropdown = false;
         scope.activeItemIndex = -1;
         scope.selectedItem = _.isEmpty(scope.selectedItem) ? {name: "", id: 0} : scope.selectedItem;
         scope.inputValue = scope.selectedItem.name;
         scope.dropdownVisible = false;

         scope.$watch('dropdownItems', function(newValue, oldValue)
         {
            if (!angular.equals(newValue, oldValue))
               scope.setActive(-1);
         });

         scope.$watch('selectedItem', function(newValue, oldValue)
         {
            if (!angular.equals(newValue, oldValue))
            {
               if (newValue)
               {
                  scope.inputValue = newValue.name;
                  scope.onSelection();
               }
            }
         });

         scope.setActive = function(itemIndex)
         {
            scope.activeItemIndex = itemIndex;
         };

         scope.inputChange = function()
         {
            getFilteredList(scope.inputValue);
         };

         scope.inputFocus = function()
         {
            getFilteredList(scope.inputValue);
            showDropdown();
         };

         scope.inputBlur = function(event)
         {
            selectActiveItem();
            if (pressedDropdown)
            {
               pressedDropdown = false;
            }
            hideDropdown();
         };

         scope.dropdownPressed = function()
         {
            pressedDropdown = true;
         }

         scope.selectItem = function(item)
         {
            scope.selectedItem = item;
            console.log(item);
            hideDropdown();
         };

         var getFilteredList = function(filterString)
         {
            scope.getList().then(function(items)
            {
               scope.dropdownItems = _.filter(items, function(item)
               {
                  return (filterString == null ? true : item.name.toLowerCase().includes(filterString.toLowerCase()));
               });
            });
         };

         var showDropdown = function ()
         {
            scope.dropdownVisible = true;
         };

         var hideDropdown = function()
         {
            scope.dropdownVisible = false;
         };

         var selectPreviousItem = function()
         {
            var prevIndex = scope.activeItemIndex - 1;
            if (prevIndex >= -1)
               scope.setActive(prevIndex);
         };

         var selectNextItem = function()
         {
            var nextIndex = scope.activeItemIndex + 1;
            if (nextIndex < scope.dropdownItems.length)
               scope.setActive(nextIndex);
         };

         var selectActiveItem = function()
         {
            if (scope.activeItemIndex >= 0)
               scope.selectItem(scope.dropdownItems[scope.activeItemIndex]);
            else
               scope.selectItem({name: scope.inputValue, id: 0});
         };

         element.bind("keydown keypress", function (event)
         {
            switch (event.which)
            {
               case 38: //up
                  scope.$apply(selectPreviousItem);
                  break;
               case 40: //down
                  scope.$apply(selectNextItem);
                  break;
               case 13: // return
                  event.preventDefault();
                  scope.$apply(selectActiveItem);
                  break;
            }
         });
      }
   }
});