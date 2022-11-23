import { useContext } from 'react';
import Parcels from '../../Contexts/MeniuContext';
import Line from './Line';

function List() {

    const { menius } = useContext(Parcels);

    return (
        <div className="card m-4">
            <h5 className="card-header">Meniu List</h5>
            <div className="card-body">
                <ul className="list-group">
                    {
                        menius?.map(m => <Line key={m.id} meniu={m} />)
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;