import { useState, useContext, useRef, useEffect } from 'react';
import OrdersContext from '../../Contexts/OrdersContext';

function Create() {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [meniu, setMeniu] = useState(0);
    const [count, setCount] = useState('');

   

    const { setCreateData, menius, meniuList } = useContext(OrdersContext);

    const add = () => {
        
// console.log(container)
        setCreateData({
            name,
            surname,
            // weight: parseFloat(weight),
            meniu_id: menius

        });

        setName('');
        setSurname('');
        setMeniu(0);


    };
    console.log(meniuList)

    return (
        <div className="card m-4">
            <h5 className="card-header">Create Order</h5>
            <div className="card-body">
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Surname</label>
                    <input type="text" className="form-control" value={surname} onChange={e => setSurname(e.target.value)} />
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Select day meniu</label>
                    <select className="form-select" value={meniu} onChange={e => setMeniu(e.target.value)}>
                    <option value={0} disabled>Choose from list</option>
                        {
                            meniuList?.map(m => <option key={m.id} value={m.id}>{m.title}</option>)
                        }
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Count</label>
                    <input maxLength={5} type="text" className="form-control" value={count} onChange={(e) => setCount(e.target.value)} />
                </div>

            </div>
            <button onClick={add} type="button" className="btn btn-outline-success">Order</button>
        </div>
    );
}

export default Create;