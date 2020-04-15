import navConfig from './nav.config';
import navMyConfig from './nav.my.config';

const LOAD_MAP = {
  'zh-CN': name => {
    return r => require.ensure([], () =>
      r(require(`./pages/zh-CN/${name}.vue`)),
    'zh-CN');
  }
};

const load = function(lang, path) {
  return LOAD_MAP[lang](path);
};

const LOAD_DOCS_MAP = {
  'zh-CN': path => {
    return r => require.ensure([], () =>
      r(require(`./docs/zh-CN${path}.md`)),
    'zh-CN');
  }
};
const LOAD_DOCS_MY_MAP = {
  'zh-CN': path => {
    return r => require.ensure([], () =>
      r(require(`./docs-my/zh-CN${path}.md`)),
    'zh-CN');
  }
}

const loadDocs = function(lang, path) {
  return LOAD_DOCS_MAP[lang](path);
};
const loadDocsMy = function(lang, path) {
  return LOAD_DOCS_MY_MAP[lang](path);
};

const registerRoute = (navConfig) => {
  let route = [];
  Object.keys(navConfig).forEach((lang, index) => {
    let navs = navConfig[lang];
    route.push({
      path: `/${ lang }/component`,
      redirect: `/${ lang }/component/installation`,
      component: load(lang, 'component'),
      children: []
    });
    navs.forEach(nav => {
      if (nav.href) return;
      if (nav.groups) {
        nav.groups.forEach(group => {
          group.list.forEach(nav => {
            addRoute(nav, lang, index);
          });
        });
      } else if (nav.children) {
        nav.children.forEach(nav => {
          addRoute(nav, lang, index);
        });
      } else {
        addRoute(nav, lang, index);
      }
    });
  });
  function addRoute(page, lang, index) {
    const component = page.path === '/changelog'
      ? load(lang, 'changelog')
      : loadDocs(lang, page.path);
    let child = {
      path: page.path.slice(1),
      meta: {
        title: page.title || page.name,
        description: page.description,
        lang
      },
      name: 'component-' + lang + (page.title || page.name),
      component: component.default || component
    };

    route[index].children.push(child);
  }

  return route;
};
// myComponentsRoute
const registerMyRoute = (navMyConfig) => {
  let route = [];
  Object.keys(navMyConfig).forEach((lang, index) => {
    let navs = navMyConfig[lang];
    route.push({
      path: `/${ lang }/my-component`,
      redirect: `/${ lang }/my-component/introduce`,
      component: load(lang, 'my-component'),
      children: []
    });
    navs.forEach(nav => {
      if (nav.href) return;
      if (nav.groups) {
        nav.groups.forEach(group => {
          group.list.forEach(nav => {
            addRoute(nav, lang, index);
          });
        });
      } else if (nav.children) {
        nav.children.forEach(nav => {
          addRoute(nav, lang, index);
        });
      } else {
        addRoute(nav, lang, index);
      }
    });
  });
  function addRoute(page, lang, index) {
    const component = page.path === '/changelog'
      ? load(lang, 'changelog')
      : loadDocsMy(lang, page.path);
    let child = {
      path: page.path.slice(1),
      meta: {
        title: page.title || page.name,
        description: page.description,
        lang
      },
      name: 'my-component-' + lang + (page.title || page.name),
      component: component.default || component
    };

    route[index].children.push(child);
  }

  return route;
};

let route = registerRoute(navConfig);
let myRoute = registerMyRoute(navMyConfig);

route.push({
  path: '/play',
  name: 'play',
  component: require('./play/index.vue')
});
let defaultPath = '/zh-CN/component/installation';

route = route.concat(
  myRoute,
  [
    {
      path: '/',
      redirect: defaultPath
    },
    {
      path: '*',
      redirect: defaultPath
    }
  ]
);

export default route;
