export interface HikePhoto {
  id: number;
  url: string;
}

interface Props {
  photos: HikePhoto[];
}

function HikePhotoList({ photos }: Props) {
  return (
    <div className="relative bg-slate-200 ">
      <div className="photos-list-label inline-block bg-blue-600 text-white font-bold px-3 py1">
        PHOTO GALLERY
      </div>
      <div className="max-w-screen-lg py-6 px-8 relative m-auto hike-photos-list">
        {photos.map((photo) => (
          <div key={photo.id}>
            <img src={photo.url}></img>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HikePhotoList;
