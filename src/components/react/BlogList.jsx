import React, {useState, useEffect} from "react";
import blogService from '../../services/blogService';


const BlogList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [hasMpore, setHasMore] = useState(true);

    useEffect(() => {
        fetchPosts();
    }
    , [page]);

    const fetchPosts = async () => {
        try {
            const data = await blogService.getAllPosts(page, 10);

            if(page === 0){
                setPosts(data.content);
            }else {
                setPosts(prevPosts => [...prevPosts, ...data.content]);
            }
            //setPosts([...posts, ...data.posts]);
            setHasMore(!data.last);
            setLoading(false);
        } catch (error) {
            setError("Error al cargar las publicaciones del blog");
            //setError(error);
        } finally {
            setLoading(false);
        }
    }
}