import React, {Component} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            isUploading: false,
            lastTime: 0,
            dropletDetails: null,
            volumeDetails: null,
        };
    }

    onFormSubmit(e) {
        e.preventDefault();
        let file = this.state.file;
        let self = this;
        let oldTime = new Date().getTime();
        this.setState({
            isUploading: true,
        });
        const url = 'http://localhost:8000/dropletDetails';
        fetch(url, {
            method: 'get',
            mode: 'cors'
        }).then((response) => {
            response.json().then((data) => {
                self.setState({
                    dropletDetails: data.body.droplets,
                });
                let volume = data.body.droplet.volume_ids[0];
                const vurl = 'http://localhost:8000/volumeDetails/';
                fetch(vurl + volume, {
                    method: 'get',
                    mode: 'cors'
                }).then((response) => {
                    response.json().then((data) => {
                        self.setState({
                            volumeDetails: data.body.volume,
                        });
                        this.fileUpload(file).then(() => {
                            let newTime = new Date().getTime();
                            self.setState({
                                isUploading: false,
                                lastTime: newTime - oldTime,
                            });
                            this.fileInput.value = "";
                        });
                    })
                });
            });
        });
    }

    onChange(e) {
        this.setState({
            file: e.target.files[0],
            lastTime: 0,
            dropletDetails: null
        });
    }

    fileUpload(data) {
        const url = 'http://localhost:8000/uploadFile';
        return fetch(url, {
            method: 'post',
            body: data,
            mode: 'no-cors'
        });
    }

    dropletDetails() {
        const url = 'http://localhost:8000/dropletDetails';
        return fetch(url, {
            method: 'get',
            mode: 'no-cors'
        });
    }

    render() {
        return (
            <div style={{textAlign: 'center', padding: 100}}>
                {!this.state.isUploading
                    ? (
                        <form onSubmit={(e) => this.onFormSubmit(e)}>
                            <h1>File Upload</h1>
                            <input ref={ref => this.fileInput = ref} type="file" onChange={(e) => this.onChange(e)}/>
                            <div style={{paddingTop: 25}}>
                                <button type="submit">Upload File</button>
                            </div>
                        </form>
                    )
                    : (
                        <div><CircularProgress size={50}/> < br/> Uploading File...</div>
                    )
                }
                {this.state.file && this.state.lastTime
                    ? (
                        <div style={{textAlign: 'left', paddingTop: 20}}>
                            <h1>File Details:</h1>
                            <div>Total Time to upload: {this.state.lastTime} ms.</div>
                            <div>
                                {/*<div>Last Modified: {this.state.file.lastModified}</div>*/}
                                {/*<div>Last Modified Date: {this.state.file.lastModifiedDate}</div>*/}
                                <div>File Name: {this.state.file.name}</div>
                                <div>File Size: {this.state.file.size}</div>
                                <div>File Type: {this.state.file.type}</div>
                            </div>
                        </div>
                    )
                    : null
                }

                {this.state.lastTime ? (this.state.volumeDetails ?
                    (
                        <div style={{textAlign: 'left', paddingTop: 20}}>
                            <h1>File uploaded is less than the available size. So No resize done on the volume.</h1>
                            <div>Id: {this.state.volumeDetails.id}</div>
                            <div>Name: {this.state.volumeDetails.name}</div>
                            <div>Size in GB: {this.state.volumeDetails.size_gigabytes}</div>
                            <div>Created at: {this.state.volumeDetails.created_at}</div>
                            <div>File System Type : {this.state.volumeDetails.filesystem_type}</div>
                            <div>File System Label: {this.state.volumeDetails.filesystem_label}</div>
                        </div>
                    ) : (
                        <div><CircularProgress size={50}/>< br/> Updating volume details...</div>
                    )) : null
                }
            </div>
        );
    }
}

export default Home;