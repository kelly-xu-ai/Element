import ElExtendBaseTable from '../extend-table/src/table/src/table';

/* istanbul ignore next */
ElExtendBaseTable.install = function(Vue) {
  Vue.component('ElExtendBaseTable', ElExtendBaseTable);
};

export default ElExtendBaseTable;
