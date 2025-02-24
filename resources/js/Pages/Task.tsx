import React, { useMemo } from "react";
import "./css/home.css";
import Layout from "./components/Layout";
import { Link } from "@inertiajs/react";

interface TaskProps {
    task: {
        id: number;
        user_id: string;
        task: string;
        description: string;
        due_date: string;
        status: "Pending" | "Completed" | "In Progress";
        created_at: string;
        updated_at: string;
    };
}

export default function Task({ task }: TaskProps) {
    const getDate = useMemo(
        () => (timeStamp: string | number) => {
            const date = new Date(timeStamp);
            return `${date.getFullYear()}-${String(
                date.getMonth() + 1
            ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        },
        []
    );

    return (
        <div className="mainContainer">
            <div className="taskCon">
                <div className="insideCon">
                    <div className="topTask">
                        <div className="rightSide">
                            <Link
                                href={`/task/edit/${task.id}`}
                                as="button"
                                className="taskButton editBtn"
                            >
                                Edit Task
                            </Link>

                            <Link
                                href={`/task/complete/${task.id}`}
                                method="patch"
                                as="button"
                                className="taskButton completeBtn"
                            >
                                Complete Task
                            </Link>

                            <Link
                                href={`/task/delete/${task.id}`}
                                method="delete"
                                as="button"
                                className="taskButton deleteBtn"
                            >
                                Delete Task
                            </Link>
                        </div>
                    </div>
                    <div className="gridView">
                        <div className="taskRow">
                            <small>Task ID: </small>
                            <div>{task.id}</div>
                        </div>

                        <div className="taskRow">
                            <small>Created Date:</small>
                            <div>{getDate(task.created_at)}</div>
                        </div>

                        <div className="taskRow">
                            <small>Status:</small>
                            <div>
                                <span
                                    className={`status ${task.status.toLowerCase()}`}
                                >
                                    {task.status}
                                </span>
                            </div>
                        </div>

                        <div className="taskRow">
                            <small>Due Date:</small>
                            <div>{task.due_date}</div>
                        </div>
                    </div>
                    <div className="taskRow">
                        <small>Task:</small>
                        <div>{task.task}</div>
                    </div>
                    <div className="taskRow">
                        <small>Description:</small>
                        <div>{task.description}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Task.layout = (page: React.ReactNode) => (
    <Layout title="Task Details" description="Details of the selected task.">
        {page}
    </Layout>
);
