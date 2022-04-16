import React from "react";
import { Breadcrumb, BreadcrumbItem, Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";
import { Link } from 'react-router-dom';

// RenderDirectoryItem starts

function RenderDirectoryItem({ campsite }) {
  return (
    <Card>
      <Link to={`/directory/${campsite.id}`}>
      <CardImg width="100%" src={campsite.image} alt={campsite.name} />
      <CardImgOverlay>
        <CardTitle>{campsite.name}</CardTitle>
      </CardImgOverlay>
      </Link>
    </Card>
  );
}


// RenderDirectoryItem ends 


// Directory component starts


function  Directory(props) {

    const directory = props.campsites.map((campsite) => {
      return <div key={campsite.id} className="col-md-5 m-1">
        <RenderDirectoryItem campsite={campsite} />
      </div>;
    });
    return (
      <div className="container">
        <div className="row0">
          <div className="col">
            <Breadcrumb>
            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
            <BreadcrumbItem active>Directory</BreadcrumbItem>
            <hr/>
            <h2>Directory</h2>
            <hr/>
            </Breadcrumb>
          </div>
        </div>
        <div className="row">{directory}</div>
      </div>
    );
  
}

// Directory component ends

export default Directory;
