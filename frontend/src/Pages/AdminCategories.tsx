import { Fragment } from "react";

import { Link } from "react-router-dom";

const AdminCategories = () => {
  return (
    <Fragment>
      <h2>Categories</h2>

      <table className="ui celled padded table stackable">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <h4 className="ui center aligned header single line">
                <Link to="/">Basic 500</Link>
              </h4>
            </td>
            <td>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              quia exercitationem eius, esse magnam earum architecto ipsum
              facere neque rem quae alias accusamus possimus? Commodi eligendi
              nisi ipsam tenetur libero!
            </td>
            <td className="single line">
              <Link to="/">
                <button className="ui button primary">Add Word</button>
              </Link>
              <Link to="/">
                <button className="ui button">Edit</button>
              </Link>
              <Link to="/">
                <button className="ui red button">Delete</button>
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <h4 className="ui center aligned header single line">
                <Link to="/">Basic 500</Link>
              </h4>
            </td>
            <td>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              quia exercitationem eius, esse magnam earum architecto ipsum
              facere neque rem quae alias accusamus possimus? Commodi eligendi
              nisi ipsam tenetur libero!
            </td>
            <td className="single line">
              <Link to="/">
                <button className="ui button primary">Add Word</button>
              </Link>
              <button className="ui button">Edit</button>
              <button className="ui red button">Delete</button>
            </td>
          </tr>
          <tr>
            <td>
              <h4 className="ui center aligned header single line">
                <Link to="/">Basic 500</Link>
              </h4>
            </td>
            <td>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              quia exercitationem eius, esse magnam earum architecto ipsum
              facere neque rem quae alias accusamus possimus? Commodi eligendi
              nisi ipsam tenetur libero!
            </td>
            <td className="single line">
              <Link to="/">
                <button className="ui button primary">Add Word</button>
              </Link>
              <button className="ui button">Edit</button>
              <button className="ui red button">Delete</button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={5}>
              <Link to="/">
                <button className="ui button primary">Add Question</button>
              </Link>
              <div className="ui right floated pagination menu">
                <Link className="icon item" to="/">
                  <i className="left chevron icon"></i>
                </Link>
                <Link className="icon item" to="/">
                  <i className="right chevron icon"></i>
                </Link>
              </div>
            </th>
          </tr>
        </tfoot>
      </table>
    </Fragment>
  );
};

export default AdminCategories;
