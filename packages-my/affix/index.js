import ElAffix from './src/affix';

/* istanbul ignore next */
ElAffix.install = function(Vue) {
  Vue.component(ElAffix.name, ElAffix);
};

export default ElAffix;
