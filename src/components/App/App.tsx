import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import toast, { Toaster } from "react-hot-toast";
import { getPhotos } from "../../services/photos";
import { useState } from "react";
import type { Photo } from "../../types/photo";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Modal from "../Modal/Modal";
import { BeatLoader } from "react-spinners";
import css from './App.module.css'



export default function App() {

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<null | Photo>(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {

    try {
      setIsLoading(true)
      const data = await getPhotos(query);

      if (!data.photos.length) {
        toast.error("No results");
        return
      }

      setPhotos(data.photos)
    } catch (error) {

    } finally {
      setIsLoading(false)
    }

  }

  const selectPhoto = (photo: Photo | null) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedPhoto(null)
  }

  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={handleSearch} />
          {isLoading && <BeatLoader />}
          <PhotosGallery photos={photos} selectPhoto={selectPhoto} />

          {isModalOpen && (
            <Modal onClose={closeModal}>
              {selectedPhoto && <img src={selectedPhoto.src.original} alt="" />}
            </Modal>)}

          <Toaster />
        </Container>
      </Section>
    </>
  );
}
