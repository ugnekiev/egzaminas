import { useState, useEffect } from 'react';
// import DataContext from '../../Contexts/DataContext';
import Create from './Create';
// import List from './List';
import axios from 'axios';
// import Edit from './Edit';
// import { authConfig } from '../../Functions/auth';
// import { useContext } from 'react';
import OrdersContext from '../../Contexts/OrdersContext';

function Main() {

    const [lastUpdate, setLastUpdate] = useState(Date.now());
    const [createData, setCreateData] = useState(null);
    const [orders, setOrders] = useState(null);
    const [menius, setMenius] = useState(null); //ord
    const [meniuList, setMeniuList] = useState(null);
    const [deleteData, setDeleteData] = useState(null);
    const [modalData, setModalData] = useState(null);
    const [editData, setEditData] = useState(null);
    // const { makeMsg } = useContext(DataContext);

    // READ for list
    useEffect(() => {
        axios.get('http://localhost:3003/orders/meniu')//authConfig()
            .then(res => {
                setOrders(res.data);
            })
    }, [lastUpdate]);

    useEffect(() => {
        axios.get('http://localhost:3003/meniu')//, authConfig()
            .then(res => {
                console.log('cont',res.data)
                setMenius(res.data);
            })
    }, [lastUpdate]);

    useEffect(() => {
        axios.get('http://localhost:3003/meniu/list')//, authConfig()
            .then(res => {
                console.log(res.data)
                setMeniuList(res.data);
            })
    }, [lastUpdate]);

    useEffect(() => {
        if (null === createData) {
            return;
        }
        axios.post('http://localhost:3003/orders', createData)//, authConfig()
            .then(res => {
                setLastUpdate(Date.now());
                // makeMsg(res.data.text, res.data.type);
            });
    }, [createData]);//, makeMsg

    useEffect(() => {
        if (null === deleteData) {
            return;
        }
        axios.delete('http://localhost:3003/orders' + deleteData.id)//, authConfig()
            .then(res => {
                setLastUpdate(Date.now());
                // makeMsg(res.data.text, res.data.type);
            });
    }, [deleteData]);//, makeMsg

    useEffect(() => {
        if (null === editData) {
            return;
        }
        axios.put('http://localhost:3003/orders/' + editData.id, editData)//, authConfig()
            .then(res => {
                setLastUpdate(Date.now());
                // makeMsg(res.data.text, res.data.type);
            });
    }, [editData]);//, makeMsg


    return (
        <OrdersContext.Provider value={{
            setCreateData,
            orders,
            setDeleteData,
            modalData,
            setModalData,
            setEditData,
            menius,
            meniuList,
        }}>
            <div className="container">
                <div className="row">
                    <div className="col col-lg-4 col-md-12">
                        <Create />
                    </div>
                    <div className="col col-lg-8 col-md-12">
                        {/* <List /> */}
                    </div>
                </div>
            </div>
            {/* <Edit /> */}
        </OrdersContext.Provider>
    )
}
export default Main;