import type { Photo } from "../../types/photo";
import styles from "./PhotosGalleryItem.module.css";

interface PhotosGalleryItemProps {
  photo: Photo;
  selectPhoto: (photo: Photo) => void

}

export default function PhotosGalleryItem({ photo, selectPhoto }: PhotosGalleryItemProps) {
  return (
    <div
      className={styles.thumb}
      style={{
        borderColor: photo.avg_color,
        backgroundColor: photo.avg_color
      }}
      onClick={() => selectPhoto(photo)}
    >
      <img src={photo.src.large} alt={photo.src.original} />
    </div>
  );
}
