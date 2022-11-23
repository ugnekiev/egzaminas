import { useState, useContext, useRef, useEffect } from 'react';
import MeniuContext from '../../Contexts/MeniuContext';
import getBase64 from '../../Functions/getBase64';

function Edit() {

    const [title, setTitle] = useState('');
    const [story, setStory] = useState('');
    const [price, setPrice] = useState('');
    const fileInput = useRef();
    const [deletePhoto, setDeletePhoto] = useState(false);
    const [photoPrint, setPhotoPrint] = useState(null);

    const doPhoto = () => {
        getBase64(fileInput.current.files[0])
            .then(photo => setPhotoPrint(photo))
            .catch(_ => {
                // tylim
            });
    };

    const { setEditData, modalData, setModalData } = useContext(MeniuContext);

    const edit = () => {
        setEditData({
            title,
            story,
            price: parseFloat(price),
            id: modalData.id,
            deletePhoto: deletePhoto ? 1 : 0,
            image: photoPrint,

        });
        setModalData(null);
        setDeletePhoto(false);
    }

    useEffect(() => {
        if (null === modalData) {
            return;
        }
        setTitle(modalData.title);
        setStory(modalData.story);
        setPrice(modalData.price);
        setPhotoPrint(modalData.image);
        setDeletePhoto(false);
    }, [modalData])


    if (null === modalData) {
        return null;
    }
    // console.log(containers)

    return (
        <div className="modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Meniu</h5>
                        <button onClick={() => setModalData(null)} type="button" className="btn-close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="card-body">
                            <div className="card-body">
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <input type="text" className="form-control" value={story} onChange={e => setStory(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Price</label>
                                    <input maxLength={5} type="text" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Image</label>
                                    <input ref={fileInput} type="file" className="form-control" onChange={doPhoto} />
                                </div>
                                {photoPrint ? <div className='img-bin'>
                                    <label htmlFor="image-delete">X</label>
                                    <input id="image-delete" type="checkbox" checked={deletePhoto} onChange={() => setDeletePhoto(d => !d)}></input>
                                    <img src={photoPrint} alt="upload"></img>
                                </div> : null}
                            </div>

                        </div>
                        <button onClick={edit} type="button" className="btn btn-outline-success">Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit;