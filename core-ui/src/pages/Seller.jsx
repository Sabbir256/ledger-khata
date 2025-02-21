import { useParams } from 'react-router-dom';

export default function Seller() {
    const { id } = useParams();

    return (
        <div>
            <h1>Custom Seller: {id}</h1>
        </div>
    )
}