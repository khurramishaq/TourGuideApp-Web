import React, { Component } from 'react'
import './blog.css'
import firebase from '../firebase'
import { ToastContainer, toast } from 'react-toastify';

export default class AddPost extends Component {
    state = {
        submit: "Publish",
        enable: true,
        img: "",
        uploading: false,
        title: "",
        description: "",
        slug: "",
        fileName: ""
    }

    handleChangeTitle = (e) => {
        this.setState({
            title: e.target.value,
            slug: this.convertToSlug(e.target.value.trim())
        })
        
    };

    convertToSlug(Text) {
        return Text
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    }

    handleChange = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    // File select
    fileSelect = (e) => {
        let fullPath = e.target.files[0];
        console.log(fullPath)
        if (fullPath != null) {
            const name = fullPath.name;
            const type = fullPath.type;
            const lastDot = name.lastIndexOf('.');

            const fileName = name.substring(0, lastDot);
            console.log('name => ', fileName)

            this.setState({
                img: fullPath,
                fileName: `${fileName}`,
            });

        }
    };

    // Uploading image to firebase
    uploadImage = async (image) => {

        const imageRef = firebase.storage().ref(`/blog/${image.name}`);
        await imageRef.put(image).catch((error) => {
            throw error;
        });
        const url = await imageRef.getDownloadURL().catch((error) => {
            throw error;
        });
        return url;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.slug)
        let {
            img,
            title,
            description,
            slug
        } = this.state

        this.setState({ submit: "Publishing .........", enable: false });
        this.uploadImage(img).then((url) => {
            let post = {
                title: title,
                slug: `${slug}-${new Date().getTime()}`,
                description: description,
                thumbnail: url,
                createdAt: new Date().getTime(),
                createdBy: window.localStorage.getItem("email")
            };
            firebase.firestore().collection("BLOG").doc(slug).set(post)
            .then(() => {
                this.setState({
                    img: '',
                    title: '',
                    description: '',
                    slug: '',
                    submit: "Publish",
                    enable: true,

            });
            toast.success("you have successfully publish post!")
                
            }).catch(error => {
                var errorMessage = error.message;
                console.log(errorMessage)
                toast.error(errorMessage)
            });
        });
    }

    render() {
        let {
            submit,
            enable,
            title,
            description,
            fileName
        } = this.state
        return (
            <div className="container">
                <div class="wrapper">
                    <div class="title">
                        Publish New Post
                    </div>
                    <form class="form" onSubmit={this.handleSubmit}>
                        <div class="inputfield">
                            <label>Thumbnail</label>
                            <input
                                type="file"
                                accept="image/*"
                                class="input"
                                id="file"
                                onChange={this.fileSelect}
                                required />
                        </div>
                        <div class="inputfield">
                            <label>Title</label>
                            <input
                                type="text"
                                class="input"
                                id="title"
                                onChange={this.handleChangeTitle}
                                required 
                                value={title}/>
                        </div>
                        <div class="inputfield">
                            <label>Description</label>
                            <textarea
                                type="text"
                                class="input"
                                id="description"
                                onChange={this.handleChange}
                                required
                                rows="8" 
                                value={description}/>
                        </div>
                        <div class="inputfield">
                            <input type="submit" value={submit} enabled={enable} class="btn" />
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
        )
    }
}
