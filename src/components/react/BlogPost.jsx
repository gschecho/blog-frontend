import React,{useState, useEffect} from "react";
import blogService from '../../services/blogService';
import CommentSection from './CommentSection';
import { setErrorMap } from "astro:schema";


//que es el slug
const BlogPost = ({slug}) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(slug){
            fetchPost();
        }
    },[slug]);

    const fetchPost = async () => {
        try {
            const data = await blogService.getPostBySlug(slug);
            setPost(data);
            setLoading(true);
        } catch (error) {
            console.log(error);
            setError('Error al cargar la publicación');
            setLoading(false);
        }
    }

// EDITAR

//ELIMINAR POST

}
