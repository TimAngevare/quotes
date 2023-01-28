export default function fullscreen() {
    const elem = document.documentElement;

    function openFullscreen() {
        if (elem.requestFullscreen) {
            void elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
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
    }
}