import axios from "axios";
import { Post } from "../types/post";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

type FetchPostsResponse = Post[]

export const fetchPosts = async (searchText: string, page: number): Promise<{ posts: Post[], totalCount: number }> => {
    const res = await axios.get<FetchPostsResponse>(`/posts`, {
        params: {
            ...(searchText !== "" && { q: searchText }),
            _page: page,
            _limit: 8
        }
    })

    const totalCount = Number(res.headers['x-total-count']);
    return { posts: res.data, totalCount }
};

interface NewPost {
    title: string;
    body: string
}

export const createPost = async (newPost: NewPost) => {
    const { data } = await axios.post<Post>('/posts', newPost);
    return data
};

interface EditPost {
    title: string;
    body: string;
    id: number;
}

export const editPost = async (newDataPost: EditPost) => {
    const { data } = await axios.patch(`/posts/${newDataPost.id}`, newDataPost)
    return data
};

export const deletePost = async (postId: number) => {
    const { data } = await axios.delete(`/posts/${postId}`)
    return data
};
