import { Breadcrumb, BreadcrumbItem, Card, CardImg, CardText, CardBody } from "reactstrap";
import {Link} from 'react-router-dom';


// RenderCampsite starts

   function RenderCampsite({campsite}) {
    return (
      <div className="col-md-5 m-1">
        <Card>
          <CardImg top src={campsite.image} alt={campsite.name} />
          <CardBody>
            <CardText>{campsite.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }

  // RenderCampsite ends

  // RenderComments function starts
  function RenderComments({comments}) {
    if (comments) {
      return (
        <div className="col-md-5 m-1">
          <h4>Comments</h4>
          {comments.map(com => {
              return (
                  <div key={com.id}>
                      <p>{com.text}</p>
                      <p>-- 
                          {com.author}<br/>
                          {new Intl.DateTimeFormat("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "2-digit",
                          }).format(new Date(Date.parse(com.date)))}
                      </p>
                  </div>
              );
          })}
        </div>
      );
    }
    return ( <div />
    );
  }

  // RenderComments function ends


  // CampsiteInfo Component starts 

   function CampsiteInfo(props) {
    if (props.campsite) {
      return (
        <div className="container">
          <div className="row">
                <div className="col">
                <Breadcrumb>
            <BreadcrumbItem><Link to='/directory'>Directory</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
            <hr/>
            <h2>{props.campsite.name}</h2>
            <hr/>
            </Breadcrumb>
                </div>
            </div>
          <div className="row">
            <RenderCampsite campsite={props.campsite} />
            <RenderComments comments={props.comments} />
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
// CampsiteInfo Component ends

export default CampsiteInfo;
