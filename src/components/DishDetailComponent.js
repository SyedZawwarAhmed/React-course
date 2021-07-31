import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
} from "reactstrap";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: "",
      author: "",
      comment: "",
      isModalOpen: false,
      touched: {
        author: false,
      },
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value,
    });
    this.validate(this.state.author);
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  validate(author) {
    const errors = {
      author: "",
    };

    if (this.state.touched.author && author.length <= 2) {
      errors.author = "Must be greater than 2 characters";
    } else if (author.length > 15)
      errors.author = "Must be 15 characters or less";

    return errors;
  }

  render() {
    const error = this.validate(this.state.author);
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <i className="fa fa-pencil m-1" />
          <span>Submit Comment</span>
        </Button>
        <Modal isOpen={this.state.isModalOpen}>
          <ModalHeader className="m-2" toggle={this.toggleModal}>
            Submit Comment
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup className="m-2">
                <Label htmlFor="rating">Rating</Label>
                <Input
                  id="rating"
                  name="rating"
                  type="number"
                  value={this.state.rating}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup className="m-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="author"
                  name="author"
                  type="text"
                  value={this.state.author}
                  valid={error.author === ""}
                  invalid={error.author !== ""}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur("author")}
                />
                <FormFeedback>{error.author}</FormFeedback>
              </FormGroup>
              <FormGroup className="m-2">
                <Label htmlFor="comment">Comment</Label>
                <Input
                  id="comment"
                  name="comment"
                  type="textarea"
                  rows="6"
                  value={this.state.comment}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup className="m-2">
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function RenderComments({ comments }) {
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
      <CommentForm />
    </div>
  );
}

function RenderDish({ dish }) {
  return (
    <div className="col-12 col-md-5 m-1">
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

const DishDetail = (props) => {
  if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderDish dish={props.dish} />
          <RenderComments comments={props.comments} />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default DishDetail;
