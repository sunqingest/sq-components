import Collapse from "./Collapse.vue";
import CollapseItem from "./collapseItem.vue";

Collapse.install = (app) => {
  app.component(Collapse.name, Collapse);
};

CollapseItem.install = (app) => {
  app.component(CollapseItem.name, CollapseItem);
};

export default Collapse;
export { CollapseItem };
