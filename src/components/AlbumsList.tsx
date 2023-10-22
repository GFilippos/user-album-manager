import { User } from '../models/user.model';
import { useFetchAlbumsQuery } from '../store';
import { useAddAlbumMutation } from '../store';
import Skeleton from './Skeleton';
import Button from './Button';
import AlbumsListItem from './AlbumsListItem';
import { Album } from '../models/album.model';

type Props = {
  user: User;
};

const AlbumsList = ({ user }: Props) => {
  const { data, error, isFetching } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  let content: React.ReactNode;
  if (error) {
    content = <div>Error loading albums.</div>;
  } else if (isFetching) {
    content = <Skeleton times={3} className="h-8 w-full" />;
  } else {
    content = data?.map((album: Album) => {
      return <AlbumsListItem key={album.id} album={album} />;
    });
  }
  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Albums for {user.name}</h3>
        <Button loading={results.isLoading} onClick={handleAddAlbum}>
          + Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
};

export default AlbumsList;
