import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

class DishDetail extends Component {
  constructor(props) {
    super(props);
  }

  renderComments(comments) {
    const comment = comments.map((comment) => {
      const date = new Date(comment.date);
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const month = months[date.getMonth()],
        day =
          date.getDate() + 1 < 10
            ? "0" + (date.getDate() + 1)
            : date.getDate() + 1,
        year = date.getFullYear();
      return (
        <li key={comment.id}>
          <p>{comment.comment}</p>
          <p>
            -- {comment.author}, {month} {day}, {year}
          </p>
        </li>
      );
    });
    if (comments !== null) {
      return (
        <div className="col-12 col-md-5 m-1">
          <h4>Comments</h4>
          <ul className="list-unstyled">{comment}</ul>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    const dish = this.props.dish;
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
  }
}

export default DishDetail;
