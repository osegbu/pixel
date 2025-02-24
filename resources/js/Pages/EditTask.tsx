import "./css/createtask.css";
import { useForm } from "@inertiajs/react";
import { ChangeEvent, FormEvent } from "react";
import Layout from "./components/Layout";

interface TaskFormData {
    task: string;
    description: string;
    due_date: string;
    status: string;
}

export default function EditTask({ task }: any) {
    const { data, setData, patch, processing, errors } = useForm<TaskFormData>({
        task: task.task,
        description: task.description,
        due_date: task.due_date,
        status: task.status,
    });

    const handleInput = (
        e: ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        setData(name as keyof TaskFormData, value);
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        patch(`/task/edit/${task.id}`);
    };

    return (
        <div className="mainContainer">
            <div className="taskCon">
                <div className="insideCon">
                    <div className="taskTitle">Edit Task</div>

                    <form onSubmit={onSubmit}>
                        <fieldset>
                            <legend>Task: </legend>
                            <input
                                type="text"
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
                                    <option value="Completed">Completed</option>
                                    <option value="In Progress">
                                        In Progress
                                    </option>
                                    <option value="Pending">Pending</option>
                                </select>
                            </label>
                        </fieldset>

                        <fieldset>
                            <legend>Description: </legend>
                            <textarea
                                name="description"
                                placeholder="Description"
                                value={data.description}
                                onChange={handleInput}
                            ></textarea>
                        </fieldset>

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

EditTask.layout = (page: React.ReactNode) => (
    <Layout title="Task Details" description="Details of the selected task.">
        {page}
    </Layout>
);
