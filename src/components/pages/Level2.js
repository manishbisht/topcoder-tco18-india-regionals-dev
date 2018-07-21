import React, {Component} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            isUploading: false,
            lastTime: 0,
            dropletDetails: null
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
        this.fileUpload(file).then(() => {
            let newTime = new Date().getTime();
            this.setState({
                isUploading: false,
                lastTime: newTime - oldTime,
            });
            this.fileInput.value = "";
            const url = 'http://localhost:8000/bestDroplet';
            fetch(url, {
                method: 'get',
                mode: 'cors'
            }).then((response) => {
                response.json().then((data) => {
                    data = data.body.droplets;
                    data.sort(function (a, b) {
                        return b.size.transfer - a.size.transfer;
                    });
                    self.setState({
                        dropletDetails: data,
                    });
                });
            });
        }).catch(() => {
            this.setState({
                isUploading: false,
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

                {this.state.lastTime ? (this.state.dropletDetails ?
                    (
                        <div>
                            <div style={{textAlign: 'left', paddingTop: 20}}>
                                <h1>File uploaded to the droplet with the best bandwidth</h1>
                                <div>Id: {this.state.dropletDetails[0].id}</div>
                                <div>Name: {this.state.dropletDetails[0].name}</div>
                                <div>Memory: {this.state.dropletDetails[0].memory}</div>
                                <div>CPU: {this.state.dropletDetails[0].vcpus}</div>
                                <div>Disk Size: {this.state.dropletDetails[0].disk}</div>
                                <div>Bandwidth: {this.state.dropletDetails[0].size.transfer}</div>
                            </div>

                            <div style={{textAlign: 'left', paddingTop: 20}}>
                                <h1>Droplet Details</h1>
                                <div style={{display: 'flex'}}>
                                    {this.state.dropletDetails.map((droplet, index) => {
                                        return (
                                            <div style={{textAlign: 'left', padding: 20}}>
                                                <h1>Droplet {index}</h1>
                                                <div>Id: {droplet.id}</div>
                                                <div>Name: {droplet.name}</div>
                                                <div>Memory: {droplet.memory}</div>
                                                <div>CPU: {droplet.vcpus}</div>
                                                <div>Disk Size: {droplet.disk}</div>
                                                <div>Bandwidth: {droplet.size.transfer}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    ) : (
                        (
                            <div><CircularProgress size={50}/> < br/> Updating droplet details...</div>
                        )
                    )) : null}
            </div>
        );
    }
}

export default Home;