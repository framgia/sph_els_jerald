import { Fragment } from "react";
import { Link } from "react-router-dom";

const CategoriesList = () => {
  return (
    <Fragment>
      <div className="column">
        <div className="ui segment raised very padded">
          <h2 className="ui header">Basic 500</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
          <Link to="/" className="ui primary button">
            Start Lesson
          </Link>
        </div>
      </div>
      <div className="column">
        <div className="ui segment raised very padded">
          <h2 className="ui header">Basic 500</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
          <Link to="/" className="ui primary button">
            Start Lesson
          </Link>
        </div>
      </div>
      <div className="column">
        <div className="ui segment raised very padded">
          <h2 className="ui header">Basic 500</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
          <Link to="/" className="ui primary button">
            Start Lesson
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default CategoriesList;
