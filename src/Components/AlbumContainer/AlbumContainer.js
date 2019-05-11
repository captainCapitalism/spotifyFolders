import React from 'react';
import Album from "../Album/Album";
import "./AlbumContainer.css";
import {connect} from 'react-redux';
import SelectFolder from "../SelectFolder/SelectFolder";

const AlbumContainer = props => {
	const folderSelector = <SelectFolder/>;
	return (
		<div className="album-container">{
			props.albums.map(album => (
				<Album
					key={album.id}
					album={album}
					children={folderSelector}
				/>
			))}
		</div>
	);
};

const mapStateToProps = state => ({
	folders: state.folders.folders
});

export default connect(mapStateToProps)(AlbumContainer);