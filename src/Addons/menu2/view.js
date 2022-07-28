import React, {useState,useEffect} from 'react';
import Table from '../../components/ListView';

const Menu2 = () => {
    const [data,setData] = useState([]);
    useEffect(()=> {
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then(result => result.json())
        .then(res => setData(res) )
        .catch(()=> {setData(data)});
    })
return (
    <Table  data={data}/>
)
}

export default Menu2;