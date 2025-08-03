import type { Photo } from "../../types/photo";
import Grid from "../Grid/Grid";
import GridItem from "../GridItem/GridItem";
import PhotosGalleryItem from "../PhotosGalleryItem/PhotosGalleryItem";

interface PhotosGalleryProps {
  photos: Photo[];
  selectPhoto: (photo: Photo) => void
}

export default function PhotosGallery({ photos, selectPhoto }: PhotosGalleryProps) {
  return <Grid>
    {photos.map((photo) => (
      <GridItem key={photo.id}>
        <PhotosGalleryItem photo={photo} selectPhoto={selectPhoto} />
      </GridItem>
    ))}</Grid>;
}
