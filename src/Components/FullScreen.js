import {useState} from "react";

export default function FullScreen() {
    const elem = document.documentElement;
    const [fullscreen, setFullscreen] = useState(false);

    function openFullscreen() {
        if (elem.requestFullscreen) {
            void elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
        setFullscreen(true);
    }

    /* Close fullscreen */
    function closeFullscreen() {
        if (document.exitFullscreen) {
            void document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
        setFullscreen(false);
    }

    document.addEventListener("keydown", (event) => {
        event.preventDefault();
        if (event.ctrlKey && event.key.toLowerCase() === "f") {
            (fullscreen) ? closeFullscreen() : openFullscreen();
        }
    });
}