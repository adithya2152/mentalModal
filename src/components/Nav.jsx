import "../styles/nav.css";

export default function Nav() {
    const handleEnterClick = () => {
        const entryTime = new Date().getTime(); // Get timestamp in milliseconds
        localStorage.setItem("entryTime", entryTime);
        console.log("Entered at:", new Date(entryTime).toLocaleString());
    };

    return (
        <div className="nav">
            <div className="nav-flex">
                <div className="enter">
                    <p>
                        <a href="/login" onClick={handleEnterClick}>Enter</a>
                    </p>
                </div>
                <div className="title">
                    <h2>Mental Modal</h2>
                </div>
            </div>
        </div>
    );
}


  