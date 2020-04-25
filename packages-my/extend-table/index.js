import ElExtendTable from './src/extend-table';

/* istanbul ignore next */
ElExtendTable.install = function(Vue) {
  Vue.component(ElExtendTable.name, ElExtendTable);
};

export default ElExtendTable;
