import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import css from "./EditPostForm.module.css";
import { Post } from "../../types/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPost } from "../../services/postService";

interface EditPostFormProps {
  initialValues: Post;
  onClose: () => void;
}

const PostSchema = Yup.object().shape({
  title: Yup.string().min(3, 'min 3').max(50, 'max 50').required('Content is required'),
  body: Yup.string().max(500, 'max 500').required('Content is required')
})

interface FormValues {
  id: number;
  title: string;
  body: string;
}

export default function EditPostForm({ initialValues, onClose }: EditPostFormProps) {
  


  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: editPost,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      alert('post edit');
      onClose()
    },
  })
  const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    mutate(values)
    actions.resetForm();
  }



  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={PostSchema}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="body">Content</label>
          <Field id="body" as="textarea" name="body" rows={8} className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton}  onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={isPending}>
            Edit post
          </button>
        </div>
      </Form>
    </Formik>
  );
}
