import React, {Component} from 'react';
import "./FolderContainer.css"
import Folder from "../Folder/Folder";
import {getFoldersFromLocalStorage, setFoldersToLocalStorage} from "../../functions";
import FolderCreator from "../FolderCreator/FolderCreator";

class FolderContainer extends Component {
	constructor(props) {
		super(props);
		const folders = getFoldersFromLocalStorage();
		if (folders) {
			this.state = {
				folders: folders
			}
		} else {
			this.state = {
				folders: []
			}
		}
		this.createFolder = this.createFolder.bind(this);
		this.removeFolder = this.removeFolder.bind(this);
	}
	
	createFolder() {
		const nameInput = document.getElementById("new-folder-name");
		const name = nameInput.value.trim();
		nameInput.value = "";
		if(name === ""){
			console.log("No name provided")
		} else {
			const folder = {
				id: name.replace(" ", "-"),
				name: name,
				albums: [],
			};
			if (localStorage.hasOwnProperty("folders")) {
				
				const folders = this.state.folders;
				const names = folders.map(each => each.name);
				if (names.indexOf(folder.name) === -1) {
					folders.push(folder);
					setFoldersToLocalStorage(folders);
					this.setState({folders: folders});
				} else console.log("folder with given name already exists");
				
			} else {
				setFoldersToLocalStorage([folder])
				this.setState({folders: [folder]});
			}
		}
	}
	
	removeFolder(e) {
		const id = (e.target.parentElement.id.replace("folder-", ""));
		const folders = this.state.folders.filter( folder => folder.id !== id);
		setFoldersToLocalStorage(folders);
		this.setState({folders: folders});
	}
	
	render() {
		return (
			<div className="folder-container">
				<FolderCreator createFolder={this.createFolder}/>
				<div id={"folders"}>
					{(this.state.folders !== []) ? (
						this.state.folders.map(folder => {
							return <Folder key={folder.id} id={folder.id} removeFolder={this.removeFolder} name={folder.name}/>
						})
					) : (
						<div>No fodlers yet!</div>
					)}
				</div>
			</div>)
	}
}

export default FolderContainer;