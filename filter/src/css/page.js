var extendApi = function (extendAction, data, action) {
  return function (dispatch) {
    if (extendAction == 'ACTION_SHOW_CATE') {
      dispatch(action);
    } else if (extendAction == 'ACTION_OK') {
      dispatch(action);
    } else {
      var result;
      if (data.code == 'cid' && data.value == '3') {
        result = mockData.cid_3;
      } else if (data.code == 'cid' && data.value == '113') {
        result = mockData.cid_113;
      } else if (data.code == 'color' && data.value == '6') {
        result = mockData.color_6;
      } else if (data.code == 'color' && data.value == 'a') {
        result = mockData.all;
      }
      else {
        result = mockData.all;
      }
      action(dispatch, result, extendApi);

    }
  }
};

(function () {
  var elem = document.getElementById('filterButton');
  var content = document.getElementById('content');
  var data = mockData.all;
  var component = new BGSite.component.CommonFilter(data, content, extendApi, true);
  elem.addEventListener('click', function() {
    component.show();
  });
})();