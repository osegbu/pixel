import "./css/createtask.css";
import { useForm } from "@inertiajs/react";
import { ChangeEvent, FormEvent } from "react";
import Layout from "./components/Layout";

export default function CreateTask({ closeModal }: any) {
    interface TaskFormData {
        task: string;
        due_date: string;
        description: string;
        status: string;
    }

    const { data, setData, post, processing, errors } = useForm<TaskFormData>({
        task: "",
        due_date: "",
        description: "",
        status: "",
    });

    const handleInput = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setData(name as keyof TaskFormData, value);
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        post("/task/create");
    };

    return (
        <div className="mainContainer">
            <div className="taskCon">
                <div className="insideCon">
                    <div className="taskTitle">Create Task</div>
                    <form onSubmit={onSubmit}>
                        <fieldset>
                            <legend>Task: </legend>
                            <input
                                type="text"
                                id="task"
                                name="task"
                                value={data.task}
                                placeholder="Task"
                                onChange={handleInput}
                            />
                        </fieldset>
                        {!processing && errors.task && (
                            <div className="error">{errors.task}</div>
                        )}

                        <fieldset>
                            <legend>Due Date:</legend>
                            <input
                                type="date"
                                id="due_date"
                                name="due_date"
                                value={data.due_date}
                                placeholder="Due Date"
                                onChange={handleInput}
                            />
                        </fieldset>
                        {!processing && errors.due_date && (
                            <div className="error">{errors.due_date}</div>
                        )}

                        <fieldset>
                            <legend>Status:</legend>
                            <label>
                                <select
                                    name="status"
                                    value={data.status}
                                    onChange={handleInput}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">
                                        In Progress
                                    </option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </label>
                        </fieldset>

                        <fieldset>
                            <legend>Task: </legend>
                            <textarea
                                id="task"
                                name="description"
                                value={data.description}
                                placeholder="Description"
                                onChange={handleInput}
                            />
                        </fieldset>
                        {!processing && errors.task && (
                            <div className="error">{errors.task}</div>
                        )}

                        <button
                            type="submit"
                            className="submitBtn"
                            disabled={processing}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

CreateTask.layout = (page: React.ReactNode) => (
    <Layout title="Task Details" description="Details of the selected task.">
        {page}
    </Layout>
);
