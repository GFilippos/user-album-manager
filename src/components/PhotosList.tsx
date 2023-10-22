import { useFetchPhotosQuery, useAddPhotoMutation } from '../store';
import Button from './Button';
import { Album } from '../models/album.model';
import Skeleton from './Skeleton';
import PhotosListItem from './PhotosListItem';
import { Photo } from '../models/photo.model';

type Props = {
  album: Album;
};

const PhotosList = ({ album }: Props) => {
  const { data, isFetching, error } = useFetchPhotosQuery(album);
  const [addPhoto, results] = useAddPhotoMutation();

  const handleAddPhoto = () => {
    addPhoto(album);
  };

  let content: React.ReactNode;
  if (isFetching) {
    content = <Skeleton times={4} className="h-8 w-8" />;
  } else if (error) {
    content = <div>Error fetching photos...</div>;
  } else {
    content = data.map((photo: Photo) => {
      return <PhotosListItem key={photo.id} photo={photo} />;
    });
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Photos In {album.title}</h3>
        <Button loading={results.isLoading} onClick={handleAddPhoto}>
          + Add Photo
        </Button>
      </div>
      <div className="mx-8 flex flex-row flex-wrap justify-center">{content}</div>
    </div>
  );
};

export default PhotosList;
