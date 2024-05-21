import { useForm } from "react-hook-form";
import styles from "./EditBookForm.module.css";

function EditBookForm({ bookToEdit }) {
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: { ...bookToEdit },
  });
  const { errors } = formState;

  return (
    <>
      <div className={styles.formRow}>
        <span className={styles.formText}>Title:</span>
        <input
          type="text"
          id="title"
          //   disabled={isWorking}
          {...register("title", { required: "This field is required" })}
        />
      </div>
      <div className={styles.formRow}>
        <span className={styles.formText}>Author:</span>
        <input
          type="text"
          id="author"
          //   disabled={isWorking}
          {...register("author", { required: "This field is required" })}
        />
      </div>

      <div className={styles.horRow}>
        <div className={styles.lilBlock}>
          <span className={styles.formText}>Year:</span>
          <input
            type="text"
            id="year"
            //   disabled={isWorking}
            {...register("year", { required: "This field is required" })}
          />
        </div>

        <div className={styles.lilBlock}>
          <span className={styles.formText}>Country:</span>
          <input
            type="text"
            id="country"
            //   disabled={isWorking}
            {...register("country", { required: "This field is required" })}
          />
        </div>
      </div>

      <div>
        <span className={styles.formText}>Description:</span>
        <textarea
          type="text"
          id="desc"
          //   disabled={isWorking}
          {...register("desc", { required: "This field is required" })}
        />
      </div>
    </>
  );
}

export default EditBookForm;
