import React, { useEffect, useState } from 'react';

const UseMenu = () => {
    const [item, setItem] = useState([]);
    const[loading,setLoading] = useState(true)
    useEffect(() => {
      fetch("menu.json")
        .then((res) => res.json())
          .then((data) => {
            console.log(data)
              setItem(data);
              setLoading(false)
        })
    }, []);
    return [item,loading]
};

export default UseMenu;