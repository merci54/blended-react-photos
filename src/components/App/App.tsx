import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import CreatePostForm from '../CreatePostForm/CreatePostForm'

import css from "./App.module.css";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../services/postService";
import { Post } from "../../types/post";
import EditPostForm from "../EditPostForm/EditPostForm";

export default function App() {

  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isCreatePost, setIsCreatePost] = useState(false);
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [isEditPost, setIsEditPost] = useState(false);

  const [debouncedQuery] = useDebounce(query, 300)

  const { data, isError, isLoading } = useQuery({
    queryKey: ['posts', currentPage, debouncedQuery],
    queryFn: () => fetchPosts(debouncedQuery, currentPage),
    placeholderData: keepPreviousData
  })

  const handleChange = (newQuery: string) => {
    setQuery(newQuery)
    setCurrentPage(1);
  }

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }
  const toggleCreatePost = () => {
    setIsCreatePost(!isCreatePost)
  }

  const toggleEdit = (postToEdit?: Post) => {
    if (postToEdit) {
      setEditPost(postToEdit)
    }

    setIsEditPost(true)

  }

  const posts = data?.posts ?? [];
  const totalPages = data?.totalCount ? Math.ceil(data.totalCount / 8) : 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={query} onChange={handleChange} />
        {totalPages > 1 && <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />}
        <button className={css.button} onClick={() => {
          toggleModal();
          toggleCreatePost();
        }}>Create post</button>
      </header>
      {isOpen && <Modal onClose={() => {
        toggleModal();
        toggleCreatePost()
        setEditPost(null)
      }}>
        {isCreatePost && <CreatePostForm onClose={() => {
          toggleModal();
          toggleCreatePost();
        }} />}
        {isEditPost && editPost && <EditPostForm initialValues={editPost} onClose={() => {
          toggleModal();
          toggleEdit();
          setEditPost(null)
        }}  />}
      </Modal>}
      {posts.length > 0 && <PostList posts={posts} toggleModal={toggleModal} toggleEdit={toggleEdit} />}
      {isError && <p>Error...</p>}
      {isLoading && <p>Loading...</p>}
    </div>
  );
}
