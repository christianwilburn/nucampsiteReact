import React from "react";
import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";

// RenderDirectoryItem starts

function RenderDirectoryItem({ campsite }) {
  return (
    <Card>
      <CardImg width="100%" src={campsite.image} alt={campsite.name} />
      <CardImgOverlay>
        <CardTitle>{campsite.name}</CardTitle>
      </CardImgOverlay>
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
        <div className="row">{directory}</div>
      </div>
    );
  
}

// Directory component ends

export default Directory;
