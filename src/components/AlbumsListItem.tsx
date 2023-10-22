import { Album } from '../models/album.model';
import { useRemoveAlbumMutation } from '../store';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import { GoTrash } from 'react-icons/go';
import PhotosList from './PhotosList';

type Props = {
  album: Album;
};

const AlbumsListItem = ({ album }: Props) => {
  const [removeAlbum, results] = useRemoveAlbumMutation();

  const handleClick = () => {
    removeAlbum(album);
  };

  const header = (
    <>
      <Button className="mr-2" loading={results.isLoading} onClick={handleClick}>
        <GoTrash />
      </Button>
      {album.title}
    </>
  );

  return (
    <ExpandablePanel key={album.id} header={header}>
      <PhotosList album={album} />
    </ExpandablePanel>
  );
};

export default AlbumsListItem;
