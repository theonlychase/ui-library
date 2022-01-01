import { defineAsyncComponent } from 'vue';

function dynamicPropsFn(route) {
  return { ...route.query };
}

function getComponentPath(path) {
  const componentName = path
    .split('/')
    .pop()
    .replace(/\.\w+$/, '');
  const name = componentName.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-');
  const routePath = name.toLowerCase();

  return { componentName, name, routePath };
}

function removeQueryParams(to) {
  if (Object.keys(to.query).length) return { path: to.path, query: {} };
}

// TODO - Configure Dynamic Web Components
// function setCustomElements(routePath, component, defineCustomElement) {
//   const element = routePath.replace(/.ce/, '');
//
//   const customElement = defineCustomElement(component.default);
//   customElements.define(element, customElement);
// }

export default function dynamicRoutes(
  { components, stories, pages },
  app,
  router,
  store,
) {
  // Global Components and Routes for UI and Stories
  Object.entries(components).forEach(([path, component]) => {
    const { componentName: parent, routePath } = getComponentPath(path);

    if (parent.includes('.ce')) {
      // TODO - Configure Dynamic Web Components
      // setCustomElements(routePath, component, defineCustomElement);
    } else {
      const children = [];
      Object.entries(stories).forEach(([storyPath, story]) => {
        if (storyPath.includes(parent)) {
          const {
            componentName,
            name,
            routePath: variation,
          } = getComponentPath(storyPath);
          const storyName = name.replaceAll('-', ' ');

          children.push({
            name: `${parent}-${componentName}`,
            path: variation,
            component: () =>
              import(`../stories/${parent}/${componentName}.vue`),
            meta: { parent, name: storyName },
            beforeEnter(to, from) {
              removeQueryParams(to);
              store.dispatch('controls/setControls', null);
            },
            props: dynamicPropsFn,
          });
        }
      });

      const redirect = children.length ? { name: children[0].name } : parent;

      const parentRoute = {
        name: parent,
        path: `/${routePath}`,
        component: () => import(`../components/ui/${parent}/${parent}.vue`),
        meta: { parent: true },
        props: dynamicPropsFn,
        redirect,
        children,
      };

      router.addRoute(parentRoute);

      app.component(
        parent,
        defineAsyncComponent(() =>
          import(`../components/ui/${parent}/${parent}.vue`),
        ),
      );
    }
  });

  // Global Page Components and Routes
  Object.entries(pages).forEach(([path, component]) => {
    const { componentName, routePath } = getComponentPath(path);
    const homePath = componentName === 'Dashboard';

    const pageRoute = {
      name: componentName,
      path: homePath ? '/' : `/${routePath}`,
      component: () => import(`../pages/${componentName}/${componentName}.vue`),
      meta: {
        static: true,
      },
    };

    router.addRoute(pageRoute);

    app.component(
      componentName,
      defineAsyncComponent(() =>
        import(`../pages/${componentName}/${componentName}.vue`),
      ),
    );
  });
}
