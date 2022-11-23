import { useState, useContext, useRef} from 'react';
import DataContext from '../../Contexts/DataContexts';
import Parcels from '../../Contexts/MeniuContext';
import getBase64 from '../../Functions/getBase64';

function Create() {

    const [title, setTitle] = useState('');
    const [story, setStory] = useState('');
    const [price, setPrice] = useState('');
    const fileInput = useRef();

    const { setCreateData} = useContext(Parcels);
    const { makeMsg } = useContext(DataContext);

    const [photoPrint, setPhotoPrint] = useState(null);


    const doPhoto = () => {
        getBase64(fileInput.current.files[0])
            .then(photo => setPhotoPrint(photo))
            .catch(_ => {
                // tylim
            });
    };

    const add = () => {
        if (title.length === 0 || title.length > 50) {
            makeMsg('Invalid title', 'error');
            return;
        }
        if (price.replace(/[^\d.]/, '') !== price) {
            makeMsg('Invalid weight', 'error');
            return;
        }
        if (parseFloat(price) > 99.99) {
            makeMsg('Max weight is 999.99', 'error');
            return;
        }
// console.log(container)
        setCreateData({
            title,
            story,
            price: parseFloat(price),
            image: photoPrint,

        });

        setTitle('');
        setStory('');
        setPrice('');
        setPhotoPrint(null);
        fileInput.current.value = null;



    };
    // console.log(containersList)

    return (
        <div className="card m-4">
            <h5 className="card-header">Create Meniu</h5>
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
                    <label className="form-label">Add Image</label>
                    <input ref={fileInput} type="file" className="form-control" onChange={doPhoto} />
                </div>
                {photoPrint ? <div className='img-bin'><img src={photoPrint} alt="upload"></img></div> : null}
            </div>
            <button onClick={add} type="button" className="btn btn-outline-success">Add</button>
        </div>
    );
}

export default Create;