import React, { useEffect, useState, useMemo, useCallback } from "react";
import "./css/home.css";
import Layout from "./components/Layout";
import { router, usePage } from "@inertiajs/react";

interface TaskProps {
    id: number;
    user_id: number;
    task: string;
    description: string;
    due_date: string;
    status: "Pending" | "Completed" | "In Progress";
    created_at: string;
    updated_at: string;
}

export default function Home() {
    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("date");
    const [order, setOrder] = useState("asc");
    const [taskData, setTaskData] = useState<TaskProps[]>([]);

    const { props } = usePage<any>();

    const handleFilter = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            setFilter(event.target.value);
        },
        []
    );

    const handleSort = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            setSort(event.target.value);
        },
        []
    );

    const handleOrder = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            setOrder(event.target.value);
        },
        []
    );

    const getDate = useMemo(
        () => (timeStamp: string) => {
            const date = new Date(timeStamp);
            return `${date.getFullYear()}-${String(
                date.getMonth() + 1
            ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        },
        []
    );

    useEffect(() => {
        let filteredTasks = [...props.tasks.data];

        if (filter === "completed") {
            filteredTasks = filteredTasks.filter(
                (task) => task.status.toLowerCase() === "completed"
            );
        } else if (filter === "pending") {
            filteredTasks = filteredTasks.filter(
                (task) => task.status.toLowerCase() === "pending"
            );
        } else if (filter === "progress") {
            filteredTasks = filteredTasks.filter(
                (task) => task.status.toLowerCase() === "in progress"
            );
        }

        filteredTasks.sort((a, b) => {
            if (sort === "name") {
                return a.task.localeCompare(b.task);
            } else if (sort === "date") {
                return new Date(a.id).getTime() - new Date(b.id).getTime();
            } else if (sort === "due_date") {
                return (
                    new Date(a.due_date).getTime() -
                    new Date(b.due_date).getTime()
                );
            }
            return 0;
        });

        if (order === "desc") {
            filteredTasks.reverse();
        }

        setTaskData(filteredTasks);
    }, [props.tasks.data, filter, sort, order]);

    const handlePagination = (url: string | null) => {
        if (url) {
            router.visit(url);
        }
    };

    const renderPageLinks = (): React.JSX.Element[] => {
        const totalPages: number = props.tasks.last_page;
        const currentPage: number = props.tasks.current_page;
        const links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }> = props.tasks.links;

        const pageLinks: React.JSX.Element[] = [];

        const maxPages = 5;
        const halfRange = Math.floor(maxPages / 2);
        const startPage = Math.max(currentPage - halfRange, 1);
        const endPage = Math.min(currentPage + halfRange, totalPages);

        for (let i = startPage; i <= endPage; i++) {
            const pageLink = links.find((link) => link.label === i.toString());
            pageLinks.push(
                <button
                    key={i}
                    className={`page-link ${currentPage === i ? "active" : ""}`}
                    onClick={() => handlePagination(pageLink?.url || null)}
                >
                    {i}
                </button>
            );
        }

        return pageLinks;
    };

    const pendingCount = taskData.filter((task) => task.status === "Pending");
    const progressCount = taskData.filter(
        (task) => task.status === "In Progress"
    );
    const completeCount = taskData.filter(
        (task) => task.status === "Completed"
    );

    return (
        <div className="mainContainer">
            <div className="topCard">
                <div>
                    <div className="card">
                        <div className="cardName pendingCard">
                            Pending Tasks
                        </div>
                        <div>
                            {pendingCount.length} / {props.pendingCount}
                        </div>
                    </div>
                    <div className="card">
                        <div className="cardName progressCard">
                            In Progress Tasks
                        </div>
                        <div>
                            {progressCount.length} / {props.inProgressCount}
                        </div>
                    </div>
                    <div className="card">
                        <div className="cardName completedCard">
                            Completed Tasks
                        </div>
                        <div>
                            {completeCount.length} / {props.completedCount}
                        </div>
                    </div>
                </div>
            </div>
            <div className="taskCon">
                <div className="insideCon">
                    <div className="topTask">
                        <div className="rightSide">
                            <div>
                                <small>Filter:</small>
                                <select
                                    className="filterOpt"
                                    value={filter}
                                    onChange={handleFilter}
                                >
                                    <option value="all">All</option>
                                    <option value="completed">Completed</option>
                                    <option value="pending">Pending</option>
                                    <option value="progress">
                                        In Progress
                                    </option>
                                </select>
                            </div>

                            <div>
                                <small>Sort:</small>
                                <select
                                    className="filterOpt"
                                    value={sort}
                                    onChange={handleSort}
                                >
                                    <option value="name">Name</option>
                                    <option value="date">Created Date</option>
                                    <option value="due_date">Due Date</option>
                                </select>
                            </div>

                            <div>
                                <small>Order:</small>
                                <select
                                    className="filterOpt"
                                    value={order}
                                    onChange={handleOrder}
                                >
                                    <option value="asc">Ascending Order</option>
                                    <option value="desc">
                                        Descending Order
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {taskData.length > 0 ? (
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>TASK</th>
                                        <th>STATUS</th>
                                        <th>CREATED DATE</th>
                                        <th>DUE DATE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {taskData.map((task) => (
                                        <tr
                                            key={task.id}
                                            onClick={() =>
                                                router.visit(`/task/${task.id}`)
                                            }
                                        >
                                            <td data-label="ID">{task.id}</td>
                                            <td data-label="Task">
                                                {task.task}
                                            </td>
                                            <td data-label="Status">
                                                <span
                                                    className={`status ${task.status.toLowerCase()}`}
                                                >
                                                    {task.status}
                                                </span>
                                            </td>
                                            <td data-label="Created Date">
                                                {getDate(task.created_at)}
                                            </td>
                                            <td data-label="Due Date">
                                                {task.due_date}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {props.tasks.last_page > 1 && (
                                <div>
                                    <div className="tasksCounts">
                                        <div>
                                            Total Tasks: {props.tasks.total}
                                        </div>
                                        <div>
                                            Showing results from:{" "}
                                            {props.tasks.from} to{" "}
                                            {props.tasks.to}
                                        </div>
                                    </div>
                                    <div className="pagination">
                                        <button
                                            className="page-link"
                                            disabled={
                                                !props.tasks.prev_page_url
                                            }
                                            onClick={() =>
                                                handlePagination(
                                                    props.tasks.prev_page_url
                                                )
                                            }
                                        >
                                            &laquo; Previous
                                        </button>

                                        {renderPageLinks()}

                                        <button
                                            className="page-link"
                                            disabled={
                                                !props.tasks.next_page_url
                                            }
                                            onClick={() =>
                                                handlePagination(
                                                    props.tasks.next_page_url
                                                )
                                            }
                                        >
                                            Next &raquo;
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p>No tasks available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

Home.layout = (page: React.ReactNode) => (
    <Layout title="Home" description="This is the Home page.">
        {page}
    </Layout>
);
