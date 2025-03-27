import React, {useState, useEffect} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import blogService from '../../services/blogService';

const BlogEditor = ({post, setPost}) => {
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        coverImage: '',
        categories: []
    });

    //Cargar datos si es edición

    const generateSlug = (title) => {
        return title.toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
    }

    //Cambio de formulario y envío
}