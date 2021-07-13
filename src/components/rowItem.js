import { useState } from 'react';

const RowItem = (props) => {
  // console.log("whatisprips:", props);
  const [show, setShow] = useState(false);

  return (
    <li>
      <div className="row align-center m-tb-5" style={{ height: '280px' }} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        <div>
          <div>{props.title}</div>
          <img src={props.img} alt={props.img} />
        </div>
        {show && (
          <div className="m-left-10 ">
            {props.type === 'remove' ? (
              <button className="handl btn " onClick={() => props.onRemove && props.onRemove()}>
                Remove
              </button>
            ) : (
              <button className={`handl btn btn-${props.type}`} disabled={!props.type} onClick={() => props.onNominate && props.onNominate()}>
                Add
              </button>
            )}
          </div>
        )}
      </div>
    </li>
  );
};

export default RowItem;
