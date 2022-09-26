import Quote from './Quote';
import Button from 'react-bootstrap/Button';

//s

export default function QuoteContainer (props) {

    return (
        <div className='text-center'>
            <Quote quote={props.quote} dataBase={props.dataBase} />
        </div>
    );
}