import React from 'react';
import "./FolderContainer.css"
import Folder from "../Folder/Folder";
import FolderCreator from "../FolderCreator/FolderCreator";
import {connect} from "react-redux";

const FolderContainer = props => {
	
	return (
		<div className="folder-container">
			<FolderCreator/>
			<div id={"folders"}>
				{props.folders.map((folder) => (
					<Folder
						key={"folder" + folder.id}
						data={folder}
					/>)
				)}
			</div>
		</div>)
};

const mapStateToProps = (state) => ({
	folders: state.folders.folders
});

export default connect(mapStateToProps)(FolderContainer)
