import { useContext, useEffect, useState } from 'react';
import Containers from '../../Contexts/HomeProvider';

function Edit() {

    const [number, setNumber] = useState('')
    const [size, setSize] = useState("");

    const { setEditData, modalData, setModalData } = useContext(Containers);

    console.log(modalData)

    const edit = () => {
        setEditData({
            number,
            size: size,
            id: modalData.id
        });
        setModalData(null);
    }

    useEffect(() => {
        if (null === modalData) {
            return;
        }
        setNumber(modalData.number);
        setSize(modalData.size);
    }, [modalData])

    if (null === modalData) {
        return null;
    }

    return (

        <div className="modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Container</h5>
                        <button onClick={() => setModalData(null)} type="button" className="btn-close"></button>
                    </div>
                    <div className="modal-body"></div>
                    <div className="card m-4">
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label">Container number</label>
                                <input type="text" className="form-control" value={number} onChange={(e) => setNumber(e.target.value)}></input>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Container size</label>
                                <select className="form-select"
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}>
                                    <option value={0} disabled>Please, select</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                </select>
                            </div>
                            <button onClick={edit} type="button" className="btn btn-outline-success">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit;