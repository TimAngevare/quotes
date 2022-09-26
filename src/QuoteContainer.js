import Quote from './Quote';
import { useEffect, useState } from 'react';
import { db } from './Firebase';
import { onSnapshot, collection } from 'firebase/firestore';
import Button from 'react-bootstrap/Button';

//s

export default function QuoteContainer ({ dataBase }) {
    
    const [barz, setbarz] = useState([{"bar" : "Loading...", "song" : " ", "artist" : " "}]);
    const [ranInt, setRanInt] = useState(0);

    const genRanInt = (length) => {
        console.log(length);
        if (typeof length === 'object') {
            length = barz.length;
            console.log(length);
        }
        const newInt = Math.floor(Math.random() * length);
        setRanInt(newInt);
        console.log("db: " + dataBase[0] + " num: " + ranInt);
        console.log(barz[ranInt]);
    };

    useEffect(() => {
        onSnapshot(collection(db, dataBase[0]), (snapshot) =>  {
            const res = snapshot.docs.map((doc) => doc.data());
            console.log(res.length)
            genRanInt(res.length);
            setbarz(res);

        });
        
    },[dataBase]);



    return (
        <div>
            <Quote quote={barz[ranInt]} dataBase={dataBase} />
            <Button onClick={genRanInt}>Refresh</Button>
        </div>
    );
}