var BGSite = {
  component: {},
  initComponent: function() {
    var elem = document.getElementById('filterButton');
    var content = document.getElementById('container');
    var data = mockData.all;
    var component = new BGSite.component.Filter(data, content, extendApi, true);
    elem.addEventListener('click', function () {
      component.show();
    });
  }
};

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
      } else if (data.code == 'price' && data.value == '0-69') {
        result = mockData.price_0_69;
      }
      else {
        result = mockData.all;
      }
      action(dispatch, result, extendApi);

    }
  }
};