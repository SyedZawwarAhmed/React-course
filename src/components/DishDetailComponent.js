import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

class DishDetail extends Component {
  constructor(props) {
    super(props);
  }

  renderComments(comments) {
    const comment = comments.map((comment) => {
      return (
        <li key={comment.id}>
          <p>{comment.comment}</p>
          <p>
            -- {comment.author},{" "}
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }).format(new Date(Date.parse(comment.date)))}
          </p>
        </li>
      );
    });

    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">{comment}</ul>
      </div>
    );
  }

  render() {
    const dish = this.props.dish;
    if (dish !== undefined) {
      const comments = dish.comments;
      return (
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-5 m-1">
              <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
              </Card>
            </div>
            {this.renderComments(comments)}
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default DishDetail;
