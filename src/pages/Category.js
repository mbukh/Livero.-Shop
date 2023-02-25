import { useParams } from "react-router-dom";

const Category = () => {
    const params = useParams();
    return <div>Category: {JSON.stringify(params)}</div>;
};

export default Category;
