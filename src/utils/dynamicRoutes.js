import { defineAsyncComponent, defineCustomElement } from 'vue';

function dynamicPropsFn(route) {
  const queries = {};
  Object.entries(route.query).forEach(([key, value]) => {
    queries[`${key}`] =
      value === 'true' ? true : value === 'false' ? false : value;
  });
  return { ...queries };
}

function getComponentPath(path) {
  const componentName = path
    .split('/')
    .pop()
    .replace(/\.\w+$/, '');
  const routePath = componentName
    .replace(/([a-zA-Z])(?=[A-Z])/g, '$1-')
    .toLowerCase();

  return { componentName, routePath };
}

// function setCustomElements(routePath, component, defineCustomElement) {
//   const element = routePath.replace(/.ce/, '');
//
//   const customElement = defineCustomElement(component.default);
//   customElements.define(element, customElement);
// }

export default function dynamicRoutes(
  components,
  stories,
  pages,
  app,
  router,
  store,
) {
  Object.entries(components).forEach(([path, component]) => {
    const { componentName: parent, routePath } = getComponentPath(path);

    if (parent.includes('.ce')) {
      // TODO - Configure Dynamic Web Components
      // setCustomElements(routePath, component, defineCustomElement);
    } else {
      const children = [];
      Object.entries(stories).forEach(([storyPath, story]) => {
        if (storyPath.includes(parent)) {
          const { componentName, routePath: variation } =
            getComponentPath(storyPath);

          children.push({
            name: componentName,
            path: variation,
            // component: story.default,
            component: () =>
              import(`../stories/${parent}/${componentName}.vue`),
            meta: { parent },
            beforeEnter(to, from) {
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
        // component: component.default,
        meta: { parent: true },
        props: dynamicPropsFn,
        redirect,
        children,
      };

      router.addRoute(parentRoute);

      // app.component(parent, component.default);
      app.component(
        parent,
        defineAsyncComponent(() =>
          import(`../components/ui/${parent}/${parent}.vue`),
        ),
      );
    }
  });

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
