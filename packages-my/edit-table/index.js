import ElEditTable from './src/edit-table';

/* istanbul ignore next */
ElEditTable.install = function(Vue) {
  Vue.component(ElEditTable.name, ElEditTable);
};

export default ElEditTable;
