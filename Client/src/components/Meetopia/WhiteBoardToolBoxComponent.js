import React from "react";

export function WhiteBoardToolBoxComponent({ className }) {
  return (
    <div className={`card card-custom ${className}`}>
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark">
            WhiteBoard
          </span>
          <span className="text-muted mt-3 font-weight-bold font-size-sm">
            More than 400+ new members
          </span>
        </h3>
        <div className="card-toolbar">
        </div>
      </div>
      <div className="card-body pt-3 pb-0">
        <div className="table-responsive">
        <div><input type="color" id="WritingColor" /></div>
         <div><input type="button" className="btn btn-outline-success" id="PickPencil" value="Pencil" /></div>
         <div><input type="button" className="btn btn-outline-success" id="PickCircle" value="Circle" /></div>
         <div><input type="button" className="btn btn-outline-success" id="PickRectangle" value="Rectangle" /></div>
         <div><input type="button" className="btn btn-outline-success" id="PickEraser" value="Eraser" /></div>
         <input type="button" width="100%" className="btn btn-outline-success" id="DownloadWhiteBoard" value="Download !" />
         <div><button className="btn btn-outline-success" width="100%" id="ClearWhiteBoard" >Clear WhiteBoard</button></div>
         <div><input type="number" value="2" min="1" max="1000" readOnly /></div>
        </div>
      </div>
    </div>
  );
}
