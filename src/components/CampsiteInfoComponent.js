/* eslint-disable react/jsx-pascal-case */
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardImg,
  CardText,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Component } from "react";
import { Control, Errors, LocalForm } from "react-redux-form";
import { addComment } from "../redux/ActiontCreators";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

// RenderCampsite starts

function RenderCampsite({ campsite }) {
  return (
    <div className="col-md-5 m-1">
      <Card>
        <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
        <CardBody>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

// RenderCampsite ends

// Modal Validation

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmmit(values) {
    this.toggleModal();
    this.props.addComment(
      this.props.campsiteId,
      values.rating,
      values.author,
      values.text
    );
  }

  render() {
    return (
      <>
        {/* Modal is triggered */}

        <Button outline onClick={this.toggleModal}>
          <i className="fa fa-lg fa-pencil"></i> Submit Comment
        </Button>

        {/* Begin Comment Modal */}

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comments</ModalHeader>
          <ModalBody>
            {/* Form starts  */}

            <LocalForm onSubmit={(values) => this.handleSubmmit(values)}>
              <div className="form-group">
                <Label htmlFor="rating" md={2}>
                  Rating
                </Label>
                <Control.select
                  model=".rating"
                  name="rating"
                  id="rating"
                  className="form-control"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </div>

              <div className="form-group">
                <Label htmlFor="author" md={2}>
                  Your Name
                </Label>
                <Control.text
                  model=".author"
                  name="author"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(15),
                  }}
                />

                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  component="div"
                  messages={{
                    required: "Required",
                    minLength: "Must be at least 2 characters",
                    maxLength: "Must be 15 characters or less",
                  }}
                />

                <div className="form group">
                  <Label htmlFor="text" md={2}>
                    Comments
                  </Label>
                  <br />
                  <Control.textarea
                    model=".text"
                    name="text"
                    id="text"
                    rows={6}
                    className="form-comtrol"
                  />
                </div>

                {/* Submit Form */}

                <Button
                  onClick={this.handleSubmmit}
                  type="submit"
                  color="primary"
                >
                  Submit
                </Button>
              </div>
            </LocalForm>
          </ModalBody>
        </Modal>

        {/* End Modal */}
      </>
    );
  }
}

// RenderComments function starts
function RenderComments({ comments }) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        {comments.map((com) => {
          return (
            <div key={com.id}>
              <p>{com.text}</p>
              <p>
                --
                {com.author}
                <br />
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }).format(new Date(Date.parse(com.date)))}
              </p>
            </div>
          );
        })}

        {/* not recognizing campsiteId */}

        <CommentForm campsiteId={campsiteId} addComment={addComment} />
      </div>
    );
  }
  return <div />;
}

// RenderComments function ends

// CampsiteInfo Component starts

function CampsiteInfo(props) {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>{props.errMess}</h4>
          </div>
        </div>
      </div>
    );
  }
  if (props.campsite) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/directory">Directory</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
              <hr />
              <h2>{props.campsite.name}</h2>
              <hr />
            </Breadcrumb>
          </div>
        </div>
        <div className="row">
          <RenderCampsite campsite={props.campsite} />
          <RenderComments
            comments={props.comments}
            addComment={props.addComment}
            campsiteId={props.campsite.id}
          />
        </div>
      </div>
    );
  } else {
    return <div />;
  }
}
// CampsiteInfo Component ends

export default CampsiteInfo;
