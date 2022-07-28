import React, {useState,useEffect} from 'react';
import Table from '../../ListView';

const Menu2 = () => {
    const [data,setData] = useState([]);
    useEffect(()=> {
        fetch('https://94.130.236.116:10972/api/Companies')
        .then(result => result.json())
        .then(res => setData(res) )
        .catch(()=> {setData(data)});
    })
return (
    <Table  data={data}/>
)
}

export default Menu2;