import { useContext } from "react";
import Parcels from "../../Contexts/MeniuContext";

function Line({ meniu }) {

    const { setDeleteData, setModalData } = useContext(Parcels);
    // console.log(containers?.find(c=> c.id === parcel.container_id).number)
    return (
        <li className="list-group-item">
            <div className="line_content">
                <div className="line__content__info">
                    {meniu.image ? (
                        <div className="img-bin">
                            <img src={meniu.image} alt={meniu.title}></img>
                        </div>
                    ) : (
                        <div className="no_image">No image</div>
                    )}
                    <div className="line__content">
                        <div className="line__content__title">{meniu.title}</div>
                        <div className="lline__content__info">Price: <strong>{meniu.price}</strong> eur</div>
                        <div className="line__content__info">Description: {meniu.story}</div>
                    </div>
                </div>
                <div className="line_buttons">
                    <button onClick={() => setModalData(meniu)} type="button" className="btn btn-outline-success">Edit
                    </button>
                    <button onClick={() => setDeleteData(meniu)} type="button" className="btn btn-outline-danger">Delete
                    </button>
                </div>
            </div>
        </li>
    );
}

export default Line;