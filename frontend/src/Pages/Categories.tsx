import { Fragment } from "react";
import CategoriesList from "./components/Categories/CategoriesList";

const Categories = () => {
  return (
    <Fragment>
      <h2>Categories</h2>

      <div className="ui three column stackable grid">
        <CategoriesList />
      </div>
    </Fragment>
  );
};

export default Categories;
