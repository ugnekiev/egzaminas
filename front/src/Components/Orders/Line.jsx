import { useContext } from 'react';
import Containers from '../../Contexts/HomeProvider';

function Line({ container }) {

    const { setDeleteData, setModalData } = useContext(Containers);
    

    return (
        <li className="list-group-item">
            <div className="line">
                <div className="line__content">
                    <div className="line__content__title">
                        {container.number}
                    </div>
                    <div className="line__content__info">
                        {container.size}
                    </div>
                    <div className="line__content__info">
                        {container.boxes_inside}
                    </div>
                </div>
                <div className="line__buttons">
                    <button onClick={() => setModalData(container)} type="button" className="btn btn-outline-success">Edit</button>
                    <button onClick={() => setDeleteData(container)} type="button" className="btn btn-outline-danger">Delete</button>
                </div>
            </div>
        </li>
    )
}

export default Line;