import "../css/header.css";
import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Header() {
    const [active, setActive] = useState(false);
    const { props } = usePage();

    const closeModal = () => {
        setActive(false);
    };

    useEffect(() => {
        if (active && Object.keys(props.errors).length === 0) {
            closeModal();
        }
    }, [props.errors]);

    return (
        <div className="headerContainer">
            <div className="header">
                <Link href="/" className="logo">
                    Pixel
                </Link>

                <div className="headerRight">
                    <Link href="/create" className="createTaskBtn" as="button">
                        Create Task
                    </Link>
                </div>
            </div>
        </div>
    );
}
