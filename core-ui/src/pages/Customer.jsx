import { useParams } from 'react-router-dom';

export default function Customer() {
    const { id } = useParams();

    return (
        <div>
            <h1>customer id: {id}</h1>
        </div>
    )
}