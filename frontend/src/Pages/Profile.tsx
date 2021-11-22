import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="ui two column grid stackable">
      <div className="four wide computer column six wide tablet column">
        <div className="ui segment raised padded">
          <img
            className="ui small rounded image centered"
            src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
            alt="Profile Pic"
          />
          <h1 className="ui huge header centered">Jerald Joshua Echavia</h1>
          <button className="fluid ui button primary padded">Edit</button>
          <div className="ui hidden divider"></div>
          <div className="ui divider"></div>
          <div className="ui grid center aligned">
            <div className="eight wide column">
              <h1 className="ui header">
                50
                <div className="sub header">Followers</div>
              </h1>
            </div>
            <div className="eight wide column">
              <h1 className="ui header">
                50
                <div className="sub header">Following</div>
              </h1>
            </div>
          </div>
          <div className="ui hidden divider"></div>
          <button className="fluid ui button padded">Follow</button>
          <Link to="/" className="ui button basic fluid aligned">
            Learned 20 words
          </Link>
          <Link to="/" className="ui button basic fluid aligned">
            Learned 5 lessons
          </Link>
        </div>
      </div>
      <div className="twelve wide computer column ten wide tablet column">
        <div className="ui segment raised padded">
          <div className="ui huge header">Activities</div>
          <div className="ui divider"></div>
          <div className="ui large feed">
            <div className="event">
              <div className="label">
                <img
                  src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
                  alt="Profile Pic"
                />
              </div>
              <div className="content">
                <div className="summary">
                  <Link to="/">Jerald Joshua</Link> learned 20 of 20 words in{" "}
                  <Link to="/">Basic 100</Link>
                  <div className="date">3 days ago</div>
                </div>
              </div>
            </div>
          </div>
          <div className="ui large feed">
            <div className="event">
              <div className="label">
                <img
                  src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
                  alt="Profile Pic"
                />
              </div>
              <div className="content">
                <div className="summary">
                  <Link to="/">Jerald Joshua</Link> learned 20 of 20 words in{" "}
                  <Link to="/">Basic 500</Link>
                  <div className="date">3 days ago</div>
                </div>
              </div>
            </div>
          </div>
          <div className="ui large feed">
            <div className="event">
              <div className="label">
                <img
                  src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
                  alt="Profile Pic"
                />
              </div>
              <div className="content">
                <div className="summary">
                  <Link to="/">Jerald Joshua</Link> learned 20 of 20 words in{" "}
                  <Link to="/">Basic 500</Link>
                  <div className="date">3 days ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
