import { useContext } from 'react';
import Containers from '../../Contexts/HomeProvider';
import Line from './Line';

function List() {

    const { containers } = useContext(Containers);

    return (
        <div className="card m-4">
            <h5 className="card-header">Containers List</h5>
            <div className="card-body">
                <ul className="list-group">
                    {
                        containers?.map(c => <Line key={c.id} container={c} />)
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;